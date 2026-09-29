const tools=[
{slug:"word-counter",name:"Word Counter",desc:"Count words, characters, sentences and paragraphs.",cat:"text"},
{slug:"character-counter",name:"Character Counter",desc:"Count characters with and without spaces.",cat:"text"},
{slug:"case-converter",name:"Case Converter",desc:"Convert text to upper, lower, title and sentence case.",cat:"text"},
{slug:"remove-duplicate-lines",name:"Remove Duplicate Lines",desc:"Clean text by removing repeated lines.",cat:"text"},
{slug:"json-formatter",name:"JSON Formatter",desc:"Format and validate JSON instantly.",cat:"developer"},
{slug:"json-minifier",name:"JSON Minifier",desc:"Minify JSON for compact output.",cat:"developer"},
{slug:"base64-encoder",name:"Base64 Encoder",desc:"Encode text to Base64 in your browser.",cat:"developer"},
{slug:"base64-decoder",name:"Base64 Decoder",desc:"Decode Base64 text safely in your browser.",cat:"developer"},
{slug:"url-encoder",name:"URL Encoder",desc:"Encode text for use in URLs.",cat:"developer"},
{slug:"url-decoder",name:"URL Decoder",desc:"Decode percent-encoded URLs.",cat:"developer"},
{slug:"uuid-generator",name:"UUID Generator",desc:"Generate random UUID v4 identifiers.",cat:"generators"},
{slug:"password-generator",name:"Password Generator",desc:"Generate strong random passwords.",cat:"generators"},
{slug:"qr-code-generator",name:"QR Code Generator",desc:"Create a QR code from text or a URL.",cat:"generators"},
{slug:"lorem-ipsum-generator",name:"Lorem Ipsum Generator",desc:"Generate placeholder text for designs.",cat:"generators"},
{slug:"percentage-calculator",name:"Percentage Calculator",desc:"Calculate percentages quickly.",cat:"converters"},
{slug:"age-calculator",name:"Age Calculator",desc:"Calculate age from a date of birth.",cat:"converters"},
{slug:"unix-timestamp",name:"Unix Timestamp Converter",desc:"Convert Unix timestamps to readable dates.",cat:"converters"},
{slug:"color-converter",name:"Color Converter",desc:"Convert HEX colors to RGB and back.",cat:"converters"},
{slug:"image-info",name:"Image Information",desc:"Inspect image dimensions and file size.",cat:"image"},
{slug:"image-to-data-url",name:"Image to Data URL",desc:"Convert an image into a Data URL.",cat:"image"},
{slug:"pdf-tools",name:"PDF Tools",desc:"PDF utilities and browser-based document helpers.",cat:"pdf"},
{slug:"compress-pdf",name:"Compress PDF",desc:"Reduce PDF file size in your browser.",cat:"pdf"},
{slug:"compress-file",name:"Comprimir Arquivo",desc:"Comprima PDF, imagens e arquivos no navegador.",cat:"tools"},
{slug:"merge-files",name:"Juntar Arquivos",desc:"Junte vários arquivos PDF em um único documento.",cat:"pdf"},
{slug:"edit-pdf",name:"Editar PDF",desc:"Adicione texto a um PDF e gere uma nova versão.",cat:"pdf"},
{slug:"jpg-to-pdf",name:"JPG to PDF",desc:"Convert JPG, PNG and images to PDF.",cat:"pdf"},
{slug:"pdf-to-jpg",name:"PDF to JPG",desc:"Convert PDF pages into JPG images.",cat:"pdf"},
{slug:"pdf-to-png",name:"PDF to PNG",desc:"Convert PDF pages into PNG images.",cat:"pdf"},
{slug:"delete-pdf-pages",name:"Delete PDF Pages",desc:"Remove selected pages from a PDF.",cat:"pdf"},
{slug:"extract-pdf-pages",name:"Extract PDF Pages",desc:"Extract selected pages into a new PDF.",cat:"pdf"},
{slug:"crop-pdf",name:"Crop PDF",desc:"Crop PDF pages to a standard printable area.",cat:"pdf"},
{slug:"watermark-pdf",name:"Watermark PDF",desc:"Add a text watermark to every PDF page.",cat:"pdf"},
{slug:"number-pdf-pages",name:"Number PDF Pages",desc:"Add page numbers to a PDF.",cat:"pdf"},
{slug:"organize-pdf",name:"Organize PDF",desc:"Reorder PDF pages with a simple page sequence.",cat:"pdf"},
{slug:"word-to-pdf",name:"Word to PDF",desc:"Convert DOCX documents to printable PDF.",cat:"documents"},
{slug:"pdf-to-word",name:"PDF to Word",desc:"Convert PDF text into an editable Word document.",cat:"documents"},
{slug:"word-to-text",name:"Word to TXT",desc:"Extract text from DOCX documents.",cat:"documents"},
{slug:"word-to-html",name:"Word to HTML",desc:"Convert DOCX documents to HTML.",cat:"documents"},
{slug:"excel-to-csv",name:"Excel to CSV",desc:"Convert Excel spreadsheets to CSV.",cat:"documents"},
{slug:"excel-to-json",name:"Excel to JSON",desc:"Convert Excel spreadsheets to JSON.",cat:"documents"},
{slug:"csv-to-excel",name:"CSV to Excel",desc:"Convert CSV files into Excel workbooks.",cat:"documents"},
{slug:"excel-to-pdf",name:"Excel to PDF",desc:"Convert spreadsheet data to a printable PDF.",cat:"documents"},
{slug:"html-to-pdf",name:"HTML to PDF",desc:"Print HTML content as a PDF.",cat:"documents"},
{slug:"text-to-slug",name:"Text to Slug",desc:"Create clean URL slugs from text.",cat:"text"},
{slug:"hash-generator",name:"SHA-256 Hash Generator",desc:"Generate SHA-256 hashes from text.",cat:"developer"},
{slug:"number-base-converter",name:"Number Base Converter",desc:"Convert numbers between binary, decimal, hexadecimal and more.",cat:"developer"},
{slug:"reverse-text",name:"Reverse Text",desc:"Reverse text instantly.",cat:"text"},
{slug:"sort-lines",name:"Sort Lines",desc:"Sort lines alphabetically.",cat:"text"},
{slug:"remove-extra-spaces",name:"Remove Extra Spaces",desc:"Clean repeated spaces and blank lines.",cat:"text"},
{slug:"html-escape",name:"HTML Escape",desc:"Escape text for safe HTML.",cat:"developer"},
{slug:"html-unescape",name:"HTML Unescape",desc:"Decode common HTML entities.",cat:"developer"},
{slug:"random-number-generator",name:"Random Number Generator",desc:"Generate random numbers.",cat:"generators"},
{slug:"dice-roller",name:"Dice Roller",desc:"Roll virtual dice.",cat:"generators"},
{slug:"binary-to-text",name:"Binary to Text",desc:"Decode binary bytes into text.",cat:"developer"},
{slug:"text-to-binary",name:"Text to Binary",desc:"Convert text into binary.",cat:"developer"},
{slug:"count-lines",name:"Line Counter",desc:"Count lines in text.",cat:"text"}
,
{slug:"csv-to-json",name:"CSV to JSON",desc:"Convert CSV data into JSON.",cat:"tools"},
{slug:"json-to-csv",name:"JSON to CSV",desc:"Convert JSON records into CSV.",cat:"tools"},
{slug:"xml-formatter",name:"XML Formatter",desc:"Format XML for readability.",cat:"tools"},
{slug:"sql-formatter",name:"SQL Formatter",desc:"Format SQL queries.",cat:"tools"},
{slug:"markdown-to-html",name:"Markdown to HTML",desc:"Convert Markdown into HTML.",cat:"tools"},
{slug:"html-formatter",name:"HTML Formatter",desc:"Format HTML code.",cat:"tools"},
{slug:"css-formatter",name:"CSS Formatter",desc:"Format CSS code.",cat:"tools"},
{slug:"javascript-formatter",name:"JavaScript Formatter",desc:"Format JavaScript code.",cat:"tools"},
{slug:"yaml-formatter",name:"YAML Formatter",desc:"Format YAML text.",cat:"tools"},
{slug:"regex-tester",name:"Regex Tester",desc:"Test regular expressions.",cat:"tools"},
{slug:"url-parser",name:"URL Parser",desc:"Inspect URL components.",cat:"tools"},
{slug:"email-validator",name:"Email Validator",desc:"Validate basic email format.",cat:"tools"},
{slug:"ip-address-info",name:"IP Address Parser",desc:"Parse IP address format.",cat:"tools"},
{slug:"jwt-decoder",name:"JWT Decoder",desc:"Decode JWT header and payload.",cat:"tools"},
{slug:"hex-to-rgb",name:"HEX to RGB",desc:"Convert HEX to RGB.",cat:"tools"},
{slug:"rgb-to-hex",name:"RGB to HEX",desc:"Convert RGB to HEX.",cat:"tools"},
{slug:"timestamp-to-date",name:"Timestamp to Date",desc:"Convert Unix timestamps to dates.",cat:"tools"},
{slug:"date-to-timestamp",name:"Date to Timestamp",desc:"Convert dates to Unix timestamps.",cat:"tools"},
{slug:"timezone-converter",name:"Time Zone Converter",desc:"Convert times between zones.",cat:"tools"},
{slug:"days-between-dates",name:"Days Between Dates",desc:"Calculate days between dates.",cat:"tools"},
{slug:"date-add-subtract",name:"Date Add Subtract",desc:"Add or subtract days.",cat:"tools"},
{slug:"leap-year-checker",name:"Leap Year Checker",desc:"Check leap years.",cat:"tools"},
{slug:"week-number",name:"Week Number Calculator",desc:"Find week numbers.",cat:"tools"},
{slug:"time-duration",name:"Time Duration Calculator",desc:"Calculate time durations.",cat:"tools"},
{slug:"discount-calculator",name:"Discount Calculator",desc:"Calculate sale prices and savings.",cat:"tools"},
{slug:"tip-calculator",name:"Tip Calculator",desc:"Calculate tips and split bills.",cat:"tools"},
{slug:"ratio-calculator",name:"Ratio Calculator",desc:"Work with ratios.",cat:"tools"},
{slug:"average-calculator",name:"Average Calculator",desc:"Calculate averages.",cat:"tools"},
{slug:"fraction-calculator",name:"Fraction Calculator",desc:"Work with fractions.",cat:"tools"},
{slug:"square-root-calculator",name:"Square Root Calculator",desc:"Calculate square roots.",cat:"tools"},
{slug:"power-calculator",name:"Power Calculator",desc:"Calculate powers.",cat:"tools"},
{slug:"random-choice-picker",name:"Random Choice Picker",desc:"Pick a random item.",cat:"tools"},
{slug:"image-to-base64",name:"Image to Base64",desc:"Convert images to Base64.",cat:"tools"},
{slug:"base64-to-file",name:"Base64 to File",desc:"Decode Base64 data.",cat:"tools"},
{slug:"image-color-picker",name:"Image Color Picker",desc:"Inspect image colors.",cat:"tools"},
{slug:"image-cropper",name:"Image Cropper",desc:"Crop images in the browser.",cat:"tools"},
{slug:"image-resizer",name:"Image Resizer",desc:"Resize images.",cat:"tools"},
{slug:"image-compressor",name:"Image Compressor",desc:"Compress images.",cat:"tools"},
{slug:"jpg-to-png",name:"JPG to PNG",desc:"Convert JPG to PNG.",cat:"tools"},
{slug:"png-to-jpg",name:"PNG to JPG",desc:"Convert PNG to JPG.",cat:"tools"},
{slug:"webp-to-jpg",name:"WebP to JPG",desc:"Convert WebP to JPG.",cat:"tools"},
{slug:"jpg-to-webp",name:"JPG to WebP",desc:"Convert JPG to WebP.",cat:"tools"},
{slug:"png-to-webp",name:"PNG to WebP",desc:"Convert PNG to WebP.",cat:"tools"},
{slug:"webp-to-png",name:"WebP to PNG",desc:"Convert WebP to PNG.",cat:"tools"},
{slug:"svg-to-data-url",name:"SVG to Data URL",desc:"Convert SVG into a Data URL.",cat:"tools"},
{slug:"image-dimensions",name:"Image Dimensions",desc:"Check image dimensions.",cat:"tools"},
{slug:"pdf-page-counter",name:"PDF Page Counter",desc:"Count PDF pages.",cat:"tools"},
{slug:"pdf-metadata",name:"PDF Metadata Viewer",desc:"Inspect PDF metadata.",cat:"tools"},
{slug:"pdf-to-text",name:"PDF to Text",desc:"Extract text from supported PDFs.",cat:"tools"},
{slug:"merge-pdf",name:"Merge PDF",desc:"Combine PDF files.",cat:"tools"},
{slug:"split-pdf",name:"Split PDF",desc:"Extract PDF pages.",cat:"tools"},
{slug:"rotate-pdf",name:"Rotate PDF",desc:"Rotate PDF pages.",cat:"tools"},
{slug:"compress-pdf",name:"Compress PDF",desc:"Reduce PDF size.",cat:"tools"},
{slug:"text-to-pdf",name:"Text to PDF",desc:"Create PDF from text.",cat:"tools"},
{slug:"markdown-to-pdf",name:"Markdown to PDF",desc:"Create PDF from Markdown.",cat:"tools"},
{slug:"csv-viewer",name:"CSV Viewer",desc:"Preview CSV data.",cat:"tools"},
{slug:"json-to-typescript",name:"JSON to TypeScript",desc:"Generate TypeScript interfaces.",cat:"tools"},
{slug:"json-to-java",name:"JSON to Java",desc:"Generate Java-friendly models.",cat:"tools"},
{slug:"json-to-python",name:"JSON to Python",desc:"Prepare JSON for Python.",cat:"tools"},
{slug:"url-query-parser",name:"URL Query Parser",desc:"Parse URL parameters.",cat:"tools"},
{slug:"html-to-text",name:"HTML to Text",desc:"Strip HTML tags.",cat:"tools"},
{slug:"text-to-html",name:"Text to HTML",desc:"Convert text to simple HTML.",cat:"tools"},
{slug:"slug-generator",name:"Slug Generator",desc:"Generate SEO-friendly slugs.",cat:"tools"},
{slug:"meta-tag-generator",name:"Meta Tag Generator",desc:"Generate SEO meta tags.",cat:"tools"},
{slug:"utm-builder",name:"UTM Builder",desc:"Build campaign URLs.",cat:"tools"},
{slug:"url-shortener-helper",name:"URL Shortener Helper",desc:"Prepare URLs for shortening.",cat:"tools"},
{slug:"text-statistics",name:"Text Statistics",desc:"Analyze text statistics.",cat:"tools"},
{slug:"reading-time-calculator",name:"Reading Time Calculator",desc:"Estimate reading time.",cat:"tools"},
{slug:"password-strength-checker",name:"Password Strength Checker",desc:"Check password characteristics.",cat:"tools"},
{slug:"random-password-batch",name:"Random Password Batch Generator",desc:"Generate password batches.",cat:"tools"},
{slug:"color-palette-generator",name:"Color Palette Generator",desc:"Generate color palettes.",cat:"tools"},
{slug:"ascii-table",name:"ASCII Table",desc:"Explore ASCII codes.",cat:"tools"},
{slug:"binary-calculator",name:"Binary Calculator",desc:"Work with binary values.",cat:"tools"},
{slug:"octal-decimal-converter",name:"Octal Decimal Converter",desc:"Convert octal and decimal.",cat:"tools"}];


