(()=>{"use strict";const e=e=>{const t=e.split(" "),o=document.querySelector("#navbar"),a=!!localStorage.getItem("token"),n=!!localStorage.getItem("admin"),r={register:'<li><a href="/register">회원가입</a></li>',login:'<li><a href="/login">로그인</a></li>'},c={account:'<li><a href="/account">계정관리</a></li>',logout:'<li><a href="#" id="logout">로그아웃</a></li>',productAdd:'<li><a href="/product/add">제품 추가</a></li>',categoryAdd:'<li><a href="/category/add">카테고리 추가</a></li>'},s={admin:'<li><a href="/admin">페이지관리</a></li>'},d=document.createElement("script");d.innerText="\n      const logoutElem = document.querySelector('#logout'); \n      \n      if (logoutElem) {\n        logoutElem.addEventListener('click', () => {\n          localStorage.removeItem('token');\n          localStorage.removeItem('admin');\n\n          window.location.href = '/';\n        });\n      }\n  ";let l="";for(const e of t)n&&(l+=s[e]??""),l+=a?c[e]??"":r[e]??"";o.insertAdjacentHTML("afterbegin",l),o.after(d)};const t=document.querySelector("#securityTitle"),o=document.querySelector("#fullNameInput"),a=document.querySelector("#fullNameToggle"),n=document.querySelector("#passwordInput"),r=document.querySelector("#passwordToggle"),c=document.querySelector("#passwordConfirmInput"),s=document.querySelector("#postalCodeInput"),d=document.querySelector("#searchAddressButton"),l=document.querySelector("#addressToggle"),u=document.querySelector("#address1Input"),i=document.querySelector("#address2Input"),m=document.querySelector("#phoneNumberInput"),g=document.querySelector("#phoneNumberToggle"),p=document.querySelector("#saveButton"),f=document.querySelector("#modal"),b=document.querySelector("#modalBackground"),h=document.querySelector("#modalCloseButton"),v=document.querySelector("#currentPasswordInput"),y=document.querySelector("#saveCompleteButton");function w(e){const t=e.target.id,a=e.target.checked;let r,l;t.includes("fullName")&&(r=[o]),t.includes("password")&&(r=[n,c]),t.includes("address")&&(r=[s,u,i,d]),t.includes("phoneNumber")&&(r=[m]);for(const e of r)a&&(e.removeAttribute("disabled"),!l&&e.focus(),l=!0);if(!a)for(const e of r)e.setAttribute("disabled","")}let S;function k(){o.setAttribute("disabled",""),a.checked=!1,n.setAttribute("disabled",""),r.checked=!1,c.setAttribute("disabled",""),s.setAttribute("disabled",""),l.checked=!1,d.setAttribute("disabled",""),u.setAttribute("disabled",""),i.setAttribute("disabled",""),g.checked=!1,m.setAttribute("disabled","")}function A(e){e.preventDefault(),new daum.Postcode({oncomplete:function(e){let t="",o="";t="R"===e.userSelectedType?e.roadAddress:e.jibunAddress,"R"===e.userSelectedType&&(""!==e.bname&&/[동|로|가]$/g.test(e.bname)&&(o+=e.bname),""!==e.buildingName&&"Y"===e.apartment&&(o+=""!==o?", "+e.buildingName:e.buildingName),""!==o&&(o=" ("+o+")")),s.value=e.zonecode,u.value=`${t} ${o}`,i.placeholder="상세 주소를 입력해 주세요.",i.focus()}}).open()}async function q(e){e.preventDefault();const t=o.value,a=n.value,r=c.value,d=s.value,l=u.value,g=i.value,p=m.value,f=v.value,b=a.length>=4,h=a===r,y=d!==(S.address?.postalCode||""),w=g!==(S.address?.address2||""),A=y||w;if(a&&!b)return N(),alert("비밀번호는 4글자 이상이어야 합니다.");if(a&&!h)return N(),alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");const q={currentPassword:f};if(t!==S.fullName&&(q.fullName=t),a!==S.password&&(q.password=a),A&&!g)return N(),alert("주소를 모두 입력해 주세요.");A&&(q.address={postalCode:d,address1:l,address2:g}),p&&p!==S.phoneNumber&&(q.phoneNumber=p);if(1===Object.keys(q).length)return k(),N(),alert("업데이트된 정보가 없습니다");try{const{_id:e}=S;await async function(e,t="",o){const a=`${e}/${t}`,n=JSON.stringify(o);console.log(`%cPATCH 요청: ${a}`,"color: #059c4b;"),console.log(`%cPATCH 요청 데이터: ${n}`,"color: #059c4b;");const r=await fetch(a,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:n});if(!r.ok){const e=await r.json(),{reason:t}=e;throw new Error(t)}return await r.json()}("/api/users",e,q),alert("회원정보가 안전하게 저장되었습니다."),k(),N()}catch(e){alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${e}`)}}function E(e){e.preventDefault(),f.classList.add("is-active"),v.focus()}function N(e){e&&e.preventDefault(),f.classList.remove("is-active")}function I(e){27===e.keyCode&&N()}(()=>{if(!localStorage.getItem("token")){const e=window.location.pathname,t=window.location.search;window.location.replace(`/login?previouspage=${e+t}`)}})(),(()=>{switch(window.location.pathname){case"/":case"/cart/":case"/product/detail/":case"/product/list/":e("admin register login account logout");break;case"/account/orders/":case"/account/security/":case"/account/signout/":case"/admin/orders/":case"/admin/users/":case"/order/complete/":case"/order/":case"/product/add/":e("admin account logout");break;case"/account/":e("admin logout");break;case"/admin/":e("account logout");break;case"/category/add/":e("admin account productAdd logout");break;case"/login/":e("register");break;case"/register/":e("login")}})(),async function(){S=await async function(e,t=""){const o=`${e}/${t}`;console.log(`%cGET 요청: ${o} `,"color: #a25cd1;");const a=await fetch(o,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!a.ok){const e=await a.json(),{reason:t}=e;throw new Error(t)}return await a.json()}("/api/user");const{fullName:e,email:a,address:c,phoneNumber:d,isOAuth:l}=S;if(S.password="",t.innerText=`회원정보 관리 (${a})`,o.value=e,c){const{postalCode:e,address1:t,address2:o}=c;s.value=e,u.value=t,i.value=o}else S.address={postalCode:"",address1:"",address2:""};d&&(m.value=d),n.value="",k(),console.log({isOAuth:l}),l&&(r.setAttribute("disabled",""),r.classList.add("disabled"))}(),a.addEventListener("change",w),r.addEventListener("change",w),l.addEventListener("change",w),g.addEventListener("change",w),d.addEventListener("click",A),p.addEventListener("click",E),b.addEventListener("click",N),h.addEventListener("click",N),document.addEventListener("keydown",I),y.addEventListener("click",q)})();