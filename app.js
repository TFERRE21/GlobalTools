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
{slug:"number-base-converter",name:"Number Base Converter",desc:"Convert numbers between binary, decimal, hexadecimal and more.",cat:"developer"}
];

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
