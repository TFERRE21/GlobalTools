const http = require("http");
const https = require("https");
const crypto = require("crypto");
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
  ".webp": "image/webp",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  const FINANCE_PRICE_ID = "price_1UNtd1CCSBhBJictrnKiKQto";
  const PRODUCT_SLUG = "small-business-finance-dashboard";
  const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "");

  function stripeRequest(method, stripePath, body, callback) {
    if (!STRIPE_SECRET_KEY) return callback(new Error("STRIPE_SECRET_KEY is not configured"));
    const data = body ? Buffer.from(body) : null;
    const req = https.request({
      hostname: "api.stripe.com",
      path: stripePath,
      method,
      headers: {
        "Authorization": "Bearer " + STRIPE_SECRET_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
        ...(data ? {"Content-Length": data.length} : {})
      }
    }, response => {
      let raw = "";
      response.setEncoding("utf8");
      response.on("data", chunk => raw += chunk);
      response.on("end", () => {
        let json = null;
        try { json = JSON.parse(raw); } catch {}
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return callback(new Error((json && json.error && json.error.message) || raw || ("Stripe HTTP " + response.statusCode)));
        }
        callback(null, json);
      });
    });
    req.on("error", callback);
    if (data) req.write(data);
    req.end();
  }

  function readBody(req, callback) {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (Buffer.byteLength(raw) > 1024 * 1024) req.destroy();
    });
    req.on("end", () => callback(null, raw));
    req.on("error", callback);
  }

  function siteUrl(req) {
    return PUBLIC_SITE_URL || ("https://" + (req.headers.host || "localhost"));
  }

  function formEncode(value) {
    return encodeURIComponent(value).replace(/%20/g, "+");
  }

  function verifyStripeSignature(rawBody, signature) {
    if (!STRIPE_WEBHOOK_SECRET || !signature) return false;
    const parts = String(signature).split(",").reduce((acc, part) => {
      const [key, value] = part.split("=", 2);
      if (key && value) acc[key] = acc[key] || [];
      if (key && value) acc[key].push(value);
      return acc;
    }, {});
    const timestamp = parts.t && parts.t[0];
    const signatures = parts.v1 || [];
    if (!timestamp || !signatures.length) return false;
    if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
    const signed = timestamp + "." + rawBody;
    const expected = crypto.createHmac("sha256", STRIPE_WEBHOOK_SECRET).update(signed).digest("hex");
    return signatures.some(sig => {
      try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig)); }
      catch { return false; }
    });
  }

  if (urlPath === "/api/create-checkout-session" && req.method === "POST") {
    const success = siteUrl(req) + "/products/small-business-finance-dashboard-success.html?session_id={CHECKOUT_SESSION_ID}";
    const cancel = siteUrl(req) + "/products/small-business-finance-dashboard.html?checkout=cancelled";
    const body = [
      "mode=payment",
      "line_items[0][price]=" + formEncode(FINANCE_PRICE_ID),
      "line_items[0][quantity]=1",
      "success_url=" + formEncode(success),
      "cancel_url=" + formEncode(cancel),
      "metadata[product_slug]=" + formEncode(PRODUCT_SLUG)
    ].join("&");
    return stripeRequest("POST", "/v1/checkout/sessions", body, (err, session) => {
      if (err) {
        res.writeHead(500, {"Content-Type":"application/json; charset=utf-8"});
        return res.end(JSON.stringify({error:"Unable to start checkout.", detail:err.message}));
      }
      res.writeHead(200, {"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});
      res.end(JSON.stringify({url:session.url}));
    });
  }

  if (urlPath === "/api/download-finance" && req.method === "GET") {
    const query = new URL(req.url, "http://" + (req.headers.host || "localhost")).searchParams;
    const sessionId = query.get("session_id");
    if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
      res.writeHead(400, {"Content-Type":"text/plain; charset=utf-8"});
      return res.end("Invalid checkout session.");
    }
    return stripeRequest("GET", "/v1/checkout/sessions/" + encodeURIComponent(sessionId), null, (err, session) => {
      const valid = !err && session && session.payment_status === "paid" &&
        session.metadata && session.metadata.product_slug === PRODUCT_SLUG;
      if (!valid) {
        res.writeHead(403, {"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"});
        return res.end("Payment not confirmed.");
      }
      const filePath = path.join(root, "products", "GlobalTools-Small-Business-Finance-Dashboard-PRO.xlsx");
      if (!fs.existsSync(filePath)) {
        res.writeHead(503, {"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"});
        return res.end("The PRO workbook is still being prepared. Please try again in a moment.");
      }
      const data = fs.readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":"attachment; filename=\"GlobalTools-Small-Business-Finance-Dashboard-PRO.xlsx\"",
        "Content-Length":data.length,
        "Cache-Control":"private, no-store"
      });
      res.end(data);
    });
  }

  if (urlPath === "/api/stripe-webhook" && req.method === "POST") {
    return readBody(req, (bodyErr, rawBody) => {
      if (bodyErr || !verifyStripeSignature(rawBody, req.headers["stripe-signature"])) {
        res.writeHead(400, {"Content-Type":"text/plain; charset=utf-8"});
        return res.end("Invalid Stripe webhook signature.");
      }
      let event;
      try { event = JSON.parse(rawBody); } catch {
        res.writeHead(400, {"Content-Type":"text/plain; charset=utf-8"});
        return res.end("Invalid JSON.");
      }
      if (event.type === "checkout.session.completed") {
        const session = event.data && event.data.object;
        console.log("[stripe] checkout.session.completed", session && session.id, session && session.payment_status, session && session.metadata && session.metadata.product_slug);
      }
      res.writeHead(200, {"Content-Type":"application/json; charset=utf-8"});
      res.end(JSON.stringify({received:true}));
    });
  }
  if (urlPath === "/ads.txt" || urlPath === "/ads.txt/") {
    const body = "google.com, pub-6472882150880001, DIRECT, f08c47fec0942fa0" + String.fromCharCode(10);
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*"
    });
    return res.end(body);
  }

  // Accept clean URLs without .html and redirect them to the canonical .html URL.
  // This prevents 404s when users or search tools omit the file extension.
  const cleanToolMatch = urlPath.match(/^\/tools\/([a-z0-9-]+)\/?$/i);
  if (cleanToolMatch) {
    const target = "/tools/" + cleanToolMatch[1] + ".html";
    res.writeHead(301, {"Location": target, "Cache-Control": "no-cache"});
    return res.end();
  }
  if (urlPath === "/privacy" || urlPath === "/privacy/") {
    res.writeHead(301, {"Location": "/privacy.html", "Cache-Control": "no-cache"});
    return res.end();
  }
  if (urlPath === "/sobre" || urlPath === "/sobre/") { res.writeHead(301, {"Location": "/sobre.html", "Cache-Control": "no-cache"}); return res.end(); }
  if (urlPath === "/contato" || urlPath === "/contato/") { res.writeHead(301, {"Location": "/contato.html", "Cache-Control": "no-cache"}); return res.end(); }
  if (urlPath === "/terms" || urlPath === "/terms/") {
    res.writeHead(301, {"Location": "/terms.html", "Cache-Control": "no-cache"});
    return res.end();
  }


  // Server-side tool pages: useful explanatory content is rendered in the HTML
  // so users and search engines do not depend on client-side JavaScript.
  const toolMatch = urlPath.match(/^\/tools\/([a-z0-9-]+)\.html$/i);
  if (toolMatch) {
    const slug = toolMatch[1];
    const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
    const match = app.match(new RegExp('\\{slug:"'+slug+'",name:"([^"]+)",desc:"([^"]+)"'));
    if (match) {
      const name = match[1], desc = match[2];
      const safe = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
      const allTools = [...app.matchAll(/\{slug:"([^"]+)",name:"([^"]+)",desc:"([^"]+)",cat:"([^"]+)"\}/g)].map(m => ({slug:m[1],name:m[2],desc:m[3],cat:m[4]}));
      const current = allTools.find(t => t.slug === slug) || {slug,name,desc,cat:"tools"};
      const related = allTools.filter(t => t.slug !== slug && t.cat === current.cat).slice(0,6);
      const relatedHtml = related.map(t => '<a class="related-tool" href="/tools/'+t.slug+'.html"><strong>'+safe(t.name)+'</strong><span>'+safe(t.desc)+'</span></a>').join('');

      const groups = {
        text:["Esta ferramenta ajuda a trabalhar com texto diretamente no navegador.","Insira ou cole o texto no campo indicado.","Revise as opções disponíveis.","Execute a ferramenta e confira o resultado.","Caracteres especiais, espaços e quebras de linha podem influenciar a saída."],
        developer:["Esta ferramenta atende uma tarefa comum de desenvolvimento, como formatação, validação, codificação ou transformação de dados.","Cole os dados ou código no campo de entrada.","Comece com um exemplo curto para validar o formato.","Execute e revise o resultado antes de usar em produção.","Nunca cole chaves privadas, senhas ou tokens reais sem compreender o processamento."],
        pdf:["Esta ferramenta foi criada para uma operação específica com documentos PDF.","Selecione o PDF ou informe os dados solicitados.","Execute o processamento e aguarde a conclusão.","Abra o arquivo gerado e confirme o resultado.","PDFs com fontes, imagens, formulários ou criptografia podem apresentar limitações."],
        documents:["Esta ferramenta ajuda a converter ou organizar documentos e dados de escritório.","Selecione o arquivo compatível.","Confira os formatos de entrada e saída.","Execute a operação e abra o arquivo gerado para conferir.","Conversões podem alterar elementos avançados de formatação."],
        image:["Esta ferramenta trabalha com imagens para conversão, análise, redimensionamento ou compressão.","Selecione a imagem compatível.","Ajuste os parâmetros, se disponíveis.","Execute e confira formato, dimensões e qualidade.","Conversão e compressão podem alterar qualidade ou metadados."],
        generators:["Esta ferramenta gera um novo resultado a partir de parâmetros informados pelo usuário.","Defina os parâmetros desejados.","Execute a geração.","Revise o resultado antes de utilizá-lo.","Para credenciais reais, utilize práticas de segurança adequadas e não reutilize senhas."],
        converters:["Esta ferramenta converte um valor ou conteúdo de um formato para outro.","Informe o conteúdo de entrada.","Confira o formato esperado.","Execute a conversão e compare o resultado.","Conversões podem depender de padrões, precisão e formato de entrada."],
        calculators:["Esta calculadora executa uma operação matemática a partir dos valores informados.","Informe os valores solicitados.","Confira unidades e separadores.","Execute o cálculo e revise a fórmula.","Para decisões financeiras, fiscais ou profissionais, confirme o resultado com uma fonte qualificada."],
        "date-time":["Esta ferramenta ajuda a calcular ou interpretar datas, horários, intervalos ou timestamps.","Informe a data ou hora no formato indicado.","Execute a operação.","Confira fuso horário e convenção utilizados.","Fusos e formatos diferentes podem produzir resultados diferentes."],
        security:["Esta ferramenta executa uma operação relacionada a segurança, análise, hash ou decodificação.","Use dados de teste sempre que possível.","Execute a operação.","Interprete o resultado antes de tomar uma decisão de segurança.","Decodificar ou analisar um dado não significa validar sua autenticidade ou segurança."]
      };
      const g=groups[current.cat]||["Esta ferramenta oferece uma função digital específica para uma tarefa comum.","Informe os dados ou selecione o arquivo solicitado.","Execute a ferramenta seguindo as instruções.","Revise o resultado antes de utilizá-lo.","O resultado pode depender do formato da entrada, navegador, bibliotecas ou serviços utilizados."];

      const special={
        "age-calculator":["A Calculadora de Idade calcula anos completos a partir da data de nascimento.","Exemplo: se o aniversário ainda não ocorreu no ano atual, um ano é subtraído do resultado.","O cálculo usa a data do dispositivo; necessidades oficiais podem exigir regras específicas."],
        "percentage-calculator":["A Calculadora de Porcentagem mostra quanto uma porcentagem representa de determinado valor.","Exemplo: 15% de 200 = 200 × 15 ÷ 100 = 30.","Para aumentos e descontos, confirme qual é a base sobre a qual o percentual deve ser aplicado."],
        "discount-calculator":["A Calculadora de Desconto informa o valor descontado e o preço final.","Exemplo: R$ 200 com 15% de desconto resulta em R$ 30 de desconto e R$ 170 de preço final.","Frete, impostos e condições comerciais podem alterar o valor efetivamente pago."],
        "tip-calculator":["A Calculadora de Gorjeta estima a gorjeta, o total e o valor por pessoa.","Exemplo: R$ 100 com 10% gera R$ 10 de gorjeta e R$ 110 de total.","Confirme a política do estabelecimento e se a gorjeta já foi incluída na conta."],
        "password-generator":["O Gerador de Senhas cria combinações aleatórias para ajudar na criação de senhas longas e variadas.","Gere uma senha, confira o comprimento e use uma combinação diferente em cada serviço.","Para contas importantes, considere um gerenciador de senhas e autenticação multifator."],
        "jwt-decoder":["O JWT Decoder permite visualizar o header e o payload de um JSON Web Token. Isso não valida a assinatura do token.","Um JWT normalmente possui as partes header.payload.signature.","Tokens podem conter informações legíveis; não cole tokens reais sem compreender os riscos."],
        "hash-generator":["O gerador calcula um hash SHA-256 para o texto informado.","A mesma entrada produz o mesmo hash; pequenas alterações produzem uma saída diferente.","Hash não é criptografia reversível e não substitui funções apropriadas para armazenamento de senhas."],
        "qr-code-generator":["O Gerador de QR Code cria uma imagem a partir de texto ou endereço informado.","Cole um endereço completo, como https://example.com, e gere o código para testar.","Esta funcionalidade pode usar um serviço externo para gerar a imagem; não inclua informações secretas."]
      };
      const sp=special[slug];
      const purpose=sp?sp[0]:g[0], example=sp?sp[1]:"Comece com uma entrada curta e não sensível para conferir o comportamento antes de processar conteúdo importante.", notes=sp?sp[2]:g[4];
      const steps = [g[1],g[2],g[3]].map((x,i)=>'<li>'+safe(x)+'</li>').join('');
      const faq=[
        ["O que é "+name+"?",desc+" A ferramenta está disponível online para realizar essa tarefa sem instalar um programa específico."],
        ["Como usar "+name+"?","Informe os dados ou selecione o arquivo solicitado, execute a ferramenta e confira o resultado."],
        ["Preciso criar uma conta?","Não. As funções principais do Oolivo foram projetadas para uso sem cadastro."],
        ["Meus dados ficam no servidor?","Quando o processamento local é tecnicamente possível, a operação ocorre no navegador. Algumas funcionalidades dependem de bibliotecas ou serviços externos."]
      ];
      const faqHtml=faq.map(x=>'<div><h3>'+safe(x[0])+'</h3><p>'+safe(x[1])+'</p></div>').join('');
      const faqSchema=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faq.map(x=>({"@type":"Question","name":x[0],"acceptedAnswer":{"@type":"Answer","text":x[1]}}))}).replace(/</g,'\\u003c');
      const appSchema=JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":name+" — Oolivo","applicationCategory":"UtilitiesApplication","operatingSystem":"Web Browser","description":desc,"url":"https://oolivo.com.br/tools/"+slug+".html","isAccessibleForFree":true,"publisher":{"@type":"Organization","name":"Oolivo","url":"https://oolivo.com.br/"},"offers":{"@type":"Offer","price":"0","priceCurrency":"BRL"}}).replace(/</g,'\\u003c');
      const pageUrl="https://oolivo.com.br/tools/"+slug+".html";
      const html=[
        '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
        '<title>'+safe(name)+' — Ferramenta Online Grátis | Oolivo</title>',
        '<meta name="description" content="'+safe(desc)+' Saiba como usar, veja um exemplo e conheça as limitações no Oolivo.">',
        '<meta name="robots" content="index,follow"><link rel="canonical" href="'+pageUrl+'">',
        '<meta property="og:type" content="website"><meta property="og:title" content="'+safe(name)+' — Oolivo"><meta property="og:description" content="'+safe(desc)+'"><meta property="og:url" content="'+pageUrl+'"><meta property="og:site_name" content="Oolivo"><meta name="twitter:card" content="summary">',
        '<script type="application/ld+json">'+appSchema+'</script><script type="application/ld+json">'+faqSchema+'</script>',
        '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6472882150880001" crossorigin="anonymous"></script>',
        '<script async src="https://www.googletagmanager.com/gtag/js?id=G-DM7CKZRD30"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-DM7CKZRD30");</script>',
        '<link rel="stylesheet" href="/styles.css?v=20261006-1"><script defer src="/app.js?v=20261006-1"></script><!-- Google Ads tag --><script async src="https://www.googletagmanager.com/gtag/js?id=AW-17240722145"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","AW-17240722145");</script></head>',
        '<body><header class="site-header"><a class="brand" href="/"><span class="brand-mark">O</span>Oolivo</a><nav class="main-nav"><a href="/">Ferramentas</a><a href="/#categories">Categorias</a><a href="/sobre.html">Sobre</a><a href="/contato.html">Contato</a><a href="/privacy.html">Privacidade</a><label class="language-switcher"><span>🌐</span><select id="languageSelect"><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option></select></label></nav></header>',
        '<main class="tool-page"><div class="breadcrumbs"><a href="/">Início</a> / '+safe(name)+'</div><section class="tool-hero"><div class="tool-kicker">OOLIVO • FERRAMENTA ONLINE</div><h1>'+safe(name)+'</h1><p class="intro">'+safe(desc)+'</p></section>',
        '<div class="tool-workspace"><div id="tool" class="tool-box"><div id="dropZone" class="upload-visual file-upload-visual"><div class="upload-icon">↥</div><h2>Escolha os arquivos</h2><p>ou arraste e solte os arquivos aqui</p></div><textarea id="input" aria-label="'+safe(name)+'" placeholder="Digite ou cole seus dados..."></textarea><button id="action" class="btn primary-action">Executar ferramenta</button><div id="result" class="result">Seu resultado aparecerá aqui.</div></div>',
        '<aside class="tool-side"><div class="side-card"><strong>Privado quando possível</strong><p>O processamento ocorre no navegador sempre que a tecnologia utilizada permite.</p></div><div class="side-card"><strong>Grátis</strong><p>As funções principais não exigem cadastro.</p></div><div class="side-card"><strong>Orientações claras</strong><p>Leia exemplos e limitações antes de usar o resultado em uma atividade importante.</p></div></aside></div>',
        '<section class="info"><h2>Sobre '+safe(name)+'</h2><p>'+safe(purpose)+'</p><h2>Como usar</h2><ol>'+steps+'</ol><h2>Exemplo prático</h2><p>'+safe(example)+'</p><h2>Limitações e cuidados</h2><p>'+safe(notes)+'</p><h2>Perguntas frequentes</h2><div class="faq">'+faqHtml+'</div>',
        related.length?'<h2>Ferramentas relacionadas</h2><div class="related-tools">'+relatedHtml+'</div>':'',
        '<h2>Privacidade e processamento</h2><p>O Oolivo prioriza processamento no navegador quando isso é tecnicamente possível. Para saber mais sobre cookies, publicidade, Analytics e serviços externos, consulte a <a href="/privacy.html">Política de Privacidade</a>. Para dúvidas ou relatos de erros, use a <a href="/contato.html">página de contato</a>.</p></section></main>',
        '<footer class="site-footer"><div><div class="brand"><span class="brand-mark">O</span>Oolivo</div><p>Ferramentas online gratuitas para todos.</p></div><div class="footer-links"><a href="/sobre.html">Sobre</a><a href="/contato.html">Contato</a><a href="/privacy.html">Privacidade</a><a href="/terms.html">Termos</a></div></footer></body></html>'
      ].join('');
      res.writeHead(200, {"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache, no-store, must-revalidate"});
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
  if (ext === ".html") {
    let html = fs.readFileSync(finalPath, "utf8");
    if (!html.includes("G-DM7CKZRD30")) html = html.replace(/<head>/i, `<head><script async src="https://www.googletagmanager.com/gtag/js?id=G-DM7CKZRD30"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-DM7CKZRD30");</script>`);
    if (!html.includes("/language.js")) html = html.replace(/<\\/head>/i, `<script defer src="/language.js?v=20261007-01"></script></head>`);
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache, no-store, must-revalidate"});
    return res.end(html);
  }
  res.writeHead(200, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" || ext === ".js" || ext === ".css" ? "no-cache, no-store, must-revalidate" : "public, max-age=86400"
  });
  fs.createReadStream(finalPath).pipe(res);
});

server.listen(port, "0.0.0.0", () => {
  console.log("GlobalTools running on port " + port);
});
