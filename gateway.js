const http = require("http");
const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const CORE_PORT = Number(process.env.CORE_PORT || (PORT === 3000 ? 3001 : PORT + 1));
const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "");
const DATA_DIR = path.join(ROOT, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const FINANCE_PREFIX = "finance-";
const SESSION_COOKIE = "gt_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "GlobalTools <noreply@oolivo.com.br>";

const PRODUCTS = {
  "small-business-finance-dashboard": {
    name: "Small Business Finance Dashboard",
    plan: "starter",
    file: "GlobalTools-Small-Business-Finance-Dashboard-PRO.xlsx"
  },
  "cash-flow-planner": {
    name: "Cash Flow Planner",
    plan: "starter",
    file: "GlobalTools-Cash-Flow-Planner-PRO.xlsx"
  },
  "freelancer-business-kit": {
    name: "Freelancer Business Kit",
    plan: "business",
    file: "GlobalTools-Freelancer-Business-Kit-PRO.xlsx"
  }
};

const PLANS = {
  starter: { label: "Starter", rank: 1 },
  business: { label: "Business", rank: 2 },
  unlimited: { label: "Unlimited", rank: 3 }
};

const UPGRADE_PRICES = {
  business: "price_1UNwSHCCSBhBJictvfVQpWMz",
  unlimited: "price_1UNwSPCCSBhBJictPWOPluRi"
};

function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
}
function readUsers() {
  ensureData();
  try { return JSON.parse(fs.readFileSync(USERS_FILE, "utf8")); } catch { return []; }
}
function writeUsers(users) {
  ensureData();
  const tmp = USERS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(users, null, 2));
  fs.renameSync(tmp, USERS_FILE);
}
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}
function newPassword() {
  return crypto.randomBytes(6).toString("base64url").slice(0, 10) + "G";
}
function makeSession(userId) {
  return crypto.randomBytes(32).toString("hex") + "." + userId + "." + Date.now().toString(36);
}
function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || "").split(";").forEach(pair => {
    const i = pair.indexOf("=");
    if (i > -1) out[pair.slice(0, i).trim()] = decodeURIComponent(pair.slice(i + 1).trim());
  });
  return out;
}
function userFromRequest(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const sessions = readSessions();
  const s = sessions[token];
  if (!s || Date.now() - s.createdAt > SESSION_TTL_MS) return null;
  const users = readUsers();
  return users.find(u => u.id === s.userId) || null;
}
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
function readSessions() {
  ensureData();
  try { return JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf8")); } catch { return {}; }
}
function writeSessions(s) {
  ensureData();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(s, null, 2));
}
function setSession(res, userId) {
  const sessions = readSessions();
  const token = makeSession(userId);
  sessions[token] = { userId, createdAt: Date.now() };
  writeSessions(sessions);
  res.setHeader("Set-Cookie", SESSION_COOKIE + "=" + encodeURIComponent(token) + "; HttpOnly; Path=/; SameSite=Lax; Max-Age=" + Math.floor(SESSION_TTL_MS / 1000));
}
function clearSession(req, res) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (token) {
    const sessions = readSessions();
    delete sessions[token];
    writeSessions(sessions);
  }
  res.setHeader("Set-Cookie", SESSION_COOKIE + "=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0");
}
function json(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(data));
}
function body(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", c => {
      raw += c;
      if (Buffer.byteLength(raw) > 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error("JSON inválido")); }
    });
    req.on("error", reject);
  });
}
function rank(plan) { return PLANS[plan] ? PLANS[plan].rank : 0; }
function permissions(plan) {
  return {
    dashboard: true,
    transactions: true,
    cashflow: true,
    reports: rank(plan) >= 2,
    forecast: rank(plan) >= 2,
    goals: rank(plan) >= 2,
    advanced: rank(plan) >= 3,
    multiCompany: rank(plan) >= 3
  };
}
function sanitizeEmail(v) { return String(v || "").trim().toLowerCase(); }
function financeFile(userId) { return path.join(DATA_DIR, FINANCE_PREFIX + userId + ".json"); }
function defaultFinance() {
  return { transactions: [], accounts: [], categories: [], budget: [], goals: [], notes: "", updatedAt: new Date().toISOString() };
}
function readFinance(userId) {
  const file = financeFile(userId);
  if (!fs.existsSync(file)) return defaultFinance();
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return defaultFinance(); }
}
function writeFinance(userId, data) {
  const safe = data && typeof data === "object" ? data : {};
  safe.updatedAt = new Date().toISOString();
  fs.writeFileSync(financeFile(userId), JSON.stringify(safe, null, 2));
}
function stripeRequest(method, stripePath, form, callback) {
  if (!STRIPE_SECRET_KEY) return callback(new Error("STRIPE_SECRET_KEY não configurada"));
  const data = form ? Buffer.from(form) : null;
  const r = https.request({
    hostname: "api.stripe.com",
    path: stripePath,
    method,
    headers: { Authorization: "Bearer " + STRIPE_SECRET_KEY, "Content-Type": "application/x-www-form-urlencoded", ...(data ? { "Content-Length": data.length } : {}) }
  }, rr => {
    let raw = "";
    rr.setEncoding("utf8");
    rr.on("data", c => raw += c);
    rr.on("end", () => {
      let j = null; try { j = JSON.parse(raw); } catch {}
      if (rr.statusCode < 200 || rr.statusCode >= 300) return callback(new Error(j?.error?.message || raw || "Stripe HTTP " + rr.statusCode));
      callback(null, j);
    });
  });
  r.on("error", callback);
  if (data) r.write(data);
  r.end();
}
function enc(v) { return encodeURIComponent(v).replace(/%20/g, "+"); }
function verifyStripe(raw, sig) {
  if (!STRIPE_WEBHOOK_SECRET || !sig) return false;
  const parts = {};
  String(sig).split(",").forEach(x => {
    const [k, v] = x.split("=", 2);
    if (k && v) (parts[k] ||= []).push(v);
  });
  const t = parts.t?.[0], vs = parts.v1 || [];
  if (!t || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto.createHmac("sha256", STRIPE_WEBHOOK_SECRET).update(t + "." + raw).digest("hex");
  return vs.some(v => { try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v)); } catch { return false; } });
}
function planForProduct(slug) { return PRODUCTS[slug]?.plan || "starter"; }
function upsertUser(email, plan, productSlug, forceNewPassword = false, generatePassword = true) {
  const users = readUsers();
  let u = users.find(x => x.email === email);
  let generatedPassword = null;
  const firstActivation = generatePassword && (!u || !u.passwordDeliveredAt || forceNewPassword);
  if (!u) {
    u = {
      id: "usr_" + crypto.randomBytes(9).toString("hex"),
      email,
      passwordSalt: "",
      passwordHash: "",
      plan,
      products: [],
      createdAt: new Date().toISOString()
    };
    users.push(u);
  } else if (rank(plan) > rank(u.plan)) {
    u.plan = plan;
  }
  if (firstActivation) {
    generatedPassword = newPassword();
    u.passwordSalt = crypto.randomBytes(16).toString("hex");
    u.passwordHash = hashPassword(generatedPassword, u.passwordSalt);
    u.passwordDeliveredAt = new Date().toISOString();
  }
  if (productSlug && !u.products.includes(productSlug)) u.products.push(productSlug);
  u.updatedAt = new Date().toISOString();
  writeUsers(users);
  return { user: u, generatedPassword };
}
function sendAccessEmail(email, password, plan, callback) {
  if (!RESEND_API_KEY) return callback(false, new Error("RESEND_API_KEY não configurada"), 0);
  const payload = JSON.stringify({
    from: RESEND_FROM_EMAIL,
    to: [email],
    subject: "Seu acesso ao GlobalTools foi liberado",
    html: "<div style='font-family:Arial,sans-serif;max-width:620px;margin:auto'><h1>GlobalTools</h1><p>Seu acesso ao painel financeiro foi liberado.</p><p><b>Plano:</b> " + plan + "</p><p><b>E-mail:</b> " + email + "</p><p><b>Senha inicial:</b> " + password + "</p><p><a href='https://oolivo.com.br/login.html'>Acessar meu painel</a></p><p style='color:#777'>Guarde sua senha e altere-a quando o recurso de troca de senha estiver disponível.</p></div>"
  });
  const r = https.request({
    hostname: "api.resend.com",
    path: "/emails",
    method: "POST",
    headers: {"Authorization":"Bearer " + RESEND_API_KEY,"Content-Type":"application/json","Content-Length":Buffer.byteLength(payload)}
  }, rr => {
    let raw=""; rr.on("data",x=>raw+=x); rr.on("end",()=>callback(rr.statusCode>=200&&rr.statusCode<300, rr.statusCode>=200&&rr.statusCode<300 ? null : new Error(raw || "Resend HTTP " + rr.statusCode), rr.statusCode));
  });
  r.on("error",e=>callback(false,e,0)); r.write(payload); r.end();
}
function publicUser(u) {
  return { id: u.id, email: u.email, plan: u.plan, planLabel: PLANS[u.plan]?.label || u.plan, products: u.products, permissions: permissions(u.plan) };
}
function proxy(req, res) {
  const r = http.request({
    hostname: "127.0.0.1", port: CORE_PORT, method: req.method,
    path: req.url, headers: { ...req.headers, host: "127.0.0.1:" + CORE_PORT }
  }, rr => {
    res.writeHead(rr.statusCode || 502, rr.headers);
    rr.pipe(res);
  });
  r.on("error", () => json(res, 502, { ok: false, error: "Serviço temporariamente indisponível." }));
  req.pipe(r);
}
function sendFile(res, file, downloadName) {
  if (!fs.existsSync(file)) return json(res, 404, { ok: false, error: "Arquivo não encontrado." });
  res.writeHead(200, {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": "attachment; filename=\"" + downloadName.replace(/"/g, "") + "\"",
    "Cache-Control": "private, no-store"
  });
  fs.createReadStream(file).pipe(res);
}

const core = spawn(process.execPath, [path.join(ROOT, "server.js")], {
  env: { ...process.env, PORT: String(CORE_PORT) },
  stdio: "inherit"
});
core.on("exit", code => { if (code && code !== 0) console.error("Core server exited:", code); });

ensureData();

const gateway = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/api/me") {
      const u = userFromRequest(req);
      return json(res, 200, { ok: true, authenticated: !!u, user: u ? publicUser(u) : null });
    }
    if (req.method === "POST" && url.pathname === "/api/login") {
      const b = await body(req);
      const email = sanitizeEmail(b.email);
      const password = String(b.password || "");
      const u = readUsers().find(x => x.email === email);
      if (!u || !u.passwordSalt || hashPassword(password.trim(), u.passwordSalt) !== u.passwordHash) return json(res, 401, { ok: false, error: "E-mail ou senha inválidos." });
      setSession(res, u.id);
      return json(res, 200, { ok: true, user: publicUser(u) });
    }
    if (req.method === "POST" && url.pathname === "/api/logout") {
      clearSession(req, res);
      return json(res, 200, { ok: true });
    }
    if (req.method === "POST" && url.pathname === "/api/activate-session") {
      const b = await body(req);
      const sessionId = String(b.session_id || "");
      if (!sessionId) return json(res, 400, { ok: false, error: "Sessão de pagamento ausente." });
      stripeRequest("GET", "/v1/checkout/sessions/" + encodeURIComponent(sessionId), null, (err, session) => {
        if (err) return json(res, 400, { ok: false, error: "Não foi possível validar o pagamento." });
        const slug = session.metadata?.product_slug;
        const email = sanitizeEmail(session.customer_details?.email || session.customer_email);
        if ((session.payment_status !== "paid" && Number(session.amount_total || 0) !== 0) || !PRODUCTS[slug] || !email) {
          return json(res, 403, { ok: false, error: "Pagamento não confirmado ou produto inválido." });
        }
        const created = upsertUser(email, planForProduct(slug), slug, false, false);
        setSession(res, created.user.id);
        return json(res, 200, { ok: true, user: publicUser(created.user) });
      });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/activate-account") {
      const b = await body(req);
      const sessionId = String(b.session_id || "");
      if (!sessionId) return json(res, 400, { ok: false, error: "Sessão de pagamento ausente." });
      stripeRequest("GET", "/v1/checkout/sessions/" + encodeURIComponent(sessionId), null, (err, session) => {
        if (err) return json(res, 400, { ok: false, error: "Não foi possível validar o pagamento." });
        const slug = session.metadata?.product_slug;
        const email = sanitizeEmail(session.customer_details?.email || session.customer_email);
        if ((session.payment_status !== "paid" && Number(session.amount_total || 0) !== 0) || !PRODUCTS[slug] || !email) return json(res, 403, { ok: false, error: "Pagamento não confirmado ou produto inválido." });
        const created = upsertUser(email, planForProduct(slug), slug, true, true);
        setSession(res, created.user.id);
        if (created.generatedPassword) {
          return sendAccessEmail(email, created.generatedPassword, PLANS[created.user.plan]?.label || created.user.plan, (sent, emailError, emailStatus) => {
            json(res, 200, { ok: true, user: publicUser(created.user), generatedPassword: created.generatedPassword, emailSent: !!sent, emailStatus: emailStatus || 0, emailError: sent ? null : (emailError?.message || "Falha no envio do e-mail"), product: PRODUCTS[slug].name });
          });
        }
        return json(res, 200, { ok: true, user: publicUser(created.user), generatedPassword: null, emailSent: false, product: PRODUCTS[slug].name });
      });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/finance/data") {
      const u = userFromRequest(req);
      if (!u) return json(res, 401, { ok: false, error: "Faça login para acessar o painel." });
      return json(res, 200, { ok: true, data: readFinance(u.id), user: publicUser(u) });
    }
    if (req.method === "POST" && url.pathname === "/api/finance/data") {
      const u = userFromRequest(req);
      if (!u) return json(res, 401, { ok: false, error: "Faça login para acessar o painel." });
      const b = await body(req);
      writeFinance(u.id, b.data);
      return json(res, 200, { ok: true, data: readFinance(u.id) });
    }
    if (req.method === "POST" && url.pathname === "/api/upgrade") {
      const u = userFromRequest(req);
      if (!u) return json(res, 401, { ok: false, error: "Faça login para fazer upgrade." });
      const requested = String((await body(req)).plan || "").toLowerCase();
      if (!UPGRADE_PRICES[requested] || rank(requested) <= rank(u.plan)) return json(res, 400, { ok: false, error: "Plano de upgrade inválido." });
      const site = PUBLIC_SITE_URL || "http://" + (req.headers.host || "localhost");
      const form = [
        ["mode", "subscription"],
        ["line_items[0][price]", UPGRADE_PRICES[requested]],
        ["line_items[0][quantity]", "1"],
        ["success_url", site + "/account.html?upgrade=success&session_id={CHECKOUT_SESSION_ID}"],
        ["cancel_url", site + "/account.html?upgrade=cancelled"],
        ["metadata[account_user_id]", u.id],
        ["metadata[access_plan]", requested],
        ["metadata[email]", u.email],
        ["subscription_data[metadata][account_user_id]", u.id],
        ["subscription_data[metadata][access_plan]", requested],
        ["subscription_data[metadata][email]", u.email]
      ].map(([k,v]) => enc(k) + "=" + enc(v)).join("&");
      stripeRequest("POST", "/v1/checkout/sessions", form, (err, session) => {
        if (err) return json(res, 400, { ok: false, error: err.message });
        json(res, 200, { ok: true, url: session.url });
      });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/download-product") {
      const u = userFromRequest(req);
      if (!u) return json(res, 401, { ok: false, error: "Faça login para baixar." });
      const slug = String(url.searchParams.get("product") || u.products[0] || "");
      const product = PRODUCTS[slug];
      if (!product || !u.products.includes(slug)) return json(res, 403, { ok: false, error: "Produto não liberado para esta conta." });
      return sendFile(res, path.join(ROOT, "products", product.file), product.file);
    }
    if (req.method === "POST" && url.pathname === "/api/stripe-webhook") {
      let raw = "";
      req.on("data", c => raw += c);
      req.on("end", () => {
        if (!verifyStripe(raw, req.headers["stripe-signature"])) return json(res, 400, { ok: false, error: "Assinatura inválida." });
        let event; try { event = JSON.parse(raw); } catch { return json(res, 400, { ok: false, error: "Evento inválido." }); }
        const obj = event.data?.object || {};
        if (event.type === "checkout.session.completed") {
          const slug = obj.metadata?.product_slug;
          const email = sanitizeEmail(obj.customer_details?.email || obj.customer_email);
          if (email && PRODUCTS[slug] && (obj.payment_status === "paid" || Number(obj.amount_total || 0) === 0)) {
            upsertUser(email, planForProduct(slug), slug, false, false);
          }
          if (obj.mode === "subscription" && obj.metadata?.account_user_id && obj.metadata?.access_plan) {
            const users = readUsers(); const u = users.find(x => x.id === obj.metadata.account_user_id);
            if (u) { u.plan = obj.metadata.access_plan; u.stripeCustomerId = obj.customer; u.subscriptionId = obj.subscription; writeUsers(users); }
          }
        }
        if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.created") {
          const meta = obj.metadata || {};
          if (meta.account_user_id && meta.access_plan) {
            const users = readUsers(); const u = users.find(x => x.id === meta.account_user_id);
            if (u) { u.plan = meta.access_plan; u.subscriptionId = obj.id; u.stripeCustomerId = obj.customer; writeUsers(users); }
          }
        }
        if (event.type === "customer.subscription.deleted") {
          const meta = obj.metadata || {};
          if (meta.account_user_id) {
            const users = readUsers(); const u = users.find(x => x.id === meta.account_user_id);
            if (u) { u.plan = u.products.some(slug => planForProduct(slug) === "business") ? "business" : "starter"; u.subscriptionId = null; writeUsers(users); }
          }
        }
        json(res, 200, { received: true });
      });
      return;
    }
    if (url.pathname === "/account.html" && req.method === "GET" && url.searchParams.get("session_id")) {
      const sessionId = String(url.searchParams.get("session_id") || "");
      stripeRequest("GET", "/v1/checkout/sessions/" + encodeURIComponent(sessionId), null, (err, session) => {
        if (!err) {
          const slug = session.metadata?.product_slug;
          const email = sanitizeEmail(session.customer_details?.email || session.customer_email);
          const valid = (session.payment_status === "paid" || Number(session.amount_total || 0) === 0) && PRODUCTS[slug] && email;
          if (valid) {
            const created = upsertUser(email, planForProduct(slug), slug, false, false);
            setSession(res, created.user.id);
            url.searchParams.delete("session_id");
            req.url = url.pathname + (url.search ? url.search : "");
          }
        }
        return proxy(req, res);
      });
      return;
    }
    if (url.pathname === "/login.html" || url.pathname === "/account.html" || url.pathname === "/account-success.html") {
      return proxy(req, res);
    }
    return proxy(req, res);
  } catch (e) {
    console.error(e);
    return json(res, 500, { ok: false, error: "Erro interno." });
  }
});

gateway.listen(PORT, "0.0.0.0", () => console.log("GlobalTools gateway running on port " + PORT + " (core " + CORE_PORT + ")"));
process.on("SIGTERM", () => { core.kill("SIGTERM"); process.exit(0); });
process.on("SIGINT", () => { core.kill("SIGINT"); process.exit(0); });