function toolGroup(t){
 const s=t.slug.toLowerCase();
 if(t.cat==='pdf'||s.includes('pdf'))return 'pdf';
 if(t.cat==='documents'||/word|excel|csv|office|document/.test(s))return 'documents';
 if(t.cat==='image'||/image|jpg|png|webp|svg/.test(s))return 'image';
 if(/password|hash|jwt|base64|encrypt|decrypt|security|validator|validate/.test(s))return 'security';
 if(/age|date|timestamp|time|timezone|days-between|leap-year|week-number/.test(s))return 'date-time';
 if(/percentage|discount|tip|ratio|average|fraction|square-root|power|salary|currency|hours|calculator/.test(s))return 'calculators';
 if(/cidr|ip-address|network|dns|port/.test(s))return 'network';
 if(/meta-tag|utm|slug|url-shortener|robots|sitemap|seo/.test(s))return 'web-seo';
 if(t.cat==='generators'||/generator/.test(s))return 'generators';
 if(t.cat==='converters'||/converter|to-json|to-csv|to-text|to-html|to-pdf|to-word|to-jpg|to-png|to-webp/.test(s))return 'converters';
 if(t.cat==='developer'||/json|xml|yaml|sql|regex|html|css|javascript|typescript|python|java|markdown|gitignore|cron|code|binary|ascii/.test(s))return 'developer';
 if(t.cat==='text'||/text|character|line|case|space|sort|duplicate|reading/.test(s))return 'text';
 return t.cat||'tools';
}
function card(t){const g=toolGroup(t);return '<a class="tool-card" data-group="'+g+'" href="/tools/'+t.slug+'.html"><h3>'+t.name+'</h3><p>'+t.desc+'</p><span class="tool-tag">'+g.toUpperCase()+' →</span></a>'}
function renderHome(list=tools){const el=document.getElementById('tool-grid');if(el)el.innerHTML=list.map(card).join('')}
function setupCategoryTabs(){
 document.querySelectorAll('.category-tab').forEach(tab=>tab.addEventListener('click',()=>{
   document.querySelectorAll('.category-tab').forEach(x=>x.classList.remove('active'));
   tab.classList.add('active');
   const cat=tab.dataset.cat;
   const search=document.getElementById('search');if(search)search.value='';
   renderHome(cat==='all'?tools:tools.filter(t=>toolGroup(t)===cat));
   document.getElementById('tools')?.scrollIntoView({behavior:'smooth',block:'start'});
 }));
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function setResult(v){const out=document.getElementById('result');if(!out)return;if(v instanceof Node){out.replaceChildren(v)}else out.innerHTML=String(v??'')}
function inputEl(){return document.getElementById('input')}
function getText(){return inputEl()?.value||''}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function showProgress(percent=0,label='Processando...'){
 let p=document.getElementById('progressBox');
 if(!p){p=document.createElement('div');p.id='progressBox';p.className='progress-box';p.innerHTML='<div class="progress-label"><span id="progressText"></span><strong id="progressPct">0%</strong></div><div class="progress-track"><div id="progressBar" class="progress-bar"></div></div>';const tool=document.getElementById('tool');const result=document.getElementById('result');tool.insertBefore(p,result)}
 const n=Math.max(0,Math.min(100,Math.round(percent)));p.style.display='block';document.getElementById('progressText').textContent=label;document.getElementById('progressPct').textContent=n+'%';document.getElementById('progressBar').style.width=n+'%'
}
function hideProgress(){const p=document.getElementById('progressBox');if(p)p.style.display='none'}
function addDownload(blob,name){const b=document.createElement('button');b.className='btn';b.textContent='Download';b.onclick=()=>downloadBlob(blob,name);const result=document.getElementById('result');result.appendChild(document.createTextNode(' '));result.appendChild(b);const exports=document.getElementById('export-actions');if(exports)exports.style.display='flex'}
function makeFileInput(multiple=false,accept=''){const input=document.createElement('input');input.type='file';input.multiple=multiple;if(accept)input.accept=accept;input.id='fileInput';input.className='real-file-input';const box=document.getElementById('tool');const old=document.getElementById('input');if(old)old.replaceWith(input);const visual=box?.querySelector('.upload-visual');const setFiles=files=>{if(!files?.length)return;try{const dt=new DataTransfer();[...files].slice(0,multiple?20:1).forEach(f=>dt.items.add(f));input.files=dt.files}catch(e){} if(visual){const h=visual.querySelector('h2');if(h)h.textContent=input.files.length+' file(s) selected';}};if(visual){visual.style.cursor='pointer';visual.addEventListener('click',()=>input.click());['dragenter','dragover'].forEach(ev=>visual.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();box.classList.add('drag-active')}));['dragleave','drop'].forEach(ev=>visual.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();box.classList.remove('drag-active')}));visual.addEventListener('drop',e=>setFiles(e.dataTransfer.files));}input.addEventListener('change',()=>{if(visual){const h=visual.querySelector('h2');if(h)h.textContent=input.files.length?input.files.length+' file(s) selected':'Choose files';}});return input}
function loadScript(src){return new Promise((resolve,reject)=>{if(document.querySelector('script[data-lib="'+src+'"]'))return resolve();const s=document.createElement('script');s.src=src;s.dataset.lib=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
async function pdfLib(){await loadScript('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js');return window.PDFLib}
async function pdfJs(){await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');if(!window.pdfjsLib)throw new Error('PDF text library unavailable');return window.pdfjsLib}
async function mammothLib(){await loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js');if(!window.mammoth)throw new Error('Word conversion library unavailable');return window.mammoth}
async function xlsxLib(){await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');if(!window.XLSX)throw new Error('Excel conversion library unavailable');return window.XLSX}
async function tesseractLib(){await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');if(!window.Tesseract)throw new Error('OCR library unavailable');return window.Tesseract}

function csvParse(text){const rows=[];let row=[],cell='',q=false;for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&q&&n==='"'){cell+='"';i++;continue}if(c==='"'){q=!q;continue}if(c===','&&!q){row.push(cell);cell='';continue}if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&n==='\n')i++;row.push(cell);cell='';if(row.some(x=>x!=='')||rows.length)rows.push(row);row=[];continue}cell+=c}row.push(cell);if(row.some(x=>x!==''))rows.push(row);return rows}
function csvEscape(v){v=String(v??'');return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function jsonToRows(obj){if(!Array.isArray(obj))obj=[obj];const keys=[...new Set(obj.flatMap(o=>Object.keys(o||{})))];return [keys,...obj.map(o=>keys.map(k=>o?.[k]??''))]}
function simpleFormat(code,indent='  '){return code.replace(/>\s*</g,'>\n<').split('\n').map((x,i)=>indent.repeat(Math.max(0,(x.match(/<[^/!?][^>]*>/g)||[]).length-(x.match(/<\/[^>]+>/g)||[]).length))).join('\n')}
function textToHtml(md){return esc(md).split(/\n{2,}/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('\n')}
function safeJson(v){try{return JSON.parse(v)}catch(e){throw new Error('Invalid JSON: '+e.message)}}
function parseNums(s){return s.split(/[\s,;]+/).filter(Boolean).map(Number).filter(Number.isFinite)}
function randomPassword(len=20){const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';const a=new Uint32Array(len);crypto.getRandomValues(a);return [...a].map(n=>chars[n%chars.length]).join('')}

function exportWord(){
 const result=document.getElementById('result'); if(!result) return;
 const text=result.innerText||result.textContent||'';
 if(!text.trim()) return alert('Run the tool first.');
 const title=document.querySelector('h1')?.innerText||'GlobalTools';
 const html='<!doctype html><html><head><meta charset="utf-8"><title>'+esc(title)+'</title></head><body><h1>'+esc(title)+'</h1><pre style="white-space:pre-wrap;font-family:Arial">'+esc(text)+'</pre></body></html>';
 const blob=new Blob([html],{type:'application/msword'});
 downloadBlob(blob,title.replace(/[^a-z0-9]+/gi,'-').toLowerCase()+'.doc');
}
function exportPdf(){
 const result=document.getElementById('result'); if(!result) return;
 const text=result.innerText||result.textContent||'';
 if(!text.trim()) return alert('Run the tool first.');
 const title=document.querySelector('h1')?.innerText||'GlobalTools';
 const w=window.open('','_blank');
 if(!w) return alert('Allow pop-ups to export PDF.');
 w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>'+esc(title)+'</title><style>body{font-family:Arial,sans-serif;padding:40px;white-space:pre-wrap}h1{margin-bottom:24px}</style></head><body><h1>'+esc(title)+'</h1>'+esc(text).replace(/\n/g,'<br>')+'</body></html>');
 w.document.close(); w.focus(); setTimeout(()=>w.print(),300);
}
function addExportButtons(){
 const box=document.getElementById('tool');
 if(!box||document.getElementById('export-actions')||document.getElementById('fileInput'))return;
 const actions=document.createElement('div'); actions.id='export-actions'; actions.className='export-actions';
 actions.innerHTML='<button type="button" class="btn secondary" id="exportPdf">Download PDF</button><button type="button" class="btn secondary" id="exportWord">Download Word</button>';
 box.appendChild(actions);
 document.getElementById('exportPdf').onclick=exportPdf;
 document.getElementById('exportWord').onclick=exportWord;
}

function setupTool(slug){
 const box=document.getElementById('tool');if(!box)return;
 let input=document.getElementById('input'), action=document.getElementById('action'), out=document.getElementById('result');
 if(!input){input=document.createElement('textarea');input.id='input';box.prepend(input)}
 if(!action){action=document.createElement('button');action.id='action';action.className='btn';action.textContent='Run Tool';box.appendChild(action)}
 if(!out){out=document.createElement('div');out.id='result';out.className='result';box.appendChild(out)}
 const run=async fn=>{try{const value=await fn();if(value!==undefined&&value!==null)setResult(value)}catch(e){hideProgress();setResult('<div class="tool-error"><b>Erro:</b> '+esc(e.message||e)+'</div>')}};
 const textTools={
 'word-counter':()=>{const v=getText(),words=v.trim()?v.trim().split(/\s+/).length:0,chars=v.length,no=v.replace(/\s/g,'').length,sent=v.trim()?v.split(/[.!?]+/).filter(x=>x.trim()).length:0,para=v.trim()?v.split(/\n\s*\n/).filter(x=>x.trim()).length:0;return 'Words: '+words+'<br>Characters: '+chars+'<br>Characters without spaces: '+no+'<br>Sentences: '+sent+'<br>Paragraphs: '+para},
 'character-counter':()=>{const v=getText();return 'Characters: '+v.length+'<br>Without spaces: '+v.replace(/\s/g,'').length},
 'case-converter':()=>{const v=getText();return '<b>UPPERCASE</b><br>'+esc(v.toUpperCase())+'<br><br><b>lowercase</b><br>'+esc(v.toLowerCase())+'<br><br><b>Title Case</b><br>'+esc(v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()))+'<br><br><b>Sentence case</b><br>'+esc(v.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,c=>c.toUpperCase()))},
 'remove-duplicate-lines':()=>[...new Set(getText().split(/\r?\n/))].join('\n'),
 'reverse-text':()=>getText().split('').reverse().join(''),
 'sort-lines':()=>getText().split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join('\n'),
 'remove-extra-spaces':()=>getText().replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim(),
 'count-lines':()=>String(getText()?getText().split(/\r?\n/).length:0),
 'text-statistics':()=>{const v=getText(),words=v.trim()?v.trim().split(/\s+/).length:0;return 'Words: '+words+'<br>Characters: '+v.length+'<br>Lines: '+(v?v.split(/\r?\n/).length:0)+'<br>Letters: '+(v.match(/[A-Za-zÀ-ÿ]/g)||[]).length+'<br>Digits: '+(v.match(/\d/g)||[]).length},
 'reading-time-calculator':()=>{const w=getText().trim()?getText().trim().split(/\s+/).length:0;return w+' words<br>Estimated reading time: '+Math.max(1,Math.ceil(w/200))+' minute(s)'},
 'text-to-slug':()=>getText().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''),
 'slug-generator':()=>getText().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''),
 'html-escape':()=>esc(getText()),
 'html-unescape':()=>{const d=document.createElement('textarea');d.innerHTML=getText();return esc(d.value)},
 'html-to-text':()=>{const d=document.createElement('div');d.innerHTML=getText();return esc(d.textContent||'')},
 'text-to-html':()=>esc(getText()).split(/\n{2,}/).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('\n')
 };
 const dev={
 'json-formatter':()=>JSON.stringify(safeJson(getText()),null,2),
 'json-minifier':()=>JSON.stringify(safeJson(getText())),
 'csv-to-json':()=>{const r=csvParse(getText());if(!r.length)return '[]';const h=r[0];return JSON.stringify(r.slice(1).map(x=>Object.fromEntries(h.map((k,i)=>[k,x[i]??'']))),null,2)},
 'json-to-csv':()=>{const r=jsonToRows(safeJson(getText()));return r.map(x=>x.map(csvEscape).join(',')).join('\n')},
 'csv-viewer':()=>{const r=csvParse(getText());return '<table class="data-table"><tbody>'+r.map(row=>'<tr>'+row.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>'},
 'json-to-typescript':()=>{const o=safeJson(getText()),rows=jsonToRows(o),keys=rows[0];return 'interface Root {\\n'+keys.map(k=>'  '+k+': '+(typeof (Array.isArray(o)?o[0]?.[k]:o?.[k])==='number'?'number':typeof (Array.isArray(o)?o[0]?.[k]:o?.[k])==='boolean'?'boolean':'string')+';').join('\\n')+'\\n}'},
 'json-to-python':()=>{const o=safeJson(getText());return 'data = '+JSON.stringify(o,null,2).replace(/true/g,'True').replace(/false/g,'False').replace(/null/g,'None')},
 'json-to-java':()=>{const o=safeJson(getText());return 'Map<String, Object> data = new ObjectMapper().readValue(json, new TypeReference<Map<String,Object>>(){});\\n// Keys: '+Object.keys(Array.isArray(o)?o[0]||{}:o).join(', ')},
 'base64-encoder':()=>btoa(unescape(encodeURIComponent(getText()))),
 'base64-decoder':()=>decodeURIComponent(escape(atob(getText().trim()))),
 'url-encoder':()=>encodeURIComponent(getText()),
 'url-decoder':()=>decodeURIComponent(getText()),
 'url-parser':()=>{const u=new URL(getText());return Object.entries({href:u.href,protocol:u.protocol,host:u.host,path:u.pathname,query:u.search,hash:u.hash}).map(([k,v])=>k+': '+v).join('\n')},
 'url-query-parser':()=>{const u=new URL(getText());return [...u.searchParams.entries()].map(([k,v])=>k+' = '+v).join('\n')||'No query parameters.'},
 'email-validator':()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getText().trim())?'Valid email format.':'Invalid email format.',
 'ip-address-info':()=>{const v=getText().trim();const ipv4=/^(?:\d{1,3}\.){3}\d{1,3}$/.test(v);const ipv6=v.includes(':');return (ipv4?'IPv4-like address':ipv6?'IPv6-like address':'Invalid/unknown IP format')},
 'jwt-decoder':()=>{const p=getText().split('.');if(p.length<2)throw new Error('Enter a JWT.');const dec=s=>JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));return 'Header:\\n'+JSON.stringify(dec(p[0]),null,2)+'\\n\\nPayload:\\n'+JSON.stringify(dec(p[1]),null,2)},
 'regex-tester':()=>{const [pattern,flags,...rest]=getText().split(/\n/),sample=rest.join('\n');if(!pattern)throw new Error('First line: regex pattern. Second line: flags. Remaining lines: sample text.');const re=new RegExp(pattern,flags||'');return JSON.stringify([...sample.matchAll(new RegExp(re.source,re.flags.includes('g')?re.flags:re.flags+'g'))].map(m=>m[0]),null,2)},
 'html-formatter':()=>simpleFormat(getText()),
 'xml-formatter':()=>simpleFormat(getText()),
 'css-formatter':()=>getText().replace(/\s*{\s*/g,' {\\n  ').replace(/;\s*/g,';\\n  ').replace(/\s*}\s*/g,'\\n}\\n').trim(),
 'javascript-formatter':()=>getText().replace(/\s*{\s*/g,' {\\n  ').replace(/;\s*/g,';\\n').replace(/\s*}\s*/g,'\\n}\\n').trim(),
 'sql-formatter':()=>getText().replace(/\s+(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN)\s+/gi,'\n$1 ').replace(/\s+(AND|OR)\s+/gi,'\n  $1 ').trim(),
 'yaml-formatter':()=>getText().split(/\r?\n/).map(x=>x.trimEnd()).join('\n'),
 'markdown-to-html':()=>textToHtml(getText()),
 'html-formatter':()=>simpleFormat(getText()),
 'hex-to-rgb':()=>{let h=getText().trim().replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');if(!/^[0-9a-f]{6}$/i.test(h))throw new Error('Invalid HEX');return 'rgb('+parseInt(h.slice(0,2),16)+', '+parseInt(h.slice(2,4),16)+', '+parseInt(h.slice(4),16)+')'},
 'rgb-to-hex':()=>{const n=parseNums(getText());if(n.length<3||n.slice(0,3).some(x=>x<0||x>255))throw new Error('Enter R G B values, e.g. 99 91 255');return '#'+n.slice(0,3).map(x=>Math.round(x).toString(16).padStart(2,'0')).join('').toUpperCase()},
 'binary-to-text':()=>getText().trim().split(/\s+/).map(x=>String.fromCharCode(parseInt(x,2))).join(''),
 'text-to-binary':()=>[...getText()].map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '),
 'number-base-converter':()=>{const [n,b]=getText().trim().split(/\s+/);const x=parseInt(n,Number(b||10));if(!Number.isFinite(x))throw new Error('Use: number [base], e.g. FF 16');return 'Binary: '+x.toString(2)+'\\nDecimal: '+x+'\\nHex: '+x.toString(16).toUpperCase()},
 'binary-calculator':()=>{const [a,op,b]=getText().trim().split(/\s+/);const x=parseInt(a,2),y=parseInt(b,2);if(!Number.isFinite(x)||!Number.isFinite(y))throw new Error('Use: 1010 + 0011');const z=op==='-'?x-y:op==='*'?x*y:op==='/'?x/y:x+y;return 'Decimal: '+z+'\\nBinary: '+Math.trunc(z).toString(2)},
 'octal-decimal-converter':()=>{const n=getText().trim();return 'Octal: '+parseInt(n,10).toString(8)+'\\nDecimal: '+parseInt(n,8)},
 'ascii-table':()=>Array.from({length:128},(_,i)=>i+' = '+(i<32?'Control':String.fromCharCode(i))).join('\n'),
 'url-shortener-helper':()=>getText().trim(),
 'meta-tag-generator':()=>{const [title='',description='',url='']=getText().split(/\n/);return '<title>'+esc(title)+'</title>\\n<meta name="description" content="'+esc(description)+'">\\n<link rel="canonical" href="'+esc(url)+'">'},
 'utm-builder':()=>{const [url,source,medium,campaign,term,content]=getText().split(/\n/);const u=new URL(url);[['utm_source',source],['utm_medium',medium],['utm_campaign',campaign],['utm_term',term],['utm_content',content]].forEach(([k,v])=>v&&u.searchParams.set(k,v));return u.href}
 };
 const calc={
 'percentage-calculator':()=>{const m=getText().match(/([\d.,]+)\s*%\s*(?:of|de)\s*([\d.,]+)/i);if(!m)throw new Error('Use: 15% of 200');return (parseFloat(m[1].replace(',','.'))/100*parseFloat(m[2].replace(',','.')))},
 'discount-calculator':()=>{const [price,pct]=parseNums(getText());return 'Discount: '+(price*pct/100).toFixed(2)+'\\nFinal price: '+(price*(1-pct/100)).toFixed(2)},
 'tip-calculator':()=>{const [bill,pct=10,people=1]=parseNums(getText());const tip=bill*pct/100;return 'Tip: '+tip.toFixed(2)+'\\nTotal: '+(bill+tip).toFixed(2)+'\\nPer person: '+((bill+tip)/people).toFixed(2)},
 'ratio-calculator':()=>{const [a,b,c]=parseNums(getText());if(c===undefined)return 'Simplified ratio: '+a/gcd(a,b)+':'+b/gcd(a,b);return 'Fourth value: '+(b*c/a)},
 'average-calculator':()=>{const n=parseNums(getText());return n.reduce((a,b)=>a+b,0)/n.length},
 'square-root-calculator':()=>Math.sqrt(Number(getText())),
 'power-calculator':()=>{const [a,b]=parseNums(getText());return Math.pow(a,b)},
 'fraction-calculator':()=>{const [a,b,op,c,d]=getText().trim().split(/\s+/);const A=Number(a)/Number(b),B=Number(c)/Number(d);const z=op==='-'?A-B:op==='*'?A*B:op==='/'?A/B:A+B;return z},
 'days-between-dates':()=>{const [a,b]=getText().trim().split(/\s+/);return Math.round(Math.abs(new Date(b)-new Date(a))/86400000)+' days'},
 'date-add-subtract':()=>{const [d,n]=getText().trim().split(/\s+/);const x=new Date(d);x.setDate(x.getDate()+Number(n));return x.toISOString().slice(0,10)},
 'leap-year-checker':()=>{const y=Number(getText());return ((y%4===0&&y%100!==0)||y%400===0)?y+' is a leap year.':y+' is not a leap year.'},
 'week-number':()=>{const d=new Date(getText());if(isNaN(d))throw new Error('Enter a valid date.');const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return 'ISO week: '+Math.ceil((((t-y)/86400000)+1)/7)},
 'time-duration':()=>{const [a,b]=getText().trim().split(/\s+/).map(x=>new Date('1970-01-01T'+x));return Math.abs(b-a)/60000+' minutes'},
 'age-calculator':()=>{const d=new Date(getText()),n=new Date();let age=n.getFullYear()-d.getFullYear();if(n.getMonth()<d.getMonth()||(n.getMonth()===d.getMonth()&&n.getDate()<d.getDate()))age--;return 'Age: '+age+' years'},
 'timestamp-to-date':()=>new Date(Number(getText())*1000).toString(),
 'unix-timestamp':()=>new Date(Number(getText())*1000).toString(),
 'date-to-timestamp':()=>Math.floor(new Date(getText()).getTime()/1000),
 'timezone-converter':()=>{const [date,from,to]=getText().trim().split(/\s+/);return new Intl.DateTimeFormat('en-US',{timeZone:to||'UTC',dateStyle:'full',timeStyle:'long'}).format(new Date(date))},
 'random-number-generator':()=>{const [min=1,max=100]=parseNums(getText());return String(Math.floor(Math.random()*(max-min+1))+min)},
 'random-choice-picker':()=>{const a=getText().split(/\r?\n/).filter(Boolean);return a[Math.floor(Math.random()*a.length)]||''},
 'dice-roller':()=>{const [sides=6,count=1]=parseNums(getText());return Array.from({length:count},()=>Math.floor(Math.random()*sides)+1).join(', ')},
 'color-palette-generator':()=>Array.from({length:5},()=>'#'+crypto.getRandomValues(new Uint8Array(3)).reduce((s,n)=>s+n.toString(16).padStart(2,'0'),'')).join('\n')
 };
 function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}
 const fileHandlers=['jpg-to-pdf','pdf-to-jpg','pdf-to-png','delete-pdf-pages','extract-pdf-pages','crop-pdf','watermark-pdf','number-pdf-pages','organize-pdf','word-to-pdf','pdf-to-word','word-to-text','word-to-html','excel-to-csv','excel-to-json','csv-to-excel','excel-to-pdf','html-to-pdf','image-info','image-to-data-url','image-to-base64','image-color-picker','image-cropper','image-resizer','image-compressor','jpg-to-png','png-to-jpg','webp-to-jpg','jpg-to-webp','png-to-webp','webp-to-png','image-dimensions','svg-to-data-url','pdf-page-counter','pdf-metadata','pdf-to-text','merge-pdf','merge-files','split-pdf','rotate-pdf','compress-pdf','compress-file','edit-pdf'];
 const uploadVisual=box.querySelector('.file-upload-visual'); if(uploadVisual){uploadVisual.style.setProperty('display',fileHandlers.includes(slug)?'block':'none','important'); if(!fileHandlers.includes(slug))uploadVisual.replaceChildren();}
 if(fileHandlers.includes(slug)){
   const accept=slug.startsWith('pdf')||slug.includes('pdf')?'application/pdf':slug.startsWith('word-')||slug==='word-to-pdf'?'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document':slug.startsWith('excel-')||slug==='csv-to-excel'?'.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv':slug==='html-to-pdf'?'.html,text/html':slug.includes('svg')?'.svg,image/svg+xml':'image/*';
   const fi=makeFileInput(['merge-pdf','merge-files'].includes(slug),slug==='compress-file'?'application/pdf,image/*':accept);
   action.textContent=slug==='merge-pdf'||slug==='merge-files'?'Juntar Arquivos':slug==='edit-pdf'?'Editar PDF':slug==='compress-file'?'Comprimir Arquivo':slug==='split-pdf'?'Split PDF':slug==='rotate-pdf'?'Rotate PDF':slug==='pdf-to-text'?'Extract Text':slug==='pdf-page-counter'?'Count Pages':'Process File';
   action.onclick=()=>{if(!fi.files.length){fi.click();return} return run(async()=>{
     const files=[...fi.files];if(!files.length)throw new Error('Choose a file first.');
     if(['word-to-pdf','pdf-to-word','word-to-text','word-to-html'].includes(slug)){
       const f=files[0];
       if(slug==='pdf-to-word'){
         showProgress(2,'Lendo o PDF...');
         const pdfjs=await pdfJs();
         showProgress(8,'Carregando PDF...');
         const loadingTask=pdfjs.getDocument({data:new Uint8Array(await f.arrayBuffer())});
         loadingTask.onProgress=p=>{if(p.total)showProgress(8+(p.loaded/p.total)*12,'Carregando PDF...')};
         const pdf=await loadingTask.promise;let text='';
         const total=pdf.numPages;
         let ocrWorker=null,usedOcr=false;
         for(let i=1;i<=total;i++){
           const page=await pdf.getPage(i),tc=await page.getTextContent();
           let pageText=tc.items.map(x=>x.str).join(' ').trim();
           if(!pageText){
             if(!ocrWorker){
               showProgress(18,'Preparando OCR em português...');
               const Tesseract=await tesseractLib();
               ocrWorker=await Tesseract.createWorker('por',1,{logger:m=>{
                 if(m&&typeof m.progress==='number')showProgress(18+((i-1)/total)*72+m.progress*(72/total),'OCR página '+i+' de '+total+'...');
               }});
             }
             const viewport=page.getViewport({scale:2});
             const canvas=document.createElement('canvas');
             canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
             await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
             const ret=await ocrWorker.recognize(canvas);
             pageText=(ret.data.text||'').trim();
             usedOcr=true;
           }
           text+=(i>1?'\n\n':'')+pageText;
           showProgress(20+(i/total)*70,(usedOcr?'Processando página ':'Extraindo página ')+i+' de '+total+'...');
         }
         if(ocrWorker)await ocrWorker.terminate();
         if(!text.trim())throw new Error('Não foi possível extrair texto deste PDF, mesmo usando OCR.');
         showProgress(95,usedOcr?'Gerando Word a partir do OCR...':'Gerando documento Word...');
         if(!window.JSZip)await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
         const escXml=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
         const paragraphs=text.split(/\n\s*\n/).filter(p=>p.trim()).map(p=>{
           const runs=escXml(p.trim()).split(/\n/).map((line,idx)=>(idx?'<w:br/>':'')+'<w:r><w:t xml:space="preserve">'+line+'</w:t></w:r>').join('');
           return '<w:p>'+runs+'</w:p>';
         }).join('');
         const docx=new window.JSZip();
         docx.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
         docx.folder('_rels').file('.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
         docx.file('word/document.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraphs+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>');
         if(!text.trim())throw new Error('Não foi possível extrair texto deste PDF. Este arquivo pode ser escaneado/imagem e precisa de OCR.');
         const blob=await docx.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
         showProgress(100,'Conversão concluída!');
         setResult('Documento Word (.docx) criado com sucesso. Clique em Download.');
         addDownload(blob,'converted.docx');return;
       }
       const m=await mammothLib(),r=await m.convertToHtml({arrayBuffer:await f.arrayBuffer()});
       if(slug==='word-to-text')return esc(r.value.replace(/<[^>]+>/g,' ').replace(/\\s+/g,' ').trim());
       if(slug==='word-to-html')return r.value;
       if(slug==='word-to-pdf'){
         const {PDFDocument,StandardFonts,rgb}=await pdfLib(),doc=await PDFDocument.create(),font=await doc.embedFont(StandardFonts.Helvetica);const plain=r.value.replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\\s+/g,' ').trim();let page=doc.addPage([595,842]),y=800;
         for(const line of plain.match(/.{1,90}(?:\\s|$)/g)||[plain]){if(y<50){page=doc.addPage([595,842]);y=800}page.drawText(line.trim(),{x:40,y,size:11,font,color:rgb(0.1,0.1,0.1)});y-=18}
         const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('PDF created successfully.');addDownload(blob,'converted.pdf');return;
       }
     }
     if(['excel-to-csv','excel-to-json','csv-to-excel','excel-to-pdf'].includes(slug)){
       const XLSX=await xlsxLib(),f=files[0];
       if(slug==='csv-to-excel'){
         const wb=XLSX.read(await f.text(),{type:'string'}),blob=new Blob([XLSX.write(wb,{bookType:'xlsx',type:'array'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});setResult('Excel workbook created.');addDownload(blob,'converted.xlsx');return;
       }
       const wb=XLSX.read(await f.arrayBuffer(),{type:'array'}),ws=wb.Sheets[wb.SheetNames[0]];
       if(slug==='excel-to-csv')return esc(XLSX.utils.sheet_to_csv(ws));
       if(slug==='excel-to-json')return esc(JSON.stringify(XLSX.utils.sheet_to_json(ws,{defval:''}),null,2));
       if(slug==='excel-to-pdf'){
         const html=XLSX.utils.sheet_to_html(ws);const w=window.open('','_blank');if(!w)throw new Error('Allow pop-ups to create the PDF.');w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Excel to PDF</title><style>body{font-family:Arial;padding:25px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #bbb;padding:6px}</style></head><body>'+html+'</body></html>');w.document.close();w.focus();setTimeout(()=>w.print(),500);return;
       }
     }
     if(slug==='html-to-pdf'){
       const f=files[0],html=await f.text(),w=window.open('','_blank');if(!w)throw new Error('Allow pop-ups to create the PDF.');w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),500);return;
     }
     if(['jpg-to-pdf'].includes(slug)){
       const {PDFDocument}=await pdfLib(),doc=await PDFDocument.create();
       for(const f of files){const im=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=URL.createObjectURL(f)});const canvas=document.createElement('canvas');canvas.width=im.width;canvas.height=im.height;canvas.getContext('2d').drawImage(im,0,0);const jpg=await new Promise(r=>canvas.toBlob(r,'image/jpeg',.92));const bytes=await jpg.arrayBuffer();const emb=f.type==='image/png'?await doc.embedPng(bytes):await doc.embedJpg(bytes);const page=doc.addPage([emb.width,emb.height]);page.drawImage(emb,{x:0,y:0,width:emb.width,height:emb.height});}
       const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('PDF created from '+files.length+' image(s).');addDownload(blob,'images.pdf');return;
     }
     if(slug==='merge-pdf'||slug==='split-pdf'||slug==='rotate-pdf'||slug==='compress-pdf'||slug==='pdf-page-counter'||slug==='pdf-metadata'){const {PDFDocument}=await pdfLib();const bytes=await files[0].arrayBuffer();const doc=await PDFDocument.load(bytes);if(slug==='pdf-page-counter')return 'Pages: '+doc.getPageCount();if(slug==='pdf-metadata')return 'Pages: '+doc.getPageCount()+'\\nTitle: '+(doc.getTitle()||'')+'\\nAuthor: '+(doc.getAuthor()||'');if(slug==='merge-files'){if(files.length<2)throw new Error('Selecione pelo menos 2 arquivos PDF.');const out=await PDFDocument.create();for(const f of files){const src=await PDFDocument.load(await f.arrayBuffer());const pages=await out.copyPages(src,src.getPageIndices());pages.forEach(p=>out.addPage(p))}const blob=new Blob([await out.save()],{type:'application/pdf'});setResult('Arquivos juntados com sucesso.');addDownload(blob,'arquivos-juntados.pdf');return}
if(slug==='edit-pdf'){const {PDFDocument,rgb}=await pdfLib(),doc=await PDFDocument.load(await files[0].arrayBuffer());const text=getText().trim()||'Texto inserido pelo GlobalTools';doc.getPages().forEach(p=>p.drawText(text,{x:40,y:40,size:16,color:rgb(0,0,0)}));const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('PDF editado com sucesso.');addDownload(blob,'pdf-editado.pdf');return}
if(slug==='compress-file'){
 const f=files[0];if(!f)throw new Error('Selecione um arquivo.');
 const name=(f.name||'').toLowerCase(),type=(f.type||'').toLowerCase();
 const head=new Uint8Array(await f.slice(0,8).arrayBuffer());
 const isPdf=type==='application/pdf'||name.endsWith('.pdf')||(head[0]===37&&head[1]===80&&head[2]===68&&head[3]===70);
 if(isPdf){
   const {PDFDocument}=await pdfLib();
   const doc=await PDFDocument.load(await f.arrayBuffer(),{ignoreEncryption:true});
   const blob=new Blob([await doc.save({useObjectStreams:true,addDefaultPage:false})],{type:'application/pdf'});
   setResult('PDF processado e otimizado com sucesso.');
   addDownload(blob,'arquivo-comprimido.pdf');return
 }
 const isImage=type.startsWith('image/')||/\.(jpg|jpeg|png|webp)$/i.test(name);
 if(isImage){
   const bmp=await createImageBitmap(f);
   const max=2400,scale=Math.min(1,max/Math.max(bmp.width,bmp.height));
   const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bmp.width*scale));canvas.height=Math.max(1,Math.round(bmp.height*scale));
   canvas.getContext('2d').drawImage(bmp,0,0,canvas.width,canvas.height);
   const blob=await new Promise(r=>canvas.toBlob(r,'image/jpeg',.72));
   if(!blob)throw new Error('Não foi possível gerar a imagem comprimida.');
   setResult('Imagem comprimida com sucesso.');addDownload(blob,'imagem-comprimida.jpg');return
 }
 throw new Error('Formato não suportado. Use PDF, JPG, JPEG, PNG ou WebP.')}
if(slug==='merge-pdf'){const out=await PDFDocument.create();for(const f of files){const src=await PDFDocument.load(await f.arrayBuffer());const pages=await out.copyPages(src,src.getPageIndices());pages.forEach(p=>out.addPage(p))}const blob=new Blob([await out.save()],{type:'application/pdf'});setResult('Merged '+files.length+' PDF file(s).');addDownload(blob,'merged.pdf');return}if(slug==='split-pdf'){if(!window.JSZip)await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');const zip=new window.JSZip();for(let i=0;i<doc.getPageCount();i++){const out=await PDFDocument.create();const [p]=await out.copyPages(doc,[i]);out.addPage(p);zip.file('page-'+(i+1)+'.pdf',await out.save())}const finalBlob=await zip.generateAsync({type:'blob'});setResult('Created '+doc.getPageCount()+' individual PDF pages in a ZIP.');addDownload(finalBlob,'split-pdf.zip');return}if(slug==='rotate-pdf'){const {degrees}=PDFLib;doc.getPages().forEach(p=>p.setRotation(degrees(90)));const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('Rotated all pages by 90°.');addDownload(blob,'rotated.pdf');return}if(slug==='compress-pdf'){const blob=new Blob([await doc.save({useObjectStreams:true})],{type:'application/pdf'});setResult('Re-saved PDF with object streams. File size may vary.');addDownload(blob,'compressed.pdf');return}}
     if(['pdf-to-jpg','pdf-to-png','delete-pdf-pages','extract-pdf-pages','crop-pdf','watermark-pdf','number-pdf-pages','organize-pdf'].includes(slug)){
       if(slug==='pdf-to-jpg'||slug==='pdf-to-png'){
         const pdfjs=await pdfJs(),pdf=await pdfjs.getDocument({data:new Uint8Array(await files[0].arrayBuffer())}).promise;
         if(!window.JSZip) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
         const archive=new window.JSZip();
         for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i),vp=page.getViewport({scale:1.5}),canvas=document.createElement('canvas');canvas.width=vp.width;canvas.height=vp.height;await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;const blob=await new Promise(res=>canvas.toBlob(res,slug==='pdf-to-jpg'?'image/jpeg':'image/png',.92));archive.file('page-'+i+'.'+(slug==='pdf-to-jpg'?'jpg':'png'),await blob.arrayBuffer())}
         const finalBlob=await archive.generateAsync({type:'blob'});setResult('Converted '+pdf.numPages+' page(s) to '+(slug==='pdf-to-jpg'?'JPG':'PNG')+'.');addDownload(finalBlob,'pdf-images.zip');return;
       }
       const {PDFDocument, rgb, degrees}=await pdfLib(),doc=await PDFDocument.load(await files[0].arrayBuffer());
       const nums=(getText().match(/\d+/g)||[]).map(Number);
       if(slug==='delete-pdf-pages'){const remove=new Set(nums.map(n=>n-1));const out=await PDFDocument.create();const pages=await out.copyPages(doc,doc.getPageIndices().filter(i=>!remove.has(i)));pages.forEach(p=>out.addPage(p));const blob=new Blob([await out.save()],{type:'application/pdf'});setResult('Selected pages removed.');addDownload(blob,'pages-removed.pdf');return}
       if(slug==='extract-pdf-pages'){const out=await PDFDocument.create(),ids=(nums.length?nums.map(n=>n-1):[0]).filter(i=>i>=0&&i<doc.getPageCount());const pages=await out.copyPages(doc,ids);pages.forEach(p=>out.addPage(p));const blob=new Blob([await out.save()],{type:'application/pdf'});setResult('Selected pages extracted.');addDownload(blob,'extracted-pages.pdf');return}
       if(slug==='organize-pdf'){const order=nums.length?nums.map(n=>n-1):doc.getPageIndices();const out=await PDFDocument.create(),pages=await out.copyPages(doc,order.filter(i=>i>=0&&i<doc.getPageCount()));pages.forEach(p=>out.addPage(p));const blob=new Blob([await out.save()],{type:'application/pdf'});setResult('PDF reordered.');addDownload(blob,'organized.pdf');return}
       if(slug==='crop-pdf'){doc.getPages().forEach(p=>{const w=p.getWidth(),h=p.getHeight();p.setCropBox(w*.05,h*.05,w*.9,h*.9)});const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('Pages cropped by 5% margins.');addDownload(blob,'cropped.pdf');return}
       if(slug==='watermark-pdf'){const text=getText().split(/\n/)[0]||'GlobalTools';doc.getPages().forEach(p=>p.drawText(text,{x:p.getWidth()/2-80,y:p.getHeight()/2,size:28,color:rgb(.65,.65,.65),rotate:degrees(35),opacity:.35}));const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('Watermark added.');addDownload(blob,'watermarked.pdf');return}
       if(slug==='number-pdf-pages'){doc.getPages().forEach((p,i)=>p.drawText(String(i+1),{x:p.getWidth()/2-8,y:20,size:10,color:rgb(.25,.25,.25)}));const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('Page numbers added.');addDownload(blob,'numbered.pdf');return}
     }
     const f=files[0];
     if(slug==='pdf-to-text'){const pdfjs=await pdfJs();const pdf=await pdfjs.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise;let text='';for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const tc=await page.getTextContent();text+='\n--- Page '+i+' ---\n'+tc.items.map(x=>x.str).join(' ')}return esc(text.trim())}
     if(slug==='base64-to-file'){const data=getText().trim();const m=data.match(/^data:([^;]+);base64,(.+)$/);if(!m)throw new Error('Paste a complete data URL in the text field.');const bin=atob(m[2]);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const blob=new Blob([u],{type:m[1]});setResult('File decoded.');addDownload(blob,'decoded-file');return}
     if(slug==='image-info'||slug==='image-dimensions'){const im=new Image();im.src=URL.createObjectURL(f);await im.decode();return 'File: '+esc(f.name)+'<br>Type: '+esc(f.type)+'<br>Size: '+(f.size/1024).toFixed(1)+' KB<br>Dimensions: '+im.width+' × '+im.height}
     if(slug==='image-to-data-url'||slug==='image-to-base64'){const data=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)});return '<textarea style="min-height:220px">'+esc(data)+'</textarea>'}
     if(slug==='svg-to-data-url'){const txt=await f.text();return '<textarea style="min-height:180px">'+esc('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(txt))+'</textarea>'}
     const im=new Image();im.src=URL.createObjectURL(f);await im.decode();const canvas=document.createElement('canvas');canvas.width=im.width;canvas.height=im.height;const ctx=canvas.getContext('2d');ctx.drawImage(im,0,0);
     if(slug==='image-color-picker'){const d=ctx.getImageData(0,0,1,1).data;return 'Top-left pixel: rgb('+d[0]+', '+d[1]+', '+d[2]+')'}
     if(slug==='image-cropper'){const w=Math.floor(im.width*.8),h=Math.floor(im.height*.8),x=Math.floor((im.width-w)/2),y=Math.floor((im.height-h)/2);const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,x,y,w,h,0,0,w,h);const blob=await new Promise(r=>c.toBlob(r,f.type||'image/png'));setResult('Cropped center 80% of the image.');addDownload(blob,'cropped.png');return}
     const [rw,rh]=parseNums(document.getElementById('resizeWidth')?.value+' '+document.getElementById('resizeHeight')?.value);
     if(slug==='image-resizer'||slug==='image-compressor'||slug.includes('to-')){let w=im.width,h=im.height;if(slug==='image-resizer'&&rw){h=rh||Math.round(im.height*rw/im.width);w=rw}if(slug==='image-compressor'){w=Math.round(w*.8);h=Math.round(h*.8)}const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);const type=slug.includes('jpg')?'image/jpeg':slug.includes('webp')?'image/webp':'image/png';const blob=await new Promise(r=>c.toBlob(r,type,.85));setResult('Output: '+w+' × '+h);addDownload(blob,'converted.'+(type==='image/jpeg'?'jpg':type.split('/')[1]));return}
   })};
   if(slug==='image-resizer'){const controls=document.createElement('div');controls.innerHTML='<label>Width</label><input id="resizeWidth" type="number" placeholder="800"><label>Height (optional)</label><input id="resizeHeight" type="number" placeholder="Auto">';box.insertBefore(controls,action)}
   return;
 }
 let handler=textTools[slug]||dev[slug]||calc[slug];
 if(slug==='uuid-generator'){handler=()=>crypto.randomUUID()}
 if(slug==='password-generator'){handler=()=>randomPassword(20)}
 if(slug==='random-password-batch'){handler=()=>Array.from({length:10},()=>randomPassword(20)).join('\n')}
 if(slug==='url-shortener-helper'){handler=async()=>{const u=getText().trim();if(!/^https?:\/\//i.test(u))throw new Error('Enter a complete URL starting with http:// or https://');const r=await fetch('https://is.gd/create.php?format=simple&url='+encodeURIComponent(u));if(!r.ok)throw new Error('Shortener service unavailable.');return esc((await r.text()).trim())}}
 if(slug==='password-strength-checker'){handler=()=>{const v=getText(),score=(v.length>=12)+(v.length>=16)+(/[a-z]/.test(v))+( /[A-Z]/.test(v))+( /\d/.test(v))+( /[^A-Za-z0-9]/.test(v));return 'Score: '+score+'/6<br>Length: '+v.length+'<br>'+ (score>=5?'Strong characteristics':'Add length, numbers, upper/lowercase and symbols.')}}
 if(slug==='hash-generator')handler=async()=>{const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(getText()));return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('')}
 if(slug==='lorem-ipsum-generator')handler=()=>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(12)).trim()
 if(slug==='qr-code-generator')handler=()=>{const v=encodeURIComponent(getText().trim());return '<img alt="QR code" style="max-width:280px" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data='+v+'"><br><small>QR image is generated by an external QR service.</small>'}
 if(slug==='text-to-pdf'||slug==='markdown-to-pdf')handler=async()=>{const {PDFDocument,rgb,StandardFonts}=await pdfLib();const doc=await PDFDocument.create();let page=doc.addPage([595,842]);const font=await doc.embedFont(StandardFonts.Helvetica);const lines=getText().replace(/\r/g,'').split(/\n/);let y=800;for(const line of lines){if(y<50){page=doc.addPage([595,842]);y=800}page.drawText(line.slice(0,95),{x:40,y,size:11,font,color:rgb(0.1,0.1,0.1)});y-=18}const blob=new Blob([await doc.save()],{type:'application/pdf'});setResult('PDF created successfully.');addDownload(blob,'globaltools-document.pdf');return ''}
 if(slug==='pdf-tools')handler=()=> 'PDF utilities are available as dedicated tools: page counter, metadata, PDF to text, merge, split, rotate and compress.'
 if(!handler)handler=()=>getText()
 input.placeholder='Enter or paste your data...';
 if(['uuid-generator','password-generator','random-password-batch','lorem-ipsum-generator','qr-code-generator','dice-roller','random-number-generator','random-choice-picker','color-palette-generator','ascii-table'].includes(slug))input.placeholder=slug==='random-choice-picker'?'One option per line':slug==='dice-roller'?'Enter: sides count (e.g. 6 2)':'Enter data or parameters...';
 action.textContent='Run Tool';action.onclick=async()=>{await run(handler);addExportButtons()};
 addExportButtons();
}
const path=location.pathname;
if(path==='/'||path==='/index.html'){
 renderHome();setupCategoryTabs();
 const s=document.getElementById('search');
 if(s)s.oninput=()=>{
   const q=s.value.toLowerCase().trim();
   document.querySelectorAll('.category-tab').forEach(x=>x.classList.toggle('active',x.dataset.cat==='all'));
   renderHome(q?tools.filter(t=>(t.name+' '+t.desc+' '+t.cat+' '+toolGroup(t)).toLowerCase().includes(q)):tools);
 };
}
else {const m=path.match(/\/tools\/([^/]+)\.html/);if(m)setupTool(m[1]);addExportButtons()}

