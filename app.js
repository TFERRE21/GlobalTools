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

function card(t){return '<a class="tool-card" href="/tools/'+t.slug+'.html"><h3>'+t.name+'</h3><p>'+t.desc+'</p><span class="tool-tag">'+t.cat.toUpperCase()+' TOOL →</span></a>'}
function renderHome(list=tools){const el=document.getElementById('tool-grid');if(el)el.innerHTML=list.map(card).join('')}
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function setupTool(slug){
 const box=document.getElementById('tool'); if(!box)return;
 const out=document.getElementById('result'); const input=document.getElementById('input'); const action=document.getElementById('action');
 const set=v=>out.innerHTML=v;
 const t={};
 if(slug==='word-counter'||slug==='character-counter'){input.placeholder='Paste or type your text here...';action.textContent='Count';action.onclick=()=>{const v=input.value;const words=v.trim()?v.trim().split(/\s+/).length:0;const chars=v.length;const no=v.replace(/\s/g,'').length;const sentences=v.trim()?v.split(/[.!?]+/).filter(Boolean).length:0;set('Words: '+words+'\nCharacters: '+chars+'\nCharacters without spaces: '+no+'\nSentences: '+sentences)}}
 else if(slug==='case-converter'){action.textContent='Convert';action.onclick=()=>{const v=input.value;set('UPPERCASE:\n'+v.toUpperCase()+'\n\nLOWERCASE:\n'+v.toLowerCase()+'\n\nTitle Case:\n'+v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()))}}
 else if(slug==='remove-duplicate-lines'){action.textContent='Clean';action.onclick=()=>set([...new Set(input.value.split(/\r?\n/))].join('\n'))}
 else if(slug==='json-formatter'||slug==='json-minifier'){action.textContent=slug==='json-formatter'?'Format JSON':'Minify JSON';action.onclick=()=>{try{const o=JSON.parse(input.value);set(JSON.stringify(o,null,slug==='json-formatter'?2:0))}catch(e){set('Invalid JSON: '+e.message)}}}
 else if(slug==='base64-encoder'){action.textContent='Encode';action.onclick=()=>set(btoa(unescape(encodeURIComponent(input.value))))}
 else if(slug==='base64-decoder'){action.textContent='Decode';action.onclick=()=>{try{set(decodeURIComponent(escape(atob(input.value))))}catch(e){set('Invalid Base64 input.')}}}
 else if(slug==='url-encoder'){action.textContent='Encode';action.onclick=()=>set(encodeURIComponent(input.value))}
 else if(slug==='url-decoder'){action.textContent='Decode';action.onclick=()=>{try{set(decodeURIComponent(input.value))}catch(e){set('Invalid encoded URL.')}}}
 else if(slug==='uuid-generator'){input.classList.add('hidden');action.textContent='Generate UUID';action.onclick=()=>set(crypto.randomUUID())}
 else if(slug==='password-generator'){input.classList.add('hidden');action.textContent='Generate Password';action.onclick=()=>{const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';let s='';for(let i=0;i<20;i++)s+=chars[Math.floor(Math.random()*chars.length)];set(s)}}
 else if(slug==='lorem-ipsum-generator'){input.classList.add('hidden');action.textContent='Generate Text';action.onclick=()=>set('Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(12).trim())}
 else if(slug==='percentage-calculator'){input.placeholder='Example: 15% of 200';action.textContent='Calculate';action.onclick=()=>{const m=input.value.match(/([\d.,]+)\s*%\s*(?:of|de)\s*([\d.,]+)/i);if(!m)return set('Use a format like: 15% of 200');set((parseFloat(m[1].replace(',','.'))/100*parseFloat(m[2].replace(',','.'))).toString())}}
 else if(slug==='age-calculator'){input.type='date';action.textContent='Calculate Age';action.onclick=()=>{const d=new Date(input.value+'T00:00:00');if(isNaN(d))return set('Choose a valid date.');const n=new Date();let age=n.getFullYear()-d.getFullYear();const before=n.getMonth()<d.getMonth()||(n.getMonth()===d.getMonth()&&n.getDate()<d.getDate());if(before)age--;set('Age: '+age+' years')}} 
 else if(slug==='unix-timestamp'){input.placeholder='Example: 1790000000';action.textContent='Convert';action.onclick=()=>{const n=Number(input.value);if(!Number.isFinite(n))return set('Enter a valid timestamp.');set(new Date(n*1000).toString())}}
 else if(slug==='color-converter'){input.placeholder='Example: #635BFF';action.textContent='Convert';action.onclick=()=>{let h=input.value.trim().replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');if(!/^[0-9a-f]{6}$/i.test(h))return set('Enter a valid 6-digit HEX color.');set('RGB: rgb('+parseInt(h.slice(0,2),16)+', '+parseInt(h.slice(2,4),16)+', '+parseInt(h.slice(4),16)+')')}} 
 else if(slug==='text-to-slug'){action.textContent='Create Slug';action.onclick=()=>set(input.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''))}
 else if(slug==='hash-generator'){action.textContent='Generate SHA-256';action.onclick=async()=>{const data=new TextEncoder().encode(input.value);const hash=await crypto.subtle.digest('SHA-256',data);set([...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join(''))}}
 else if(slug==='number-base-converter'){action.textContent='Convert';action.onclick=()=>{const n=input.value.trim();const b=prompt('Input base (2-36):','10');if(!b)return;const x=parseInt(n,Number(b));if(isNaN(x))return set('Invalid number.');set('Binary: '+x.toString(2)+'\nDecimal: '+x+'\nHexadecimal: '+x.toString(16).toUpperCase())}}
 else if(slug==='image-info'||slug==='image-to-data-url'){input.type='file';action.textContent=slug==='image-info'?'Inspect Image':'Convert to Data URL';action.onclick=()=>{const f=input.files[0];if(!f)return set('Choose an image first.');if(slug==='image-info'){const im=new Image();im.onload=()=>set('File: '+f.name+'\nType: '+f.type+'\nSize: '+(f.size/1024).toFixed(1)+' KB\nDimensions: '+im.width+' × '+im.height);im.src=URL.createObjectURL(f)}else{const r=new FileReader();r.onload=()=>set(r.result);r.readAsDataURL(f)}}}
 else if(slug==='qr-code-generator'){input.placeholder='Enter text or URL';action.textContent='Generate QR Code';action.onclick=()=>{const v=encodeURIComponent(input.value);set('<img alt="QR code" style="max-width:280px" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data='+v+'">')}}
 else if(slug==='pdf-tools'){input.classList.add('hidden');action.textContent='Coming next';action.onclick=()=>set('PDF processing tools are being added to the GlobalTools library.')}
}
const path=location.pathname;
if(path==='/'||path==='/index.html'){renderHome();const s=document.getElementById('search');if(s)s.oninput=()=>renderHome(tools.filter(t=>(t.name+' '+t.desc+' '+t.cat).toLowerCase().includes(s.value.toLowerCase())))}
else {const m=path.match(/\/tools\/([^/]+)\.html/);if(m)setupTool(m[1])}
