const t=document.body,e=document.querySelector("button[data-start"),d=document.querySelector("button[data-stop");let a=null;d.disabled=!0,e.addEventListener("click",(function({target:e}){a=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,d.disabled=!1})),d.addEventListener("click",(function({target:t}){clearInterval(a),t.disabled=!0,e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.8b7cc1dc.js.map