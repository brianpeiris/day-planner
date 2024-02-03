(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const Nt=(t,e)=>t===e,Ot=Symbol("solid-track"),Y={equals:Nt};let $t=kt;const z=1,Z=2,wt={owned:null,cleanups:null,context:null,owner:null};var _=null;let it=null,y=null,S=null,T=null,rt=0;function Q(t,e){const n=y,r=_,o=t.length===0,s=e===void 0?r:e,l=o?wt:{owned:null,cleanups:null,context:s?s.context:null,owner:s},i=o?t:()=>t(()=>X(()=>ot(l)));_=l,y=null;try{return K(i,!0)}finally{y=n,_=r}}function C(t,e){e=e?Object.assign({},Y,e):Y;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),xt(n,o));return[At.bind(n),r]}function W(t,e,n){const r=at(t,e,!1,z);F(r)}function St(t,e,n){$t=zt;const r=at(t,e,!1,z);(!n||!n.render)&&(r.user=!0),T?T.push(r):F(r)}function U(t,e,n){n=n?Object.assign({},Y,n):Y;const r=at(t,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,F(r),At.bind(r)}function X(t){if(y===null)return t();const e=y;y=null;try{return t()}finally{y=e}}function Tt(t){St(()=>X(t))}function Xt(t){return _===null||(_.cleanups===null?_.cleanups=[t]:_.cleanups.push(t)),t}function At(){if(this.sources&&this.state)if(this.state===z)F(this);else{const t=S;S=null,K(()=>et(this),!1),S=t}if(y){const t=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(t)):(y.sources=[this],y.sourceSlots=[t]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return this.value}function xt(t,e,n){let r=t.value;return(!t.comparator||!t.comparator(r,e))&&(t.value=e,t.observers&&t.observers.length&&K(()=>{for(let o=0;o<t.observers.length;o+=1){const s=t.observers[o],l=it&&it.running;l&&it.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?S.push(s):T.push(s),s.observers&&Ct(s)),l||(s.state=z)}if(S.length>1e6)throw S=[],new Error},!1)),e}function F(t){if(!t.fn)return;ot(t);const e=rt;Dt(t,t.value,e)}function Dt(t,e,n){let r;const o=_,s=y;y=_=t;try{r=t.fn(e)}catch(l){return t.pure&&(t.state=z,t.owned&&t.owned.forEach(ot),t.owned=null),t.updatedAt=n+1,Pt(l)}finally{y=s,_=o}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?xt(t,r):t.value=r,t.updatedAt=n)}function at(t,e,n,r=z,o){const s={fn:t,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:_,context:_?_.context:null,pure:n};return _===null||_!==wt&&(_.owned?_.owned.push(s):_.owned=[s]),s}function tt(t){if(t.state===0)return;if(t.state===Z)return et(t);if(t.suspense&&X(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<rt);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===z)F(t);else if(t.state===Z){const r=S;S=null,K(()=>et(t,e[0]),!1),S=r}}function K(t,e){if(S)return t();let n=!1;e||(S=[]),T?n=!0:T=[],rt++;try{const r=t();return Bt(n),r}catch(r){n||(T=null),S=null,Pt(r)}}function Bt(t){if(S&&(kt(S),S=null),t)return;const e=T;T=null,e.length&&K(()=>$t(e),!1)}function kt(t){for(let e=0;e<t.length;e++)tt(t[e])}function zt(t){let e,n=0;for(e=0;e<t.length;e++){const r=t[e];r.user?t[n++]=r:tt(r)}for(e=0;e<n;e++)tt(t[e])}function et(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const r=t.sources[n];if(r.sources){const o=r.state;o===z?r!==e&&(!r.updatedAt||r.updatedAt<rt)&&tt(r):o===Z&&et(r,e)}}}function Ct(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=Z,n.pure?S.push(n):T.push(n),n.observers&&Ct(n))}}function ot(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),r=t.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),l=n.observerSlots.pop();r<o.length&&(s.sourceSlots[l]=r,o[r]=s,n.observerSlots[r]=l)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)ot(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function Ht(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Pt(t,e=_){throw Ht(t)}const qt=Symbol("fallback");function vt(t){for(let e=0;e<t.length;e++)t[e]()}function Wt(t,e,n={}){let r=[],o=[],s=[],l=0,i=e.length>1?[]:null;return Xt(()=>vt(s)),()=>{let c=t()||[],h,u;return c[Ot],X(()=>{let g=c.length,a,$,m,P,M,d,x,k,L;if(g===0)l!==0&&(vt(s),s=[],r=[],o=[],l=0,i&&(i=[])),n.fallback&&(r=[qt],o[0]=Q(D=>(s[0]=D,n.fallback())),l=1);else if(l===0){for(o=new Array(g),u=0;u<g;u++)r[u]=c[u],o[u]=Q(A);l=g}else{for(m=new Array(g),P=new Array(g),i&&(M=new Array(g)),d=0,x=Math.min(l,g);d<x&&r[d]===c[d];d++);for(x=l-1,k=g-1;x>=d&&k>=d&&r[x]===c[k];x--,k--)m[k]=o[x],P[k]=s[x],i&&(M[k]=i[x]);for(a=new Map,$=new Array(k+1),u=k;u>=d;u--)L=c[u],h=a.get(L),$[u]=h===void 0?-1:h,a.set(L,u);for(h=d;h<=x;h++)L=r[h],u=a.get(L),u!==void 0&&u!==-1?(m[u]=o[h],P[u]=s[h],i&&(M[u]=i[h]),u=$[u],a.set(L,u)):s[h]();for(u=d;u<g;u++)u in m?(o[u]=m[u],s[u]=P[u],i&&(i[u]=M[u],i[u](u))):o[u]=Q(A);o=o.slice(0,l=g),r=c.slice(0)}return o});function A(g){if(s[u]=g,i){const[a,$]=C(u);return i[u]=$,e(c[u],a)}return e(c[u])}}}function N(t,e){return X(()=>t(e||{}))}const It=t=>`Stale read from <${t}>.`;function lt(t){const e="fallback"in t&&{fallback:()=>t.fallback};return U(Wt(()=>t.each,t.children,e||void 0))}function jt(t){const e=t.keyed,n=U(()=>t.when,void 0,{equals:(r,o)=>e?r===o:!r==!o});return U(()=>{const r=n();if(r){const o=t.children;return typeof o=="function"&&o.length>0?X(()=>o(e?r:()=>{if(!X(n))throw It("Show");return t.when})):o}return t.fallback},void 0,void 0)}function Rt(t,e,n){let r=n.length,o=e.length,s=r,l=0,i=0,c=e[o-1].nextSibling,h=null;for(;l<o||i<s;){if(e[l]===n[i]){l++,i++;continue}for(;e[o-1]===n[s-1];)o--,s--;if(o===l){const u=s<r?i?n[i-1].nextSibling:n[s-i]:c;for(;i<s;)t.insertBefore(n[i++],u)}else if(s===i)for(;l<o;)(!h||!h.has(e[l]))&&e[l].remove(),l++;else if(e[l]===n[s-1]&&n[i]===e[o-1]){const u=e[--o].nextSibling;t.insertBefore(n[i++],e[l++].nextSibling),t.insertBefore(n[--s],u),e[o]=n[s]}else{if(!h){h=new Map;let A=i;for(;A<s;)h.set(n[A],A++)}const u=h.get(e[l]);if(u!=null)if(i<u&&u<s){let A=l,g=1,a;for(;++A<o&&A<s&&!((a=h.get(e[A]))==null||a!==u+g);)g++;if(g>u-i){const $=e[l];for(;i<u;)t.insertBefore(n[i++],$)}else t.replaceChild(n[i++],e[l++])}else l++;else e[l++].remove()}}}const gt="_$DX_DELEGATE";function Ut(t,e,n,r={}){let o;return Q(s=>{o=s,e===document?t():O(e,t(),e.firstChild?null:void 0,n)},r.owner),()=>{o(),e.textContent=""}}function st(t,e,n){let r;const o=()=>{const l=document.createElement("template");return l.innerHTML=t,n?l.content.firstChild.firstChild:l.content.firstChild},s=e?()=>X(()=>document.importNode(r||(r=o()),!0)):()=>(r||(r=o())).cloneNode(!0);return s.cloneNode=s,s}function ft(t,e=window.document){const n=e[gt]||(e[gt]=new Set);for(let r=0,o=t.length;r<o;r++){const s=t[r];n.has(s)||(n.add(s),e.addEventListener(s,Kt))}}function B(t,e){e==null?t.removeAttribute("class"):t.className=e}function ut(t,e,n,r){if(r)Array.isArray(n)?(t[`$$${e}`]=n[0],t[`$$${e}Data`]=n[1]):t[`$$${e}`]=n;else if(Array.isArray(n)){const o=n[0];t.addEventListener(e,n[0]=s=>o.call(t,n[1],s))}else t.addEventListener(e,n)}function Ft(t,e,n){return X(()=>t(e,n))}function O(t,e,n,r){if(n!==void 0&&!r&&(r=[]),typeof e!="function")return nt(t,e,r,n);W(o=>nt(t,e(),o,n),r)}function Kt(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[e];if(r&&!n.disabled){const o=n[`${e}Data`];if(o!==void 0?r.call(n,o,t):r.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function nt(t,e,n,r,o){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,l=r!==void 0;if(t=l&&n[0]&&n[0].parentNode||t,s==="string"||s==="number")if(s==="number"&&(e=e.toString()),l){let i=n[0];i&&i.nodeType===3?i.data=e:i=document.createTextNode(e),n=I(t,n,r,i)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||s==="boolean")n=I(t,n,r);else{if(s==="function")return W(()=>{let i=e();for(;typeof i=="function";)i=i();n=nt(t,i,n,r)}),()=>n;if(Array.isArray(e)){const i=[],c=n&&Array.isArray(n);if(ct(i,e,n,o))return W(()=>n=nt(t,i,n,r,!0)),()=>n;if(i.length===0){if(n=I(t,n,r),l)return n}else c?n.length===0?mt(t,i,r):Rt(t,n,i):(n&&I(t),mt(t,i));n=i}else if(e.nodeType){if(Array.isArray(n)){if(l)return n=I(t,n,r,e);I(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}}return n}function ct(t,e,n,r){let o=!1;for(let s=0,l=e.length;s<l;s++){let i=e[s],c=n&&n[s],h;if(!(i==null||i===!0||i===!1))if((h=typeof i)=="object"&&i.nodeType)t.push(i);else if(Array.isArray(i))o=ct(t,i,c)||o;else if(h==="function")if(r){for(;typeof i=="function";)i=i();o=ct(t,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||o}else t.push(i),o=!0;else{const u=String(i);c&&c.nodeType===3&&c.data===u?t.push(c):t.push(document.createTextNode(u))}}return o}function mt(t,e,n=null){for(let r=0,o=e.length;r<o;r++)t.insertBefore(e[r],n)}function I(t,e,n,r){if(n===void 0)return t.textContent="";const o=r||document.createTextNode("");if(e.length){let s=!1;for(let l=e.length-1;l>=0;l--){const i=e[l];if(o!==i){const c=i.parentNode===t;!s&&!l?c?t.replaceChild(o,i):t.insertBefore(o,n):c&&i.remove()}else s=!0}}else t.insertBefore(o,n);return[o]}function Lt(t,e){const n=Math.floor(t),r=Math.floor((t-n)*60);return n&&r||e!=null&&e.full?`${n}h ${r}m`:n===0?`${r}m`:`${n}h`}function Et(t,e){const n=Math.floor(t),r=Math.floor((t-n)*60),o=n.toString().padStart(2,"0"),s=r.toString().padStart(2,"0");if(e!=null&&e.seconds){const l=Math.floor((t-n-r/60)*60*60).toString().padStart(2,"0");return`${o}:${s}:${l}`}else return`${o}:${s}`}const Jt="_block_1gr8m_1",Gt="_moving_1gr8m_13",Qt="_handleTarget_1gr8m_17",Vt="_handle_1gr8m_17",Yt="_resizing_1gr8m_35",Zt="_time_1gr8m_42",te="_name_1gr8m_43",q={block:Jt,moving:Gt,handleTarget:Qt,handle:Vt,resizing:Yt,time:Zt,name:te},ee=st("<div><span></span><div><div></div></div><span>");function bt(t,e){return Math.round(t/e)*e}function ne(t){const[e,n]=C(!1),[r,o]=C(!1),[s,l]=C({startPos:0,startX:0}),[i,c]=C({startWidth:0,startX:0});function h(a){l({startPos:t.pos,startX:a.clientX}),n(!0),t.onStartChange()}function u(a){a.stopPropagation(),c({startWidth:t.width,startX:a.clientX}),o(!0),t.onStartChange()}function A(a){if(e()){const{startPos:$,startX:m}=s(),P=Math.min(t.maxPos,Math.max(0,$+a.clientX-m));t.onChange(bt(P,t.step),t.width)}else if(r()){const{startWidth:$,startX:m}=i(),P=Math.min(t.maxWidth,Math.max(t.step,$+a.clientX-m));t.onChange(t.pos,bt(P,t.step))}}function g(){n(!1),o(!1)}return window.addEventListener("pointerup",g),window.addEventListener("pointermove",A),(()=>{const a=ee(),$=a.firstChild,m=$.nextSibling,P=m.firstChild,M=m.nextSibling;return ut(a,"dblclick",t.onRemove,!0),ut(a,"pointermove",t.onHover,!0),a.$$pointerdown=h,O($,()=>t.name),O(a,(()=>{const d=U(()=>t.duration>.25);return()=>d()?Lt(t.duration):""})(),m),m.$$pointerdown=d=>d.stopPropagation(),P.$$pointerdown=u,O(M,()=>Et(t.start)),W(d=>{const x=`${q.block} ${e()?q.moving:""} ${r()?q.resizing:""}`,k=`${t.pos}px`,L=`${t.width}px`,D=q.name,J=q.handleTarget,j=q.handle,G=q.time;return x!==d._v$&&B(a,d._v$=x),k!==d._v$2&&((d._v$2=k)!=null?a.style.setProperty("left",k):a.style.removeProperty("left")),L!==d._v$3&&((d._v$3=L)!=null?a.style.setProperty("width",L):a.style.removeProperty("width")),D!==d._v$4&&B($,d._v$4=D),J!==d._v$5&&B(m,d._v$5=J),j!==d._v$6&&B(P,d._v$6=j),G!==d._v$7&&B(M,d._v$7=G),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0}),a})()}ft(["pointerdown","pointermove","dblclick"]);const re="_timelineContainer_o0zof_1",oe="_timeline_o0zof_1",se="_tick_o0zof_14",ie="_nowLine_o0zof_27",V={timelineContainer:re,timeline:oe,tick:se,nowLine:ie},le=st("<div>"),ue=st("<div><div></div><div></div><div></div><div></div><form><input></form><button>delete");let ce=0;function yt(t){return(()=>{const e=le();return O(e,()=>t.hour),W(n=>{const r=`${V.tick} ${t.class?t.class:""}`,o=`${t.pos}px`;return r!==n._v$&&B(e,n._v$=r),o!==n._v$2&&((n._v$2=o)!=null?e.style.setProperty("left",o):e.style.removeProperty("left")),n},{_v$:void 0,_v$2:void 0}),e})()}function _t(t){return Math.round(t*4)/4}function ae(t){return Math.floor(t*4)/4}function fe(t){let e;const[n,r]=C(0),[o,s]=C(0),[l,i]=C(),[c,h]=C(0),[u,A]=C(""),[g,a]=t.blocks,$=()=>t.endHour-t.startHour,m=()=>n()/$();function P(){r(e.clientWidth),D()}window.addEventListener("resize",P),Tt(P);function M(p){a(f=>[...f.filter(v=>v!==p),p])}function d(p,f,v){const[w,E]=p;E({...w(),start:_t(f/m()),duration:_t(v/m())}),D()}function x(p){a(f=>f.filter(v=>v!==p))}function k(p){const[f]=p,v=()=>f().start*m(),w=()=>f().duration*m();return N(ne,{get id(){return f().id},get step(){return m()/4},get name(){return f().name},get start(){return f().start},get duration(){return f().duration},get pos(){return v()},get width(){return w()},get maxPos(){return n()-w()},get maxWidth(){return n()-v()},onStartChange:()=>M(p),onHover:()=>M(p),onChange:(E,H)=>d(p,E,H),onRemove:()=>x(p)})}function L(p){let f;for(const v of g()){const[w]=v;w().start>p&&(!f||w().start<f.start)&&(f=w())}return f}function D(){const p=new Date,f=p.getHours(),v=p.getMinutes(),w=p.getSeconds(),E=f+v/60+w/60/60,H=E/24*n();s(H),h(E),i(L(E))}setInterval(D,1e3);function J(p){let[,f,v]=p.trim().match(/(.+) ([0-9.]+)/i)||[];f||(f=p.trim());const w=v!=null&&v.trim()?v==="15"?.25:v==="30"?.5:parseFloat(v):1;return[f,w]}function j(p,f){if(!p)return;const[v,w]=J(p);a(E=>[...E,C({id:ce++,name:v,start:f,duration:w})])}function G(p=0){j(prompt(),p)}return(()=>{const p=ue(),f=p.firstChild,v=f.nextSibling,w=v.nextSibling,E=w.nextSibling,H=E.nextSibling,dt=H.firstChild,Mt=H.nextSibling;f.$$pointerdown=b=>{b.target===b.currentTarget&&b.buttons===2&&G(ae(b.offsetX/n()*24))},f.$$contextmenu=b=>b.preventDefault();const pt=e;return typeof pt=="function"?Ft(pt,f):e=f,O(f,N(jt,{get when(){return n()!==0},get children(){return[N(lt,{get each(){return Array.from({length:$()})},children:(b,R)=>N(yt,{get hour(){return R()},get pos(){return R()*m()}})}),N(lt,{get each(){return g()},children:k}),N(yt,{get pos(){return o()},get class(){return V.nowLine}})]}})),O(v,()=>Et(c(),{seconds:!0})),O(w,()=>{var b;return(b=l())==null?void 0:b.name}),O(E,(()=>{const b=U(()=>!!l());return()=>b()?Lt(l().start-c(),{full:!0}):""})()),H.addEventListener("submit",b=>{b.preventDefault(),j(u(),0),A("")}),dt.addEventListener("change",b=>A(b.target.value)),ut(Mt,"click",t.onDelete,!0),W(b=>{const R=V.timelineContainer,ht=V.timeline;return R!==b._v$3&&B(p,b._v$3=R),ht!==b._v$4&&B(f,b._v$4=ht),b},{_v$3:void 0,_v$4:void 0}),W(()=>dt.value=u()),p})()}ft(["contextmenu","pointerdown","click"]);const de=st("<button>Add");function pe(){const t=(()=>{const l=new URLSearchParams(window.location.search).get("timelines");return l?JSON.parse(atob(l)).map(i=>({blocks:C(i.blocks.map(c=>C({id:c.id,name:c.name,start:c.start,duration:c.duration})))})):[]})(),[e,n]=C(t);function r(){n([...e(),{blocks:C([])}])}function o(){return JSON.stringify(e().map(l=>{const[i]=l.blocks;return{blocks:i().map(([c])=>c())}}))}function s(l){n(e().filter(i=>i!==l))}return St(()=>{history.replaceState({},"",`?timelines=${encodeURIComponent(btoa(o()))}`)}),[(()=>{const l=de();return l.$$click=r,l})(),N(lt,{get each(){return e()},children:l=>N(fe,{startHour:0,endHour:24,get blocks(){return l.blocks},onDelete:()=>s(l)})})]}ft(["click"]);const he=document.getElementById("root");Ut(()=>N(pe,{}),he);