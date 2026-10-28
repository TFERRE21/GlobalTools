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

const GUIDES = [
  {
    slug: "guias/ferramentas-de-texto-online.html",
    title: "Ferramentas de texto online gratuitas",
    description: "Conheça ferramentas gratuitas para contar caracteres, organizar linhas, remover espaços e transformar texto diretamente no navegador.",
    intro: "Tarefas simples com texto podem consumir tempo quando feitas manualmente. As ferramentas de texto do Oolivo ajudam a contar, limpar e organizar conteúdo sem instalar programas.",
    sections: [
      ["Contar palavras e caracteres", "Use contadores para revisar limites de formulários, publicações, descrições e documentos antes de enviar o texto.", "/tools/character-counter.html", "Contador de caracteres"],
      ["Limpar e organizar linhas", "Remova linhas duplicadas ou espaços extras para preparar listas, planilhas copiadas e dados textuais.", "/tools/remove-duplicate-lines.html", "Remover linhas duplicadas"],
      ["Converter letras maiúsculas e minúsculas", "Padronize títulos, listas e trechos de texto sem precisar reescrever tudo.", "/tools/case-converter.html", "Conversor de maiúsculas e minúsculas"]
    ]
  },
  {
    slug: "guias/ferramentas-json-para-desenvolvedores.html",
    title: "Ferramentas JSON online para desenvolvedores",
    description: "Aprenda a formatar, validar e converter JSON com ferramentas online gratuitas para desenvolvimento e depuração.",
    intro: "JSON é um formato comum para APIs, configurações e troca de dados. Um arquivo bem formatado facilita encontrar erros e entender a estrutura antes de usar os dados em uma aplicação.",
    sections: [
      ["Formatar e validar JSON", "A indentação organiza objetos e arrays; a validação ajuda a localizar problemas como vírgulas extras, aspas ausentes e valores malformados.", "/tools/json-formatter.html", "Formatador JSON"],
      ["Minificar JSON", "A minificação remove espaços desnecessários e pode ser útil quando um sistema precisa de uma representação compacta dos dados.", "/tools/json-minifier.html", "Minificador JSON"],
      ["Converter JSON para CSV", "Quando os dados têm uma estrutura tabular compatível, a conversão para CSV facilita a análise em planilhas.", "/tools/json-to-csv.html", "Conversor JSON para CSV"]
    ]
  },
  {
    slug: "guias/calculadoras-online.html",
    title: "Calculadoras online gratuitas para o dia a dia",
    description: "Use calculadoras online para porcentagem, médias, frações, idade e diferenças entre datas, sem instalar aplicativos.",
    intro: "Uma calculadora online é útil para conferir resultados rapidamente em estudos, tarefas pessoais e rotinas de trabalho. Confira a finalidade de cada ferramenta e revise os dados inseridos antes de usar o resultado.",
    sections: [
      ["Calcular porcentagens", "Descubra uma porcentagem de um valor ou compare variações percentuais em preços, metas e resultados.", "/tools/percentage-calculator.html", "Calculadora de porcentagem"],
      ["Calcular médias", "Organize valores numéricos e calcule a média aritmética para conferências e exercícios.", "/tools/average-calculator.html", "Calculadora de média"],
      ["Calcular idade e intervalos de datas", "Encontre a idade a partir de uma data de nascimento ou veja quantos dias existem entre duas datas.", "/tools/age-calculator.html", "Calculadora de idade"]
    ]
  },
  {
    slug: "guias/ferramentas-pdf-online.html",
    title: "Ferramentas PDF online: organizar e consultar documentos",
    description: "Veja opções para trabalhar com arquivos PDF online, incluindo compactação, mesclagem, leitura de texto e metadados.",
    intro: "Antes de compartilhar um PDF, vale conferir o tamanho do arquivo, a ordem das páginas e se o documento contém as informações esperadas. Escolha a ferramenta de acordo com a tarefa e mantenha uma cópia original quando o arquivo for importante.",
    sections: [
      ["Reduzir o tamanho de um PDF", "A compactação pode ajudar quando há limites de tamanho para anexos ou formulários. Confira a qualidade do resultado antes de substituir o original.", "/tools/compress-pdf.html", "Compactar PDF"],
      ["Juntar documentos PDF", "A ferramenta de mesclagem pode reunir documentos relacionados em um único arquivo para facilitar o envio e o arquivamento.", "/tools/merge-pdf.html", "Mesclar PDFs"],
      ["Consultar metadados do PDF", "Metadados podem revelar informações técnicas do arquivo, como propriedades do documento, dependendo do conteúdo disponível.", "/tools/pdf-metadata.html", "Metadados de PDF"]
    ]
  },
  {
    slug: "guias/ferramentas-de-imagem-online.html",
    title: "Ferramentas de imagem online gratuitas",
    description: "Redimensione imagens, consulte dimensões e converta formatos com ferramentas online práticas.",
    intro: "Preparar imagens para sites, formulários e compartilhamento geralmente envolve ajustar dimensões ou escolher um formato adequado. Sempre confira o arquivo final antes de publicá-lo.",
    sections: [
      ["Redimensionar imagens", "Ajuste largura e altura para adequar imagens a páginas, apresentações e publicações.", "/tools/image-resizer.html", "Redimensionar imagem"],
      ["Consultar informações da imagem", "Verifique dimensões e informações técnicas para entender melhor um arquivo antes de utilizá-lo.", "/tools/image-info.html", "Informações da imagem"],
      ["Converter PNG para JPG", "A conversão pode ser útil quando uma plataforma aceita apenas determinados formatos; observe que formatos diferentes podem tratar transparência de maneiras distintas.", "/tools/png-to-jpg.html", "Converter PNG para JPG"]
    ]
  },
  {
    slug: "guias/planilhas-e-controle-financeiro.html",
    title: "Planilhas e ferramentas para controle financeiro",
    description: "Entenda como organizar receitas, despesas, orçamento e fluxo de caixa com ferramentas e modelos de controle financeiro.",
    intro: "Um controle financeiro útil começa com registros consistentes de entradas, saídas e datas. Separar despesas por categoria e revisar o fluxo de caixa ajuda a visualizar compromissos e planejar os próximos períodos.",
    sections: [
      ["Planejar o fluxo de caixa", "Registre entradas e saídas previstas e compare o planejamento com os valores realizados para identificar períodos de maior pressão financeira.", "/products/cash-flow-planner.html", "Cash Flow Planner"],
      ["Organizar o orçamento de uma pequena empresa", "Uma planilha estruturada pode ajudar a reunir despesas recorrentes, custos variáveis e metas em um único lugar.", "/products/small-business-finance-dashboard.html", "Painel financeiro para pequenas empresas"],
      ["Preparar um kit financeiro para freelancers", "Profissionais autônomos podem separar despesas pessoais e profissionais, registrar pagamentos e acompanhar custos com mais clareza.", "/products/freelancer-business-kit.html", "Kit financeiro para freelancers"]
    ]
  }
];

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