const translations={
  en:{navTools:"Tools",navCategories:"Categories",navPrivacy:"Privacy",navTerms:"Terms",title:"Simple tools for everyday problems.",subtitle:"Convert, compress, format, generate and calculate — instantly in your browser.",search:"Search for a tool...",catTitle:"Browse categories",catSub:"Useful tools, organized by task.",popular:"Popular tools",popularSub:"Everything is free to start.",catAll:"All",catPdf:"PDF",catDocuments:"Documents",catImages:"Images",catText:"Text",catDeveloper:"Developer",catGenerators:"Generators",catConverters:"Converters",catCalculators:"Calculators",catSecurity:"Security",catDateTime:"Date & Time",catWebSeo:"Web / SEO",catNetwork:"Network",fastTitle:"Fast",fastText:"Processing directly in your browser.",privateTitle:"Private",privateText:"Your files stay with you whenever possible.",freeTitle:"Free",freeText:"No account required for core tools.",aboutTitle:"Simple tools for working with your files",aboutText:"GlobalTools brings PDF, document, image, text and developer tools together in one place. Choose a tool, process your content and download the result.",footerText:"Free online tools for everyone.",pageTitle:"GlobalTools — Free online tools",metaDescription:"Free online tools for PDF, documents, images and files. Merge, split, compress, convert and organize files directly in your browser."},
  pt:{navTools:"Ferramentas",navCategories:"Categorias",navPrivacy:"Privacidade",navTerms:"Termos",title:"Ferramentas simples para problemas do dia a dia.",subtitle:"Converta, comprima, formate, gere e calcule — instantaneamente no seu navegador.",search:"Pesquisar uma ferramenta...",catTitle:"Navegue por categorias",catSub:"Ferramentas úteis organizadas por tarefa.",popular:"Ferramentas populares",popularSub:"Tudo grátis para começar.",catAll:"Todas",catPdf:"PDF",catDocuments:"Documentos",catImages:"Imagens",catText:"Texto",catDeveloper:"Desenvolvedor",catGenerators:"Geradores",catConverters:"Conversores",catCalculators:"Calculadoras",catSecurity:"Segurança",catDateTime:"Data e Hora",catWebSeo:"Web / SEO",catNetwork:"Rede",fastTitle:"Rápido",fastText:"Processamento direto no navegador.",privateTitle:"Privado",privateText:"Seus arquivos ficam com você sempre que possível.",freeTitle:"Grátis",freeText:"Sem cadastro para as ferramentas principais.",aboutTitle:"Ferramentas simples para trabalhar com seus arquivos",aboutText:"O GlobalTools reúne ferramentas para PDF, documentos, imagens, texto e desenvolvimento em um único lugar. Escolha uma ferramenta, processe seu conteúdo e baixe o resultado.",footerText:"Ferramentas online gratuitas para todos.",pageTitle:"GlobalTools — Ferramentas online grátis",metaDescription:"Ferramentas online gratuitas para PDF, documentos, imagens e arquivos. Junte, divida, comprima, converta e organize arquivos diretamente no navegador."},
  es:{navTools:"Herramientas",navCategories:"Categorías",navPrivacy:"Privacidad",navTerms:"Términos",title:"Herramientas simples para problemas cotidianos.",subtitle:"Convierte, comprime, formatea, genera y calcula — al instante en tu navegador.",search:"Buscar una herramienta...",catTitle:"Explorar categorías",catSub:"Herramientas útiles organizadas por tarea.",popular:"Herramientas populares",popularSub:"Todo es gratis para empezar.",catAll:"Todas",catPdf:"PDF",catDocuments:"Documentos",catImages:"Imágenes",catText:"Texto",catDeveloper:"Desarrollador",catGenerators:"Generadores",catConverters:"Convertidores",catCalculators:"Calculadoras",catSecurity:"Seguridad",catDateTime:"Fecha y hora",catWebSeo:"Web / SEO",catNetwork:"Red",fastTitle:"Rápido",fastText:"Procesamiento directo en tu navegador.",privateTitle:"Privado",privateText:"Tus archivos permanecen contigo siempre que sea posible.",freeTitle:"Gratis",freeText:"Sin cuenta para las herramientas principales.",aboutTitle:"Herramientas simples para trabajar con tus archivos",aboutText:"GlobalTools reúne herramientas para PDF, documentos, imágenes, texto y desarrollo en un solo lugar. Elige una herramienta, procesa tu contenido y descarga el resultado.",footerText:"Herramientas online gratuitas para todos.",pageTitle:"GlobalTools — Herramientas online gratis",metaDescription:"Herramientas online gratuitas para PDF, documentos, imágenes y archivos. Une, divide, comprime, convierte y organiza archivos directamente en tu navegador."},
  fr:{navTools:"Outils",navCategories:"Catégories",navPrivacy:"Confidentialité",navTerms:"Conditions",title:"Des outils simples pour les problèmes du quotidien.",subtitle:"Convertissez, compressez, formatez, générez et calculez — instantanément dans votre navigateur.",search:"Rechercher un outil...",catTitle:"Parcourir les catégories",catSub:"Des outils utiles organisés par tâche.",popular:"Outils populaires",popularSub:"Tout est gratuit pour commencer.",catAll:"Tous",catPdf:"PDF",catDocuments:"Documents",catImages:"Images",catText:"Texte",catDeveloper:"Développeur",catGenerators:"Générateurs",catConverters:"Convertisseurs",catCalculators:"Calculatrices",catSecurity:"Sécurité",catDateTime:"Date et heure",catWebSeo:"Web / SEO",catNetwork:"Réseau",fastTitle:"Rapide",fastText:"Traitement direct dans votre navigateur.",privateTitle:"Privé",privateText:"Vos fichiers restent avec vous lorsque cela est possible.",freeTitle:"Gratuit",freeText:"Aucun compte requis pour les outils principaux.",aboutTitle:"Des outils simples pour travailler avec vos fichiers",aboutText:"GlobalTools réunit des outils PDF, documents, images, texte et développement en un seul endroit. Choisissez un outil, traitez votre contenu et téléchargez le résultat.",footerText:"Outils en ligne gratuits pour tous.",pageTitle:"GlobalTools — Outils en ligne gratuits",metaDescription:"Outils en ligne gratuits pour PDF, documents, images et fichiers. Fusionnez, divisez, compressez, convertissez et organisez vos fichiers directement dans le navigateur."}
};

