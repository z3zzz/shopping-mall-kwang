(()=>{"use strict";const e=()=>Math.random().toString(36).substring(2,7),t="kwang-shopping";AWS.config.update({region:"ap-northeast-2",credentials:new AWS.CognitoIdentityCredentials({IdentityPoolId:"ap-northeast-2:b6a1fa02-993d-437d-9ed5-7134db218241"})});new AWS.S3({apiVersion:"2006-03-01",params:{Bucket:t}});const n=e=>{const t=e.split(" "),n=document.querySelector("#navbar"),o=!!localStorage.getItem("token"),a=!!localStorage.getItem("admin"),r={register:'<li><a href="/register">회원가입</a></li>',login:'<li><a href="/login">로그인</a></li>'},c={account:'<li><a href="/account">계정관리</a></li>',logout:'<li><a href="#" id="logout">로그아웃</a></li>',productAdd:'<li><a href="/product/add">제품 추가</a></li>',categoryAdd:'<li><a href="/category/add">카테고리 추가</a></li>'},i={admin:'<li><a href="/admin">페이지관리</a></li>'},s=document.createElement("script");s.innerText="\n      const logoutElem = document.querySelector('#logout'); \n      \n      if (logoutElem) {\n        logoutElem.addEventListener('click', () => {\n          localStorage.removeItem('token');\n          localStorage.removeItem('admin');\n\n          window.location.href = '/';\n        });\n      }\n  ";let l="";for(const e of t)a&&(l+=i[e]??""),l+=o?c[e]??"":r[e]??"";n.insertAdjacentHTML("afterbegin",l),n.after(s)},o=document.querySelector("#titleInput"),a=document.querySelector("#categorySelectBox"),r=document.querySelector("#manufacturerInput"),c=document.querySelector("#shortDescriptionInput"),i=document.querySelector("#detailDescriptionInput"),s=document.querySelector("#imageInput"),l=document.querySelector("#inventoryInput"),d=document.querySelector("#priceInput"),u=document.querySelector("#searchKeywordInput"),g=document.querySelector("#addKeywordButton"),m=document.querySelector("#keywordContainer"),p=document.querySelector("#submitButton"),f=document.querySelector("#registerProductForm");async function y(n){n.preventDefault();const u=o.value,g=a.value,p=r.value,y=c.value,h=i.value,S=s.files[0],v=parseInt(l.value),k=parseInt(d.value);if(!(u&&g&&p&&y&&h&&v&&k))return alert("빈 칸 및 0이 없어야 합니다.");if(S.size>3e6)return alert("사진은 최대 2.5MB 크기까지 가능합니다.");const I=a.selectedIndex,b=a[I].text;try{const n={title:u,categoryId:g,manufacturer:p,shortDescription:y,detailDescription:h,imageKey:await async function(n,o){const a=n.files;if(!a.length)throw new Error("사진 파일을 업로드해 주세요.");const r=a[0],c=e()+"_"+r.name,i=encodeURIComponent(o)+"/"+c,s=new AWS.S3.ManagedUpload({params:{Bucket:t,Key:i,Body:r}});try{const e=await s.promise(),t=e.Key;return console.log(e),console.log(`AWS S3에 정상적으로 사진이 업로드되었습니다.\n파일 위치: ${t}`),t}catch(e){throw new Error(`S3에 업로드하는 과정에서 에러가 발생하였습니다.\n${e.message}`)}}(s,b),inventory:v,price:k,searchKeywords:w};await async function(e,t){const n=e,o=JSON.stringify(t);console.log(`%cPOST 요청: ${n}`,"color: #296aba;"),console.log(`%cPOST 요청 데이터: ${o}`,"color: #296aba;");const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:o});if(!a.ok){const e=await a.json(),{reason:t}=e;throw new Error(t)}return await a.json()}("/api/product",n),alert(`정상적으로 ${u} 제품이 등록되었습니다.`),f.reset(),fileNameSpan.innerText="",m.innerHTML="",a.style.color="black",a.style.backgroundColor="white",w=[]}catch(e){console.log(e.stack),alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`)}}function h(){const e=s.files[0];fileNameSpan.innerText=e?e.name:""}function S(){const e=a.selectedIndex;a.className=a[e].className}(()=>{if(!localStorage.getItem("token")){const e=window.location.pathname,t=window.location.search;window.location.replace(`/login?previouspage=${e+t}`)}})(),(()=>{switch(window.location.pathname){case"/":case"/cart/":case"/product/detail/":case"/product/list/":n("admin register login account logout");break;case"/account/orders/":case"/account/security/":case"/account/signout/":case"/admin/orders/":case"/admin/users/":case"/order/complete/":case"/order/":case"/product/add/":n("admin account logout");break;case"/account/":n("admin logout");break;case"/admin/":n("account logout");break;case"/category/add/":n("admin account productAdd logout");break;case"/login/":n("register");break;case"/register/":n("login")}})(),async function(){(await async function(e,t=""){const n=`${e}/${t}`;console.log(`%cGET 요청: ${n} `,"color: #a25cd1;");const o=await fetch(n,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!o.ok){const e=await o.json(),{reason:t}=e;throw new Error(t)}return await o.json()}("/api/categorylist")).forEach((e=>{const{_id:t,title:n,themeClass:o}=e;a.insertAdjacentHTML("beforeend",`\n      <option value=${t} class="notification ${o}"> ${n} </option>`)}))}(),s.addEventListener("change",h),p.addEventListener("click",y),a.addEventListener("change",S),g.addEventListener("click",v);let w=[];function v(t){t.preventDefault();const n=u.value;if(!n)return;if(w.includes(n))return alert("이미 추가한 검색어입니다.");w.push(n);const o=e();m.insertAdjacentHTML("beforeend",`\n    <div class="control" id="a${o}">\n      <div class="tags has-addons">\n        <span class="tag is-link is-light">${n}</span>\n        <a class="tag is-link is-light is-delete"></a>\n      </div>\n    </div>\n  `),m.querySelector(`#a${o} .is-delete`).addEventListener("click",k),u.value="",u.focus()}function k(e){const t=e.target.previousElementSibling.innerText,n=w.indexOf(t);w.splice(n,1),e.target.parentElement.parentElement.remove()}})();