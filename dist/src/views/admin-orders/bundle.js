(()=>{var t={757:(t,e,n)=>{t.exports=n(666)},666:t=>{var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new T(r||[]);return a._invoke=function(t,e,n){var r=f;return function(o,a){if(r===h)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw a;return _()}for(n.method=o,n.arg=a;;){var i=n.delegate;if(i){var c=S(i,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var u=l(t,e,n);if("normal"===u.type){if(r=n.done?p:d,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=p,n.method="throw",n.arg=u.arg)}}}(t,n,i),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",v={};function y(){}function m(){}function g(){}var w={};u(w,a,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(O([])));x&&x!==n&&r.call(x,a)&&(w=x);var E=g.prototype=y.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function n(o,a,i,c){var u=l(t[o],t,a);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=l(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,v;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function O(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:_}}function _(){return{value:e,done:!0}}return m.prototype=g,u(E,"constructor",g),u(g,"constructor",m),m.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},k(L.prototype),u(L.prototype,i,(function(){return this})),t.AsyncIterator=L,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new L(s(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(E),u(E,c,"Generator"),u(E,a,(function(){return this})),u(E,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(A),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),A(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;A(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:O(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function e(e){return function(){var n=this,r=arguments;return new Promise((function(o,a){var i=e.apply(n,r);function c(e){t(i,o,a,c,u,"next",e)}function u(e){t(i,o,a,c,u,"throw",e)}c(void 0)}))}}var r=n(757),o=n.n(r);function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw a}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var c=function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},u=function(){var t=e(o().mark((function t(){var e,n,r,a,i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return window.document.body.style.display="none",(e=localStorage.getItem("token"))||(n=window.location.pathname,r=window.location.search,window.location.replace("/login?previouspage=".concat(n+r))),t.next=5,fetch("/api/admin/check",{headers:{Authorization:"Bearer ".concat(e)}});case 5:return a=t.sent,t.next=8,a.json();case 8:if(i=t.sent,"success"!==i.result){t.next=15;break}return window.document.body.style.display="block",t.abrupt("return");case 15:alert("관리자 전용 페이지입니다."),window.location.replace("/");case 17:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function s(t){return l.apply(this,arguments)}function l(){return l=e(o().mark((function t(e){var n,r,a,i,c,u,s=arguments;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:"",r="".concat(e,"/").concat(n),console.log("%cGET 요청: ".concat(r," "),"color: #a25cd1;"),t.next=5,fetch(r,{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 5:if((a=t.sent).ok){t.next=12;break}return t.next=9,a.json();case 9:throw i=t.sent,c=i.reason,new Error(c);case 12:return t.next=14,a.json();case 14:return u=t.sent,t.abrupt("return",u);case 16:case"end":return t.stop()}}),t)}))),l.apply(this,arguments)}function f(t){return d.apply(this,arguments)}function d(){return d=e(o().mark((function t(e){var n,r,a,i,c,u,s,l,f=arguments;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=f.length>1&&void 0!==f[1]?f[1]:"",r=f.length>2?f[2]:void 0,a="".concat(e,"/").concat(n),i=JSON.stringify(r),console.log("%cPATCH 요청: ".concat(a),"color: #059c4b;"),console.log("%cPATCH 요청 데이터: ".concat(i),"color: #059c4b;"),t.next=8,fetch(a,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:i});case 8:if((c=t.sent).ok){t.next=15;break}return t.next=12,c.json();case 12:throw u=t.sent,s=u.reason,new Error(s);case 15:return t.next=17,c.json();case 17:return l=t.sent,t.abrupt("return",l);case 19:case"end":return t.stop()}}),t)}))),d.apply(this,arguments)}function h(t){return p.apply(this,arguments)}function p(){return p=e(o().mark((function t(e){var n,r,a,i,c,u,s,l,f=arguments;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=f.length>1&&void 0!==f[1]?f[1]:"",r=f.length>2&&void 0!==f[2]?f[2]:{},a="".concat(e,"/").concat(n),i=JSON.stringify(r),console.log("DELETE 요청 ".concat(a)),console.log("DELETE 요청 데이터: ".concat(i)),t.next=8,fetch(a,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:i});case 8:if((c=t.sent).ok){t.next=15;break}return t.next=12,c.json();case 12:throw u=t.sent,s=u.reason,new Error(s);case 15:return t.next=17,c.json();case 17:return l=t.sent,t.abrupt("return",l);case 19:case"end":return t.stop()}}),t)}))),p.apply(this,arguments)}function v(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var m,g=document.querySelector("#ordersContainer"),w=document.querySelector("#modal"),b=document.querySelector("#modalBackground"),x=document.querySelector("#modalCloseButton"),E=document.querySelector("#deleteCompleteButton"),k=document.querySelector("#deleteCancelButton");function L(){return(L=e(o().mark((function t(){var n,r,a,i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s("/api/orderlist/all");case 2:n=t.sent,r=v(n);try{for(i=function(){var t=a.value,n=t._id,r=t.totalPrice,i=t.createdAt,u=t.summaryTitle,s=t.status,l=i.split("T")[0];g.insertAdjacentHTML("beforeend",'\n        <div class="columns orders-item" id="order-'.concat(n,'">\n          <div class="column is-2">').concat(l,'</div>\n          <div class="column is-4 order-summary">').concat(u,'</div>\n          <div class="column is-2">').concat(c(r),'</div>\n          <div class="column is-2">\n            <div class="select" >\n              <select id="statusSelectBox-').concat(n,'">\n                <option \n                  class="has-background-danger-light has-text-danger"\n                  ').concat("상품 준비중"===s?"selected":"",' \n                  value="상품 준비중">\n                  상품 준비중\n                </option>\n                <option \n                  class="has-background-primary-light has-text-primary"\n                  ').concat("상품 배송중"===s?"selected":"",' \n                  value="상품 배송중">\n                  상품 배송중\n                </option>\n                <option \n                  class="has-background-grey-light"\n                  ').concat("배송완료"===s?"selected":"",' \n                  value="배송완료">\n                  배송완료\n                </option>\n              </select>\n            </div>\n          </div>\n          <div class="column is-2">\n            <button class="button" id="deleteButton-').concat(n,'" >주문 취소</button>\n          </div>\n        </div>\n      '));var d=document.querySelector("#statusSelectBox-".concat(n)),h=document.querySelector("#deleteButton-".concat(n)),p=d.selectedIndex;d.className=d[p].className,d.addEventListener("change",e(o().mark((function t(){var e,r,a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.value,r={status:e},a=d.selectedIndex,d.className=d[a].className,t.next=6,f("/api/orders",n,r);case 6:case"end":return t.stop()}}),t)})))),h.addEventListener("click",(function(){m=n,T()}))},r.s();!(a=r.n()).done;)i()}catch(t){r.e(t)}finally{r.f()}case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function S(t){return j.apply(this,arguments)}function j(){return(j=e(o().mark((function t(e){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,h("/api/orders",m);case 4:alert("주문 정보가 삭제되었습니다."),document.querySelector("#order-".concat(m)).remove(),m="",O(),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),alert("주문정보 삭제 과정에서 오류가 발생하였습니다: ".concat(t.t0));case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}function A(){m="",O()}function T(){w.classList.add("is-active")}function O(){w.classList.remove("is-active")}function _(t){27===t.keyCode&&O()}u(),function(t){var e=t.split(" "),n=document.querySelector("#navbar"),r=!!localStorage.getItem("token"),o={register:'<li><a href="/register">회원가입</a></li>',login:'<li><a href="/login">로그인</a></li>'},i={account:'<li><a href="/account">계정관리</a></li>',admin:'<li><a href="/admin">페이지관리</a></li>',logout:'<li><a href="#" id="logout">로그아웃</a></li>',productAdd:'<li><a href="/product/add">제품 추가</a></li>',categoryAdd:'<li><a href="/category/add">카테고리 추가</a></li>'},c=document.createElement("script");c.innerText="\n      const logoutElem = document.querySelector('#logout'); \n      \n      if (logoutElem) {\n        logoutElem.addEventListener('click', () => {\n          localStorage.removeItem('token');\n          window.location.href = '/';\n        });\n      }\n  ";var u,s="",l=a(e);try{for(l.s();!(u=l.n()).done;){var f,d,h=u.value;s+=r?null!==(f=i[h])&&void 0!==f?f:"":null!==(d=o[h])&&void 0!==d?d:""}}catch(t){l.e(t)}finally{l.f()}n.insertAdjacentHTML("afterbegin",s),n.after(c)}("admin account logout"),function(){L.apply(this,arguments)}(),b.addEventListener("click",O),x.addEventListener("click",O),document.addEventListener("keydown",_),E.addEventListener("click",S),k.addEventListener("click",A)})()})();