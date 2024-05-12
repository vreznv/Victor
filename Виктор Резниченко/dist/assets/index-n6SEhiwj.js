(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h=`
<form>
    <div class="mb-3">
        <label for="where" class="form-label">Откуда-Куда</label>
        <input autocomplete="off" type="text" class="form-control" id="where" placeholder="Введите город">
        <p id="where-notification"></p>
    </div>
    <div class="mb-3">
        <label for="when" class="form-label">Когда</label>
        <input autocomplete="off" type="text" class="form-control" id="when" placeholder="Введите число и месяц">
        <p id="when-notification"></p>
    </div>
    <button type="submit" class="btn btn-primary" id="submit-btn">Найти билеты</button>
</form>
`;function b(){const l=document.querySelector(".container"),s=document.querySelector("h2"),r=document.createElement("div");r.innerHTML=h,l.insertBefore(r,s.nextSibling);const n=document.getElementById("where"),e=document.getElementById("when"),t=document.getElementById("submit-btn"),o=document.getElementById("where-notification"),d=document.getElementById("when-notification"),i=c=>/^[^-]+-[^-]+$/.test(c),a=c=>/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])$/.test(c),u=()=>{i(n.value)&&a(e.value)?(t.classList.remove("btn-danger"),t.classList.add("btn-success")):(t.classList.remove("btn-success"),t.classList.add("btn-danger"))},m=()=>{o.textContent=i(n.value)?"Валидно":"Невалидно",o.className=i(n.value)?"text-success":"text-danger"},p=()=>{d.textContent=a(e.value)?"Валидно":"Невалидно",d.className=a(e.value)?"text-success":"text-danger"};n.addEventListener("input",()=>{m(),u()}),e.addEventListener("input",()=>{p(),u()}),r.addEventListener("submit",async c=>{if(c.preventDefault(),i(n.value)&&a(e.value))try{(await fetch("/tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({where:n.value,when:e.value})})).ok?document.body.classList.add("bg-success"):console.error("Ошибка при отправке запроса на сервер")}catch(f){console.error("Ошибка при отправке запроса на сервер:",f)}})}b();