function toolTextTranslations(lang){return ({en:{home:'Home',chooseFiles:'Choose files',dropTitle:'Select files',dropHint:'or drag and drop files here',chooseRun:'Choose file',runTool:'Run Tool',resultPlaceholder:'Your result will appear here.',privateCard:'Private & secure',privateCardText:'Your files are processed in your browser whenever possible.',freeCard:'Free to use',freeCardText:'No account required for the core tools.',formatsCard:'Multiple formats',formatsCardText:'PDF, Word, Excel, images and more.',aboutTool:'About this tool',howTo:'How to use',howToText:'Enter your content or choose a file, process it, then download your result.',toolKicker:'GLOBALTOOLS • ONLINE TOOLS'},pt:{home:'Início',chooseFiles:'Escolha os arquivos',dropTitle:'Selecionar arquivos',dropHint:'ou arraste e solte os arquivos aqui',chooseRun:'Escolher arquivo',runTool:'Executar ferramenta',resultPlaceholder:'Seu resultado aparecerá aqui.',privateCard:'Privado e seguro',privateCardText:'Seus arquivos são processados no navegador sempre que possível.',freeCard:'Grátis',freeCardText:'Não é necessário cadastro para as ferramentas principais.',formatsCard:'Vários formatos',formatsCardText:'PDF, Word, Excel, imagens e muito mais.',aboutTool:'Sobre esta ferramenta',howTo:'Como usar',howToText:'Digite seu conteúdo ou escolha um arquivo, processe e baixe o resultado.',toolKicker:'GLOBALTOOLS • FERRAMENTAS ONLINE'},es:{home:'Inicio',chooseFiles:'Elige los archivos',dropTitle:'Seleccionar archivos',dropHint:'o arrastra y suelta los archivos aquí',chooseRun:'Elegir archivo',runTool:'Ejecutar herramienta',resultPlaceholder:'Tu resultado aparecerá aquí.',privateCard:'Privado y seguro',privateCardText:'Tus archivos se procesan en el navegador siempre que sea posible.',freeCard:'Gratis',freeCardText:'No se requiere cuenta para las herramientas principales.',formatsCard:'Varios formatos',formatsCardText:'PDF, Word, Excel, imágenes y más.',aboutTool:'Acerca de esta herramienta',howTo:'Cómo usar',howToText:'Escribe tu contenido o elige un archivo, procesa y descarga el resultado.',toolKicker:'GLOBALTOOLS • HERRAMIENTAS ONLINE'},fr:{home:'Accueil',chooseFiles:'Choisir les fichiers',dropTitle:'Sélectionner les fichiers',dropHint:'ou glissez-déposez les fichiers ici',chooseRun:'Choisir un fichier',runTool:'Exécuter l’outil',resultPlaceholder:'Votre résultat apparaîtra ici.',privateCard:'Privé et sécurisé',privateCardText:'Vos fichiers sont traités dans le navigateur lorsque cela est possible.',freeCard:'Gratuit',freeCardText:'Aucun compte requis pour les outils principaux.',formatsCard:'Plusieurs formats',formatsCardText:'PDF, Word, Excel, images et plus.',aboutTool:'À propos de cet outil',howTo:'Comment utiliser',howToText:'Saisissez votre contenu ou choisissez un fichier, traitez-le puis téléchargez le résultat.',toolKicker:'GLOBALTOOLS • OUTILS EN LIGNE'}})[lang]||{}}
function applyLanguage(lang){
 const t=translations[lang]||translations.en,tt=toolTextTranslations(lang);
 document.documentElement.lang=lang==="pt"?"pt-BR":lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;const value=t[key]??tt[key];if(value!==undefined)el.textContent=value});
 document.querySelectorAll("[data-i18n-attr]").forEach(el=>{
   String(el.dataset.i18nAttr||"").split(";").forEach(rule=>{
     const parts=rule.split(":");const attr=parts[0],key=parts.slice(1).join(":");const value=t[key];if(attr&&value!==undefined)el.setAttribute(attr,value)
   })
 });
 document.title=t.pageTitle||document.title;
 const meta=document.querySelector('meta[name="description"]');if(meta&&t.metaDescription)meta.setAttribute("content",t.metaDescription);
 const s=document.getElementById("search");if(s&&t.search)s.placeholder=t.search;
 const input=document.getElementById("input");if(input)input.placeholder=lang==="pt"?"Digite ou cole seus dados...":lang==="es"?"Introduce o pega tus datos...":lang==="fr"?"Saisissez ou collez vos données...":"Enter or paste your data...";
 const action=document.getElementById("action");if(action&&!document.getElementById("fileInput"))action.textContent=tt.runTool||"Run Tool";
 applyToolLocale(lang);
 localStorage.setItem("globaltools-language-v2",lang)
}
function setupLanguage(){const select=document.getElementById("languageSelect");if(!select)return;const saved=localStorage.getItem("globaltools-language-v2")||"en";select.value=saved;applyLanguage(saved);select.addEventListener("change",()=>applyLanguage(select.value))}
setupLanguage();
