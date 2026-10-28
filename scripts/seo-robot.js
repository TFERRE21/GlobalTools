#!/usr/bin/env node
"use strict";

// Oolivo SEO robot: discovers keyword ideas from public autocomplete suggestions
// and builds a sitemap exclusively from real, existing public HTML pages.
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = process.cwd();
const SITE = "https://oolivo.com.br";
const OUT_DIR = path.join(ROOT, "seo");
const SEO_DATA_DIR = process.env.SEO_DATA_DIR || OUT_DIR;\nconst KEYWORDS_FILE = path.join(SEO_DATA_DIR, "keyword-opportunities.json");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const TODAY = new Date().toISOString().slice(0, 10);
const EXCLUDED = new Set([
  "index.html", "login.html", "account.html", "account-success.html",
  "products/cash-flow-planner-success.html",
  "products/freelancer-business-kit-success.html",
  "products/small-business-finance-dashboard-success.html"
]);
const IGNORE_DIRS = new Set([".git", ".github", "node_modules", "data", "seo"]);

function requestJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { "User-Agent": "OolivoSEOResearchBot/1.0", "Accept": "application/json" },
      timeout: 8000
    }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try { resolve(res.statusCode === 200 ? JSON.parse(body) : null); }
        catch { resolve(null); }
      });
    });
    req.on("timeout", () => { req.destroy(); resolve(null); });
    req.on("error", () => resolve(null));
  });
}

function walk(dir, rel = "") {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.name.startsWith(".") || IGNORE_DIRS.has(item.name)) continue;
    const full = path.join(dir, item.name);
    const childRel = path.posix.join(rel, item.name);
    if (item.isDirectory()) files = files.concat(walk(full, childRel));
    else if (item.isFile() && item.name.endsWith(".html") && !EXCLUDED.has(childRel)) files.push({ full, rel: childRel });
  }
  return files;
}

function metadata(html, fallback) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || fallback;
  const description = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] || "";
  const clean = s => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return { title: clean(title), description: clean(description) };
}

function xmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(SEO_DATA_DIR, { recursive: true });
  fs.mkdirSync(SEO_DATA_DIR, { recursive: true });\n  fs.mkdirSync(SEO_DATA_DIR, { recursive: true });
  const pages = walk(ROOT).map(({ full, rel }) => {
    const html = fs.readFileSync(full, "utf8");
    const meta = metadata(html, path.basename(rel, ".html").replace(/[-_]/g, " "));
    return { path: rel, url: SITE + "/" + rel, ...meta };
  });
  pages.unshift({ path: "", url: SITE + "/", title: "Oolivo — ferramentas online gratuitas", description: "Ferramentas online gratuitas para texto, PDF, imagens, conversões e cálculos." });

  const urls = pages.map(p => `  <url>\n    <loc>${xmlEscape(p.url)}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const sitemapTemp = SITEMAP_FILE + ".tmp";\n  fs.writeFileSync(sitemapTemp, sitemap);\n  fs.renameSync(sitemapTemp, SITEMAP_FILE);

  // Limit queries and deduplicate to keep the daily job respectful and reliable.
  const seeds = [...new Set(pages.map(p => p.title).filter(Boolean))].slice(0, 35);
  const found = new Map();
  for (const seed of seeds) {
    const q = seed.slice(0, 90);
    const url = "https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&q=" + encodeURIComponent(q);
    const result = await requestJson(url);
    const suggestions = Array.isArray(result) && Array.isArray(result[1]) ? result[1] : [];
    for (const suggestion of suggestions) {
      const keyword = String(suggestion).trim();
      if (!keyword || keyword.length > 180) continue;
      const key = keyword.toLocaleLowerCase("pt-BR");
      if (!found.has(key)) found.set(key, { keyword, seed, source: "Google autocomplete", discoveredAt: TODAY });
    }
  }

  const previous = fs.existsSync(KEYWORDS_FILE) ? JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf8")) : { keywords: [] };
  const merged = new Map();
  for (const item of [...(previous.keywords || []), ...found.values()]) {
    if (item && item.keyword) merged.set(item.keyword.toLocaleLowerCase("pt-BR"), item);
  }
  const payload = {
    site: SITE,
    updatedAt: new Date().toISOString(),
    note: "Sugestões de autocomplete são ideias de palavras-chave, não volume de busca nem garantia de indexação. Criar páginas úteis e originais; não publicar páginas automáticas de baixa qualidade.",
    keywordCount: merged.size,
    keywords: [...merged.values()].sort((a, b) => a.keyword.localeCompare(b.keyword, "pt-BR"))
  };
  fs.writeFileSync(KEYWORDS_FILE, JSON.stringify(payload, null, 2) + "\n");
  console.log(`SEO robot concluído: ${pages.length} URLs no sitemap; ${found.size} novas sugestões; ${merged.size} sugestões acumuladas.`);
}
main().catch(err => { console.error(err); process.exit(1); });
