#!/usr/bin/env node
"use strict";

// Oolivo keyword/catalog crawler modeled on SITELESTRASMUSICAS:
// rotate one subject per cycle, persist discoveries, preserve history, and only
// put real existing pages in the XML sitemap (never invent URLs from keywords).
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://oolivo.com.br";
const SEO_DATA_DIR = process.env.SEO_DATA_DIR || "/var/lib/globaltools/seo";
const KEYWORDS_FILE = path.join(SEO_DATA_DIR, "keyword-opportunities.json");
const STATE_FILE = path.join(SEO_DATA_DIR, "robot-state.json");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const ROBOTS_FILE = path.join(ROOT, "robots.txt");
const TODAY = () => new Date().toISOString().slice(0, 10);

const SEEDS = [
  "online tools", "free online tools", "word counter", "character counter", "case converter",
  "remove duplicate lines", "sort text lines", "text to slug", "json formatter", "json validator",
  "json minifier", "json to csv", "json to xml", "xml formatter", "yaml formatter", "csv viewer",
  "csv to json", "base64 encoder", "base64 decoder", "url encoder", "url decoder", "html formatter",
  "css formatter", "javascript formatter", "regex tester", "uuid generator", "password generator",
  "password strength checker", "hash generator", "jwt decoder", "markdown to html", "markdown to pdf",
  "text to pdf", "merge pdf", "split pdf", "compress pdf", "pdf page counter", "pdf metadata",
  "pdf to text", "rotate pdf", "image resizer", "image to base64", "image info", "png to jpg",
  "jpg to png", "webp to jpg", "webp to png", "color converter", "rgb to hex", "QR code generator",
  "date calculator", "days between dates", "date add subtract", "timestamp converter", "timezone converter",
  "age calculator", "percentage calculator", "discount calculator", "average calculator", "ratio calculator",
  "fraction calculator", "power calculator", "square root calculator", "tip calculator", "reading time calculator",
  "cash flow planner", "small business finance dashboard", "freelancer business kit", "business budget template",
  "expense tracker spreadsheet", "cash flow spreadsheet", "invoice template", "profit margin calculator",
  "break even calculator", "business loan calculator", "financial planning spreadsheet", "personal budget spreadsheet",
  "project planning template", "productivity tools", "developer tools", "tools for students", "tools for freelancers",
  "tools for small business", "free online calculator", "convert text online", "format JSON online", "PDF tools online"
];
const PREFIXES = ["free", "online", "best", "simple", "how to use", "for beginners", "for business", "for students", "without download"];
const SUFFIXES = ["online", "free", "tool", "calculator", "converter", "template", "examples", "without download", "for business"];

