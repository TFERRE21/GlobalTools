const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  // Tool pages are generated from the central tool catalog so every tool
  // always loads the same functional browser engine from /app.js.
  const toolMatch = urlPath.match(/^\/tools\/([a-z0-9-]+)\.html$/i);
  if (toolMatch) {
    const slug = toolMatch[1];
    const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
    const match = app.match(new RegExp('\\{slug:"'+slug+'",name:"([^"]+)",desc:"([^"]+)"'));
    if (match) {
      const name = match[1], desc = match[2];
      const safe = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safe(name)} — Free Online Tool | GlobalTools</title><meta name="description" content="${safe(desc)} Free, fast and browser-based with GlobalTools."><meta name="robots" content="index,follow"><link rel="canonical" href="/tools/${slug}.html"><link rel="stylesheet" href="/styles.css"><script defer src="/app.js"></script></head><body><header class="site-header"><a class="brand" href="/">Global<span>Tools</span></a><nav><a href="/" data-i18n="navTools">Tools</a><a href="/#categories" data-i18n="navCategories">Categories</a><a href="/privacy.html" data-i18n="navPrivacy">Privacy</a><label class="language-switcher"><span>🌐</span><select id="languageSelect"><option value="en">English</option><option value="pt">Português</option><option value="es">Español</option><option value="fr">Français</option></select></label></nav></header><main class="tool-page"><div class="breadcrumbs"><a href="/">Home</a> / ${safe(name)}</div><h1>${safe(name)}</h1><p class="intro">${safe(desc)} Use it directly in your browser.</p><div id="tool" class="tool-box"><textarea id="input" aria-label="${safe(name)} input" placeholder="Enter or paste your data..."></textarea><button id="action" class="btn">Run Tool</button><div id="result" class="result">Your result will appear here.</div></div><section class="info"><h2>About ${safe(name)}</h2><p>${safe(desc)} GlobalTools provides free browser-based utilities designed for quick, practical tasks.</p><h2>How to use</h2><p>Enter your data or choose a file when requested, then run the tool.</p></section></main><footer><div class="brand">Global<span>Tools</span></div><p>Free online tools for everyone.</p><div><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></div></footer></body></html>`;
      res.writeHead(200, {"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache"});
      return res.end(html);
    }
  }

  const filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
    res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
    return res.end("Not found");
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) urlPath += "/index.html";

  const finalPath = path.join(root, urlPath);
  if (!fs.existsSync(finalPath)) {
    res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
    return res.end("Not found");
  }

  const ext = path.extname(finalPath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
  });
  fs.createReadStream(finalPath).pipe(res);
});

server.listen(port, "0.0.0.0", () => {
  console.log("GlobalTools running on port " + port);
});
