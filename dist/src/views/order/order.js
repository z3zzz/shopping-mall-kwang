(()=>{"use strict";async function e(e,t=""){const o=`${e}/${t}`;console.log(`%cGET 요청: ${o} `,"color: #a25cd1;");const r=await fetch(o,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!r.ok){const e=await r.json(),{reason:t}=e;throw new Error(t)}return await r.json()}async function t(e,t){const o=e,r=JSON.stringify(t);console.log(`%cPOST 요청: ${o}`,"color: #296aba;"),console.log(`%cPOST 요청 데이터: ${r}`,"color: #296aba;");const n=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:r});if(!n.ok){const e=await n.json(),{reason:t}=e;throw new Error(t)}return await n.json()}const o=e=>e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),r=e=>{const t=e.split(" "),o=document.querySelector("#navbar"),r=!!localStorage.getItem("token"),n=!!localStorage.getItem("admin"),a={register:'<li><a href="/register">회원가입</a></li>',login:'<li><a href="/login">로그인</a></li>'},c={account:'<li><a href="/account">계정관리</a></li>',logout:'<li><a href="#" id="logout">로그아웃</a></li>',productAdd:'<li><a href="/product/add">제품 추가</a></li>',categoryAdd:'<li><a href="/category/add">카테고리 추가</a></li>'},s={admin:'<li><a href="/admin">페이지관리</a></li>'},l=document.createElement("script");l.innerText="\n      const logoutElem = document.querySelector('#logout'); \n      \n      if (logoutElem) {\n        logoutElem.addEventListener('click', () => {\n          localStorage.removeItem('token');\n          localStorage.removeItem('admin');\n\n          window.location.href = '/';\n        });\n      }\n  ";let i="";for(const e of t)n&&(i+=s[e]??""),i+=r?c[e]??"":a[e]??"";o.insertAdjacentHTML("afterbegin",i),o.after(l)};let n;const a=()=>{const e=new Promise(((e,t)=>{const o=indexedDB.open("shopping",1);o.onupgradeneeded=()=>{console.log("indexeddb의 업그레이드가 이루어집니다.");const e=o.result;e.createObjectStore("cart",{autoIncrement:!0}),e.createObjectStore("order",{autoIncrement:!0})},o.onsuccess=async()=>{console.log("indexeddb가 정상적으로 시작되었습니다."),e(o.result)},o.onerror=()=>{const e=o.error;console.log(`indexeddb를 시작하는 과정에서 오류가 발생하였습니다: ${e}`),t(e)}}));return e},c=async(e,t="")=>{n||(n=await a());const o=n.transaction([e]).objectStore(e);return new Promise(((r,n)=>{const a=t?o.get(t):o.getAll();a.onsuccess=()=>{r(a.result)},a.onerror=()=>{const t=a.error;console.log(`${e}에서 가져오는 과정에서 오류가 발생하였습니다: ${t}`),n(t)}}))},s=async(e,t,o)=>{n||(n=await a());const r=n.transaction([e],"readwrite").objectStore(e);return new Promise(((n,a)=>{const c=r.get(t);c.onsuccess=()=>{const s=c.result||{};o(s);const l=r.put(s,t);l.onsuccess=()=>{console.log(`${e}가 정상적으로 수정되었습니다.`),n()},l.onerror=()=>{const t=l.error;console.log(`${e}를 수정하는데 에러가 발생하였습니다: ${t} `),a(t)}}}))},l=async(e,t="")=>{n||(n=await a());const o=n.transaction([e],"readwrite").objectStore(e);return new Promise(((r,n)=>{const a=t?o.delete(t):o.clear();a.onsuccess=()=>{console.log(`${e}에서 정상적으로 삭제되었습니다.`),r()},a.onerror=()=>{const t=a.error;console.log(`${e}에서 삭제하는데 에러가 발생하였습니다: ${t} `),n(t)}}))},i=document.querySelector("#subtitleCart"),d=document.querySelector("#receiverName"),u=document.querySelector("#receiverPhoneNumber"),m=document.querySelector("#postalCode"),g=document.querySelector("#searchAddressButton"),p=document.querySelector("#address1"),y=document.querySelector("#address2"),f=document.querySelector("#requestSelectBox"),w=document.querySelector("#customRequestContainer"),h=document.querySelector("#customRequest"),S=document.querySelector("#productsTitle"),b=document.querySelector("#productsTotal"),v=document.querySelector("#deliveryFee"),$=document.querySelector("#orderTotal"),q=document.querySelector("#checkoutButton"),T={1:"직접 수령하겠습니다.",2:"배송 전 연락바랍니다.",3:"부재 시 경비실에 맡겨주세요.",4:"부재 시 문 앞에 놓아주세요.",5:"부재 시 택배함에 넣어주세요.",6:"직접 입력"};var k;function I(){new daum.Postcode({oncomplete:function(e){let t="",o="";t="R"===e.userSelectedType?e.roadAddress:e.jibunAddress,"R"===e.userSelectedType&&(""!==e.bname&&/[동|로|가]$/g.test(e.bname)&&(o+=e.bname),""!==e.buildingName&&"Y"===e.apartment&&(o+=""!==o?", "+e.buildingName:e.buildingName),""!==o&&(o=" ("+o+")")),m.value=e.zonecode,p.value=`${t} ${o}`,y.placeholder="상세 주소를 입력해 주세요.",y.focus()}}).open()}function x(e){const t=e.target.value;"6"===t?(w.style.display="flex",h.focus()):w.style.display="none",f.style.color="0"===t?"rgba(0, 0, 0, 0.3)":"rgba(0, 0, 0, 1)"}async function j(){const e=d.value,o=u.value,r=m.value,n=p.value,a=y.value,i=f.value,g=h.value,w=S.innerText,b=(v=$.innerText,parseInt(v.replace(/(,|개|원)/g,"")));var v;const{selectedIds:q}=await c("order","summary");if(!(e&&o&&r&&a))return alert("배송지 정보를 모두 입력해 주세요.");let k;if("0"===i)k="요청사항 없음.";else if("6"===i){if(!g)return alert("요청사항을 작성해 주세요.");k=g}else k=T[i];const I={postalCode:r,address1:n,address2:a,receiverName:e,receiverPhoneNumber:o};try{const e=(await t("/api/order",{summaryTitle:w,totalPrice:b,address:I,request:k}))._id;for(const o of q){const{quantity:r,price:n}=await c("cart",o),a=r*n;await t("/api/orderitem",{orderId:e,productId:o,quantity:r,totalPrice:a}),await l("cart",o),await s("order","summary",(e=>{e.ids=e.ids.filter((e=>e!==o)),e.selectedIds=e.selectedIds.filter((e=>e!==o)),e.productsCount-=1,e.productsTotal-=a}))}const i={phoneNumber:o,address:{postalCode:r,address1:n,address2:a}};await t("/api/user/deliveryinfo",i),alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다."),window.location.href="/order/complete"}catch(e){console.log(e),alert(`결제 중 문제가 발생하였습니다: ${e.message}`)}}(()=>{if(!localStorage.getItem("token")){const e=window.location.pathname,t=window.location.search;window.location.replace(`/login?previouspage=${e+t}`)}})(),(()=>{switch(window.location.pathname){case"/":case"/cart/":case"/product/detail/":case"/product/list/":r("admin register login account logout");break;case"/account/orders/":case"/account/security/":case"/account/signout/":case"/admin/orders/":case"/admin/users/":case"/order/complete/":case"/order/":case"/product/add/":r("admin account logout");break;case"/account/":r("admin logout");break;case"/admin/":r("account logout");break;case"/category/add/":r("admin account productAdd logout");break;case"/login/":r("register");break;case"/register/":r("login")}})(),async function(){const{ids:t,selectedIds:r,productsTotal:n}=await c("order","summary"),a=0!==t.length,s=0!==r.length;if(!a){const t=(e=>{if(Array.isArray(e))return e[[Math.floor(Math.random()*e.length)]];const t=Object.keys(e);return e[t[[Math.floor(Math.random()*t.length)]]]})(await e("/api/categorylist")).title;return alert("구매할 제품이 없습니다. 제품을 선택해 주세요."),window.location.replace(`/product/list?category=${t}`)}if(!s)return alert("구매할 제품이 없습니다. 장바구니에서 선택해 주세요."),window.location.replace("/cart");let l="";for(const e of r){const{title:t,quantity:o}=await c("cart",e);l&&(l+="\n"),l+=`${t} / ${o}개`}S.innerText=l,b.innerText=`${o(n)}원`,s?(v.innerText="3,000원",$.innerText=`${o(n+3e3)}원`):(v.innerText="0원",$.innerText="0원"),d.focus()}(),async function(){const t=await e("/api/user"),{fullName:o,phoneNumber:r,address:n}=t;o&&(d.value=o),r&&(u.value=r),n&&(postalCode.value=n.postalCode,p.value=n.address1,y.value=n.address2)}(),i.addEventListener("click",(k="/cart",function(){window.location.href=k})),g.addEventListener("click",I),f.addEventListener("change",x),q.addEventListener("click",j)})();