function requestJson(url) {
  return new Promise(resolve => {
    const req = https.get(url, {
      headers: { "User-Agent": "OolivoSEOResearchBot/1.0 (+https://oolivo.com.br/robots.txt)", Accept: "application/json" },
      timeout: 8000
    }, res => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", part => body += part);
      res.on("end", () => {
        try { resolve(res.statusCode === 200 ? JSON.parse(body) : null); }
        catch { resolve(null); }
      });
    });
    req.on("timeout", () => { req.destroy(); resolve(null); });
    req.on("error", () => resolve(null));
  });
}
function atomicWrite(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = file + ".tmp";
  fs.writeFileSync(temp, value);
  fs.renameSync(temp, file);
}
function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
function xmlEscape(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}
function walkPages(dir, rel = "") {
  const ignored = new Set([".git", ".github", "node_modules", "data", "seo", "dist"]);
  const excluded = new Set(["index.html", "login.html", "account.html", "account-success.html",
    "products/cash-flow-planner-success.html", "products/freelancer-business-kit-success.html",
    "products/small-business-finance-dashboard-success.html"]);
  let output = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const relative = path.posix.join(rel, entry.name);
    if (entry.isDirectory()) output = output.concat(walkPages(full, relative));
    else if (entry.isFile() && entry.name.endsWith(".html") && !excluded.has(relative)) {
      const html = fs.readFileSync(full, "utf8");
      const rawTitle = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || path.basename(relative, ".html");
      const title = rawTitle.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      output.push({ url: SITE + "/" + relative, title, lastmod: TODAY() });
    }
  }
  return output;
}
async function discover(seed) {
  const queries = new Set([seed]);
  PREFIXES.slice(0, 4).forEach(prefix => queries.add(prefix + " " + seed));
  SUFFIXES.slice(0, 4).forEach(suffix => queries.add(seed + " " + suffix));
  const found = [];
  for (const query of queries) {
    const url = "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=" + encodeURIComponent(query);
    const result = await requestJson(url);
    const suggestions = Array.isArray(result) && Array.isArray(result[1]) ? result[1] : [];
    for (const raw of suggestions) {
      const keyword = String(raw || "").trim().replace(/\s+/g, " ");
      if (keyword.length >= 3 && keyword.length <= 180) {
        found.push({ keyword, seed, source: "Google autocomplete", discoveredAt: new Date().toISOString() });
      }
    }
  }
  return found;
}
async function main() {
  fs.mkdirSync(SEO_DATA_DIR, { recursive: true });
  const state = readJson(STATE_FILE, { seedIndex: 0, totalRuns: 0 });
  const oldCatalog = readJson(KEYWORDS_FILE, { keywords: [] });
  const keywords = new Map();
  for (const item of oldCatalog.keywords || []) {
    if (item && item.keyword) keywords.set(normalize(item.keyword), item);
  }
  const index = Number(state.seedIndex || 0) % SEEDS.length;
  const seed = SEEDS[index];
  const baseIdeas = [
    seed,
    ...PREFIXES.slice(0, 3).map(prefix => prefix + " " + seed),
    ...SUFFIXES.slice(0, 3).map(suffix => seed + " " + suffix)
  ].map(keyword => ({ keyword, seed, source: "Oolivo seed expansion", discoveredAt: new Date().toISOString() }));

  try {
    const found = await discover(seed);
    for (const item of [...baseIdeas, ...found]) {
      const key = normalize(item.keyword);
      if (!key) continue;
      if (keywords.has(key)) {
        const prior = keywords.get(key);
        keywords.set(key, { ...prior, lastSeenAt: new Date().toISOString() });
      } else {
        keywords.set(key, item);
      }
    }
    const sorted = [...keywords.values()].sort((a, b) => a.keyword.localeCompare(b.keyword, "en"));
    atomicWrite(KEYWORDS_FILE, JSON.stringify({
      site: SITE,
      updatedAt: new Date().toISOString(),
      note: "Keyword ideas are research only. Sitemap entries always point to real existing pages; keyword discovery alone does not create or index URLs.",
      keywordCount: sorted.length,
      lastSeed: seed,
      keywords: sorted
    }, null, 2) + "\n");

    const pages = walkPages(ROOT);
    pages.unshift({ url: SITE + "/", title: "Oolivo — Ferramentas online gratuitas", lastmod: TODAY() });
    const unique = new Map();
    for (const page of pages) unique.set(page.url, page);
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      [...unique.values()].map(page => "  <url><loc>" + xmlEscape(page.url) + "</loc><lastmod>" + xmlEscape(page.lastmod) + "</lastmod></url>").join("\n") +
      "\n</urlset>\n";
    atomicWrite(SITEMAP_FILE, xml);

    if (fs.existsSync(ROBOTS_FILE)) {
      const oldRobots = fs.readFileSync(ROBOTS_FILE, "utf8");
      const declaration = "Sitemap: " + SITE + "/sitemap.xml";
      if (!oldRobots.includes(declaration)) atomicWrite(ROBOTS_FILE, oldRobots.trimEnd() + "\n" + declaration + "\n");
    }
    const nextState = {
      seedIndex: (index + 1) % SEEDS.length,
      totalRuns: Number(state.totalRuns || 0) + 1,
      lastRunAt: new Date().toISOString(),
      lastError: null,
      lastSeed: seed,
      keywordCount: sorted.length,
      sitemapUrlCount: unique.size
    };
    atomicWrite(STATE_FILE, JSON.stringify(nextState, null, 2) + "\n");
    console.log("[seo-robot] success", JSON.stringify(nextState));
  } catch (error) {
    const failed = { ...state, lastRunAt: new Date().toISOString(), lastError: String(error.message || error), lastSeed: seed };
    atomicWrite(STATE_FILE, JSON.stringify(failed, null, 2) + "\n");
    console.error("[seo-robot] failure", failed.lastError);
    process.exitCode = 1;
  }
}
main();
