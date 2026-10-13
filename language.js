(function(){
  const STORAGE_KEY="globaltools-language-v2";
  const MIGRATION_KEY="oolivo-pt-default-migrated-v1";
  const languages=[
    ["en","English"],["pt","Português"],["es","Español"],["fr","Français"]
  ];

  function getLanguage(){
    return localStorage.getItem(STORAGE_KEY)||"pt";
  }

  function sourceLanguage(){
    const declared=(document.documentElement.lang||"en").toLowerCase();
    if(declared.startsWith("pt")) return "pt";
    if(declared.startsWith("es")) return "es";
    if(declared.startsWith("fr")) return "fr";
    return "en";
  }

  function setGoogleCookie(lang,source=sourceLanguage()){
    const maxAge=60*60*24*365;
    const value="/"+source+"/"+lang;
    document.cookie="googtrans="+value+";path=/;max-age="+maxAge;
    document.cookie="googtrans="+value+";domain="+location.hostname+";path=/;max-age="+maxAge;
  }

  function currentGoogleCookie(){
    const item=document.cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith("googtrans="));
    if(!item)return "";
    try{return decodeURIComponent(item.slice("googtrans=".length));}catch{return item.slice("googtrans=".length);}
  }

  function clearGoogleCookie(){
    document.cookie="googtrans=;path=/;max-age=0";
    document.cookie="googtrans=;domain="+location.hostname+";path=/;max-age=0";
  }

  function switchLanguage(lang){
    localStorage.setItem(STORAGE_KEY,lang);
    const source=sourceLanguage();
    if(lang===source) clearGoogleCookie();
    else setGoogleCookie(lang,source);
    location.reload();
  }

  function ensureSwitcher(){
    let select=document.getElementById("languageSelect");
    if(!select){
      const nav=document.querySelector(".main-nav");
      if(!nav)return;
      const wrap=document.createElement("label");
      wrap.className="language-switcher";
      wrap.innerHTML='<span aria-hidden="true">🌐</span><select id="languageSelect" aria-label="Language"></select>';
      nav.appendChild(wrap);
      select=wrap.querySelector("select");
    }
    select.innerHTML=languages.map(([v,l])=>'<option value="'+v+'">'+l+"</option>").join("");
    select.value=getLanguage();
    if(!select.dataset.globalToolsBound){
      select.dataset.globalToolsBound="1";
      select.addEventListener("change",e=>switchLanguage(e.target.value));
    }
  }

  function hideGoogleUi(){
    const style=document.createElement("style");
    style.textContent=".goog-te-banner-frame,.skiptranslate{display:none!important}body{top:0!important}.goog-tooltip,.goog-tooltip:hover{display:none!important}.goog-text-highlight{background:transparent!important;box-shadow:none!important}#google_translate_element{display:none!important}";
    document.head.appendChild(style);
  }

  window.googleTranslateElementInit=function(){
    if(window.google && google.translate && google.translate.TranslateElement){
      new google.translate.TranslateElement({
        pageLanguage:sourceLanguage(),
        includedLanguages:"en,pt,es,fr",
        autoDisplay:false
      },"google_translate_element");
    }
  };

  function loadTranslator(){
    if(getLanguage()===sourceLanguage())return;
    if(document.getElementById("google_translate_element"))return;
    const host=document.createElement("div");
    host.id="google_translate_element";
    document.body.appendChild(host);
    if(!document.querySelector('script[data-globaltools-translate]')){
      const script=document.createElement("script");
      script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async=true;
      script.dataset.globaltoolsTranslate="1";
      document.head.appendChild(script);
    }
  }

  function boot(){
    if(typeof window.applyLanguage==="function") return;
    hideGoogleUi();
    ensureSwitcher();

    let migrated=false;
    if(!localStorage.getItem(MIGRATION_KEY)){
      localStorage.setItem(STORAGE_KEY,"pt");
      localStorage.setItem(MIGRATION_KEY,"1");
      migrated=true;
    }

    const target=getLanguage();
    const source=sourceLanguage();
    const cookie=currentGoogleCookie();
    const expected="/"+source+"/"+target;

    if(target===source){
      if(cookie && cookie!=="/"+source+"/"+source){
        clearGoogleCookie();
        location.reload();
        return;
      }
      if(migrated){location.reload();return;}
      return;
    }

    if(migrated || cookie!==expected){
      setGoogleCookie(target,source);
      location.reload();
      return;
    }
    loadTranslator();
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);
  else boot();
})();