function ensureGuidePages() {
  for (const guide of GUIDES) {
    const file = path.join(ROOT, guide.slug);
    if (fs.existsSync(file)) continue; // Never overwrite an existing page or user edits.
    const canonical = SITE + "/" + guide.slug;
    const sections = guide.sections.map(([heading, body, href, label]) =>
      "<section><h2>" + heading + "</h2><p>" + body + "</p><p><a href=\"" + href + "\">" + label + " →</a></p></section>"
    ).join("\\n");
    const html = "<!doctype html>\\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
      "<title>" + guide.title + " | Oolivo</title><meta name=\"description\" content=\"" + guide.description + "\"><meta name=\"robots\" content=\"index,follow\"><link rel=\"canonical\" href=\"" + canonical + "\">" +
      "<style>body{font:16px/1.7 system-ui,-apple-system,Segoe UI,sans-serif;max-width:900px;margin:0 auto;padding:24px;color:#172033}header,main,footer{margin:0 auto 28px}a{color:#075fc7}h1{line-height:1.2;font-size:clamp(2rem,5vw,3rem)}section{padding:18px 0;border-top:1px solid #e3e8ef}nav a{margin-right:16px}footer{font-size:.9rem;color:#5d6878}</style></head><body>" +
      "<header><nav><a href=\"/\">Oolivo</a><a href=\"/tools/\">Ferramentas</a><a href=\"/store.html\">Loja</a></nav></header><main><h1>" + guide.title + "</h1><p>" + guide.intro + "</p>" + sections +
      "<section><h2>Sobre estas ferramentas</h2><p>As ferramentas disponíveis no Oolivo têm finalidades específicas. Confira o resultado e evite inserir dados confidenciais em qualquer serviço online.</p></section></main><footer><a href=\"/privacy.html\">Privacidade</a> · <a href=\"/contact.html\">Contato</a> · <a href=\"/sobre.html\">Sobre o Oolivo</a></footer></body></html>\\n";
    fs.mkdirSync(path.dirname(file), { recursive: true });
    atomicWrite(file, html);
    console.log("[seo-robot] guide page created", guide.slug);
  }
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
      note: "Keyword opportunities are preserved across runs. Curated guide pages are created once, only when missing, and sitemap entries point to real local HTML pages.",
      keywordCount: sorted.length,
      lastSeed: seed,
      keywords: sorted
    }, null, 2) + "\n");

    ensureGuidePages();
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
