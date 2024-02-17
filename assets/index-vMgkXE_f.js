(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const He=(e,t)=>e===t,ze=Symbol("solid-track"),ie={equals:He};let Pe=Ie;const U=1,re=2,Le={owned:null,cleanups:null,context:null,owner:null};var k=null;let ae=null,_=null,P=null,W=null,ue=0;function te(e,t){const n=_,i=k,r=e.length===0,o=t===void 0?i:t,l=r?Le:{owned:null,cleanups:null,context:o?o.context:null,owner:o},s=r?e:()=>e(()=>R(()=>fe(l)));k=l,_=null;try{return Y(s,!0)}finally{_=n,k=i}}function L(e,t){t=t?Object.assign({},ie,t):ie;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=r=>(typeof r=="function"&&(r=r(n.value)),Ne(n,r));return[Me.bind(n),i]}function F(e,t,n){const i=be(e,t,!1,U);V(i)}function Oe(e,t,n){Pe=Ke;const i=be(e,t,!1,U);(!n||!n.render)&&(i.user=!0),W?W.push(i):V(i)}function G(e,t,n){n=n?Object.assign({},ie,n):ie;const i=be(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,V(i),Me.bind(i)}function R(e){if(_===null)return e();const t=_;_=null;try{return e()}finally{_=t}}function Fe(e){Oe(()=>R(e))}function Je(e){return k===null||(k.cleanups===null?k.cleanups=[e]:k.cleanups.push(e)),e}function Me(){if(this.sources&&this.state)if(this.state===U)V(this);else{const e=P;P=null,Y(()=>se(this),!1),P=e}if(_){const e=this.observers?this.observers.length:0;_.sources?(_.sources.push(this),_.sourceSlots.push(e)):(_.sources=[this],_.sourceSlots=[e]),this.observers?(this.observers.push(_),this.observerSlots.push(_.sources.length-1)):(this.observers=[_],this.observerSlots=[_.sources.length-1])}return this.value}function Ne(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&Y(()=>{for(let r=0;r<e.observers.length;r+=1){const o=e.observers[r],l=ae&&ae.running;l&&ae.disposed.has(o),(l?!o.tState:!o.state)&&(o.pure?P.push(o):W.push(o),o.observers&&je(o)),l||(o.state=U)}if(P.length>1e6)throw P=[],new Error},!1)),t}function V(e){if(!e.fn)return;fe(e);const t=ue;Ge(e,e.value,t)}function Ge(e,t,n){let i;const r=k,o=_;_=k=e;try{i=e.fn(t)}catch(l){return e.pure&&(e.state=U,e.owned&&e.owned.forEach(fe),e.owned=null),e.updatedAt=n+1,Be(l)}finally{_=o,k=r}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ne(e,i):e.value=i,e.updatedAt=n)}function be(e,t,n,i=U,r){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:k,context:k?k.context:null,pure:n};return k===null||k!==Le&&(k.owned?k.owned.push(o):k.owned=[o]),o}function oe(e){if(e.state===0)return;if(e.state===re)return se(e);if(e.suspense&&R(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ue);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===U)V(e);else if(e.state===re){const i=P;P=null,Y(()=>se(e,t[0]),!1),P=i}}function Y(e,t){if(P)return e();let n=!1;t||(P=[]),W?n=!0:W=[],ue++;try{const i=e();return qe(n),i}catch(i){n||(W=null),P=null,Be(i)}}function qe(e){if(P&&(Ie(P),P=null),e)return;const t=W;W=null,t.length&&Y(()=>Pe(t),!1)}function Ie(e){for(let t=0;t<e.length;t++)oe(e[t])}function Ke(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:oe(i)}for(t=0;t<n;t++)oe(e[t])}function se(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const r=i.state;r===U?i!==t&&(!i.updatedAt||i.updatedAt<ue)&&oe(i):r===re&&se(i,t)}}}function je(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=re,n.pure?P.push(n):W.push(n),n.observers&&je(n))}}function fe(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const o=r.pop(),l=n.observerSlots.pop();i<r.length&&(o.sourceSlots[l]=i,r[i]=o,n.observerSlots[i]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)fe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Qe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Be(e,t=k){throw Qe(e)}const Ve=Symbol("fallback");function we(e){for(let t=0;t<e.length;t++)e[t]()}function Ye(e,t,n={}){let i=[],r=[],o=[],l=0,s=t.length>1?[]:null;return Je(()=>we(o)),()=>{let u=e()||[],d,c;return u[ze],R(()=>{let v=u.length,f,p,w,C,S,a,x,A,E;if(v===0)l!==0&&(we(o),o=[],i=[],r=[],l=0,s&&(s=[])),n.fallback&&(i=[Ve],r[0]=te(g=>(o[0]=g,n.fallback())),l=1);else if(l===0){for(r=new Array(v),c=0;c<v;c++)i[c]=u[c],r[c]=te(y);l=v}else{for(w=new Array(v),C=new Array(v),s&&(S=new Array(v)),a=0,x=Math.min(l,v);a<x&&i[a]===u[a];a++);for(x=l-1,A=v-1;x>=a&&A>=a&&i[x]===u[A];x--,A--)w[A]=r[x],C[A]=o[x],s&&(S[A]=s[x]);for(f=new Map,p=new Array(A+1),c=A;c>=a;c--)E=u[c],d=f.get(E),p[c]=d===void 0?-1:d,f.set(E,c);for(d=a;d<=x;d++)E=i[d],c=f.get(E),c!==void 0&&c!==-1?(w[c]=r[d],C[c]=o[d],s&&(S[c]=s[d]),c=p[c],f.set(E,c)):o[d]();for(c=a;c<v;c++)c in w?(r[c]=w[c],o[c]=C[c],s&&(s[c]=S[c],s[c](c))):r[c]=te(y);r=r.slice(0,l=v),i=u.slice(0)}return r});function y(v){if(o[c]=v,s){const[f,p]=L(c);return s[c]=p,t(u[c],f)}return t(u[c])}}}function D(e,t){return R(()=>e(t||{}))}const Ze=e=>`Stale read from <${e}>.`;function he(e){const t="fallback"in e&&{fallback:()=>e.fallback};return G(Ye(()=>e.each,e.children,t||void 0))}function et(e){const t=e.keyed,n=G(()=>e.when,void 0,{equals:(i,r)=>t?i===r:!i==!r});return G(()=>{const i=n();if(i){const r=e.children;return typeof r=="function"&&r.length>0?R(()=>r(t?i:()=>{if(!R(n))throw Ze("Show");return e.when})):r}return e.fallback},void 0,void 0)}function tt(e,t,n){let i=n.length,r=t.length,o=i,l=0,s=0,u=t[r-1].nextSibling,d=null;for(;l<r||s<o;){if(t[l]===n[s]){l++,s++;continue}for(;t[r-1]===n[o-1];)r--,o--;if(r===l){const c=o<i?s?n[s-1].nextSibling:n[o-s]:u;for(;s<o;)e.insertBefore(n[s++],c)}else if(o===s)for(;l<r;)(!d||!d.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[o-1]&&n[s]===t[r-1]){const c=t[--r].nextSibling;e.insertBefore(n[s++],t[l++].nextSibling),e.insertBefore(n[--o],c),t[r]=n[o]}else{if(!d){d=new Map;let y=s;for(;y<o;)d.set(n[y],y++)}const c=d.get(t[l]);if(c!=null)if(s<c&&c<o){let y=l,v=1,f;for(;++y<r&&y<o&&!((f=d.get(t[y]))==null||f!==c+v);)v++;if(v>c-s){const p=t[l];for(;s<c;)e.insertBefore(n[s++],p)}else e.replaceChild(n[s++],t[l++])}else l++;else t[l++].remove()}}}const pe="_$DX_DELEGATE";function nt(e,t,n,i={}){let r;return te(o=>{r=o,t===document?e():j(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{r(),t.textContent=""}}function q(e,t,n){let i;const r=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},o=t?()=>R(()=>document.importNode(i||(i=r()),!0)):()=>(i||(i=r())).cloneNode(!0);return o.cloneNode=o,o}function $e(e,t=window.document){const n=t[pe]||(t[pe]=new Set);for(let i=0,r=e.length;i<r;i++){const o=e[i];n.has(o)||(n.add(o),t.addEventListener(o,rt))}}function X(e,t){t==null?e.removeAttribute("class"):e.className=t}function le(e,t,n,i){if(i)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=o=>r.call(e,n[1],o))}else e.addEventListener(t,n)}function it(e,t,n){return R(()=>e(t,n))}function j(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return ce(e,t,i,n);F(r=>ce(e,t(),r,n),i)}function rt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const i=n[t];if(i&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?i.call(n,r,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function ce(e,t,n,i,r){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),l){let s=n[0];s&&s.nodeType===3?s.data=t:s=document.createTextNode(t),n=J(e,n,i,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||o==="boolean")n=J(e,n,i);else{if(o==="function")return F(()=>{let s=t();for(;typeof s=="function";)s=s();n=ce(e,s,n,i)}),()=>n;if(Array.isArray(t)){const s=[],u=n&&Array.isArray(n);if(me(s,t,n,r))return F(()=>n=ce(e,s,n,i,!0)),()=>n;if(s.length===0){if(n=J(e,n,i),l)return n}else u?n.length===0?_e(e,s,i):tt(e,n,s):(n&&J(e),_e(e,s));n=s}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=J(e,n,i,t);J(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function me(e,t,n,i){let r=!1;for(let o=0,l=t.length;o<l;o++){let s=t[o],u=n&&n[o],d;if(!(s==null||s===!0||s===!1))if((d=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))r=me(e,s,u)||r;else if(d==="function")if(i){for(;typeof s=="function";)s=s();r=me(e,Array.isArray(s)?s:[s],Array.isArray(u)?u:[u])||r}else e.push(s),r=!0;else{const c=String(s);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return r}function _e(e,t,n=null){for(let i=0,r=t.length;i<r;i++)e.insertBefore(t[i],n)}function J(e,t,n,i){if(n===void 0)return e.textContent="";const r=i||document.createTextNode("");if(t.length){let o=!1;for(let l=t.length-1;l>=0;l--){const s=t[l];if(r!==s){const u=s.parentNode===e;!o&&!l?u?e.replaceChild(r,s):e.insertBefore(r,n):u&&s.remove()}else o=!0}}else e.insertBefore(r,n);return[r]}var ee=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ot(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var st="Expected a function",Se=NaN,lt="[object Symbol]",ct=/^\s+|\s+$/g,ut=/^[-+]0x[0-9a-f]+$/i,ft=/^0b[01]+$/i,at=/^0o[0-7]+$/i,dt=parseInt,ht=typeof ee=="object"&&ee&&ee.Object===Object&&ee,mt=typeof self=="object"&&self&&self.Object===Object&&self,gt=ht||mt||Function("return this")(),vt=Object.prototype,bt=vt.toString,$t=Math.max,yt=Math.min,de=function(){return gt.Date.now()};function wt(e,t,n){var i,r,o,l,s,u,d=0,c=!1,y=!1,v=!0;if(typeof e!="function")throw new TypeError(st);t=Te(t)||0,ge(n)&&(c=!!n.leading,y="maxWait"in n,o=y?$t(Te(n.maxWait)||0,t):o,v="trailing"in n?!!n.trailing:v);function f(g){var O=i,M=r;return i=r=void 0,d=g,l=e.apply(M,O),l}function p(g){return d=g,s=setTimeout(S,t),c?f(g):l}function w(g){var O=g-u,M=g-d,H=t-O;return y?yt(H,o-M):H}function C(g){var O=g-u,M=g-d;return u===void 0||O>=t||O<0||y&&M>=o}function S(){var g=de();if(C(g))return a(g);s=setTimeout(S,w(g))}function a(g){return s=void 0,v&&i?f(g):(i=r=void 0,l)}function x(){s!==void 0&&clearTimeout(s),d=0,i=u=r=s=void 0}function A(){return s===void 0?l:a(de())}function E(){var g=de(),O=C(g);if(i=arguments,r=this,u=g,O){if(s===void 0)return p(u);if(y)return s=setTimeout(S,t),f(u)}return s===void 0&&(s=setTimeout(S,t)),l}return E.cancel=x,E.flush=A,E}function ge(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function pt(e){return!!e&&typeof e=="object"}function _t(e){return typeof e=="symbol"||pt(e)&&bt.call(e)==lt}function Te(e){if(typeof e=="number")return e;if(_t(e))return Se;if(ge(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=ge(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(ct,"");var n=ft.test(e);return n||at.test(e)?dt(e.slice(2),n?2:8):ut.test(e)?Se:+e}var St=wt;const Tt=ot(St);function De(e,t){const n=Math.floor(e),i=Math.floor((e-n)*60);return n&&i||t!=null&&t.full?`${n}h ${i}m`:n===0?`${i}m`:`${n}h`}function We(e,t){const n=Math.floor(e),i=Math.floor((e-n)*60),r=n.toString().padStart(2,"0"),o=i.toString().padStart(2,"0");if(t!=null&&t.seconds){const s=Math.floor((e-n-i/60)*60*60).toString().padStart(2,"0");return`${r}:${o}:${s}`}else return`${r}:${o}`}const kt="_block_1gr8m_1",xt="_moving_1gr8m_13",Ct="_handleTarget_1gr8m_17",At="_handle_1gr8m_17",Et="_resizing_1gr8m_35",Pt="_time_1gr8m_42",Lt="_name_1gr8m_43",z={block:kt,moving:xt,handleTarget:Ct,handle:At,resizing:Et,time:Pt,name:Lt},Ot=q("<div><span></span><div><div></div></div><span>");function ke(e,t){return Math.round(e/t)*t}function Mt(e){const[t,n]=L(!1),[i,r]=L(!1),[o,l]=L({startPos:0,startX:0}),[s,u]=L({startWidth:0,startX:0});function d(f){l({startPos:e.pos,startX:f.clientX}),n(!0),e.onStartChange()}function c(f){f.stopPropagation(),u({startWidth:e.width,startX:f.clientX}),r(!0),e.onStartChange()}function y(f){if(t()){const{startPos:p,startX:w}=o(),C=Math.min(e.maxPos,Math.max(0,p+f.clientX-w));e.onChange(ke(C,e.step),e.width)}else if(i()){const{startWidth:p,startX:w}=s(),C=Math.min(e.maxWidth,Math.max(e.step,p+f.clientX-w));e.onChange(e.pos,ke(C,e.step))}}function v(){n(!1),r(!1)}return window.addEventListener("pointerup",v),window.addEventListener("pointermove",y),(()=>{const f=Ot(),p=f.firstChild,w=p.nextSibling,C=w.firstChild,S=w.nextSibling;return le(f,"dblclick",e.onRemove,!0),le(f,"pointermove",e.onHover,!0),f.$$pointerdown=d,j(p,()=>e.name),j(f,(()=>{const a=G(()=>e.duration>.25);return()=>a()?De(e.duration):""})(),w),w.$$pointerdown=a=>a.stopPropagation(),C.$$pointerdown=c,j(S,()=>We(e.start)),F(a=>{const x=`${z.block} ${t()?z.moving:""} ${i()?z.resizing:""}`,A=`${e.pos}px`,E=`${e.width}px`,g=e.color,O=z.name,M=z.handleTarget,H=z.handle,K=z.time;return x!==a._v$&&X(f,a._v$=x),A!==a._v$2&&((a._v$2=A)!=null?f.style.setProperty("left",A):f.style.removeProperty("left")),E!==a._v$3&&((a._v$3=E)!=null?f.style.setProperty("width",E):f.style.removeProperty("width")),g!==a._v$4&&((a._v$4=g)!=null?f.style.setProperty("background-color",g):f.style.removeProperty("background-color")),O!==a._v$5&&X(p,a._v$5=O),M!==a._v$6&&X(w,a._v$6=M),H!==a._v$7&&X(C,a._v$7=H),K!==a._v$8&&X(S,a._v$8=K),a},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0,_v$8:void 0}),f})()}$e(["pointerdown","pointermove","dblclick"]);const Nt="_timelineContainer_o0zof_1",It="_timeline_o0zof_1",jt="_tick_o0zof_14",Bt="_nowLine_o0zof_27",ne={timelineContainer:Nt,timeline:It,tick:jt,nowLine:Bt},Dt=q("<div>"),Wt=q("<div><div></div><div></div><div></div><div></div><form><input></form><button>duplicate"),Rt=q("<div><button>confirm</button><button>cancel"),Xt=q("<button>delete"),xe=["hsl(0, 60%, 30%)","hsl(60, 60%, 30%)","hsl(120, 60%, 30%)","hsl(180, 60%, 30%)","hsl(240, 60%, 30%)","hsl(300, 60%, 30%)"];let Ce=0;function Ae(e){return(()=>{const t=Dt();return j(t,()=>e.hour),F(n=>{const i=`${ne.tick} ${e.class?e.class:""}`,r=`${e.pos}px`;return i!==n._v$&&X(t,n._v$=i),r!==n._v$2&&((n._v$2=r)!=null?t.style.setProperty("left",r):t.style.removeProperty("left")),n},{_v$:void 0,_v$2:void 0}),t})()}function Ee(e){return Math.round(e*4)/4}function Ut(e){return Math.floor(e*4)/4}function Ht(e){let t;const[n,i]=L(0),[r,o]=L(0),[l,s]=L(),[u,d]=L(0),[c,y]=L(""),[v,f]=L(!1),[p,w]=e.blocks,C=()=>e.endHour-e.startHour,S=()=>n()/C();function a(){i(t.clientWidth),M()}window.addEventListener("resize",a),Fe(a);function x(m){w(h=>[...h.filter(T=>T!==m),m])}function A(m,h,$){const[T,N]=m;N({...T(),start:Ee(h/S()),duration:Ee($/S())}),M()}function E(m){w(h=>h.filter($=>$!==m))}function g(m){const[h]=m,$=()=>h().start*S(),T=()=>h().duration*S();return D(Mt,{get id(){return h().id},get step(){return S()/4},get name(){return h().name},get start(){return h().start},get duration(){return h().duration},get color(){return h().color},get pos(){return $()},get width(){return T()},get maxPos(){return n()-T()},get maxWidth(){return n()-$()},onStartChange:()=>x(m),onHover:()=>x(m),onChange:(N,B)=>A(m,N,B),onRemove:()=>E(m)})}function O(m){let h;for(const $ of p()){const[T]=$;T().start>m&&(!h||T().start<h.start)&&(h=T())}return h}function M(){const m=new Date,h=m.getHours(),$=m.getMinutes(),T=m.getSeconds(),N=h+$/60+T/60/60,B=N/24*n();o(B),d(N),s(O(N))}setInterval(M,1e3);function H(m){let[,h,$]=m.trim().match(/(.+) ([0-9.]+)/i)||[];h||(h=m.trim());const T=$!=null&&$.trim()?$==="15"?.25:$==="30"?.5:parseFloat($):1;return[h,T]}function K(m,h){if(!m)return;const[$,T]=H(m),N=Ce++,B=xe[N%xe.length];w(Z=>[...Z,L({id:Ce,name:$,start:h,duration:T,color:B})])}function Re(m=0){K(prompt(),m)}return(()=>{const m=Wt(),h=m.firstChild,$=h.nextSibling,T=$.nextSibling,N=T.nextSibling,B=N.nextSibling,Z=B.firstChild,Xe=B.nextSibling;h.$$pointerdown=b=>{b.target===b.currentTarget&&b.buttons===2&&Re(Ut(b.offsetX/n()*24))},h.$$contextmenu=b=>b.preventDefault();const ye=t;return typeof ye=="function"?it(ye,h):t=h,j(h,D(et,{get when(){return n()!==0},get children(){return[D(he,{get each(){return Array.from({length:C()})},children:(b,I)=>D(Ae,{get hour(){return I()},get pos(){return I()*S()}})}),D(he,{get each(){return p()},children:g}),D(Ae,{get pos(){return r()},get class(){return ne.nowLine}})]}})),j($,()=>We(u(),{seconds:!0})),j(T,()=>{var b;return(b=l())==null?void 0:b.name}),j(N,(()=>{const b=G(()=>!!l());return()=>b()?De(l().start-u(),{full:!0}):""})()),B.addEventListener("submit",b=>{b.preventDefault(),K(c(),0),y("")}),Z.addEventListener("change",b=>y(b.target.value)),le(Xe,"click",e.onDuplicate,!0),j(m,(()=>{const b=G(()=>!!v());return()=>b()?(()=>{const I=Rt(),Q=I.firstChild,Ue=Q.nextSibling;return le(Q,"click",e.onDelete,!0),Ue.$$click=()=>f(!1),I})():(()=>{const I=Xt();return I.$$click=()=>f(!0),I})()})(),null),F(b=>{const I=ne.timelineContainer,Q=ne.timeline;return I!==b._v$3&&X(m,b._v$3=I),Q!==b._v$4&&X(h,b._v$4=Q),b},{_v$3:void 0,_v$4:void 0}),F(()=>Z.value=c()),m})()}$e(["contextmenu","pointerdown","click"]);const zt=q("<button>Add");function Ft(e){return e.map(t=>L(t))}function ve(e){return{blocks:L(Ft(e))}}function Jt(){const t=new URLSearchParams(window.location.search).get("timelines");return t?JSON.parse(atob(t)).map(i=>ve(i.blocks)):[]}function Gt(e){const t=e.map(n=>{const[i]=n.blocks;return{blocks:i().map(([o])=>o())}});return JSON.stringify(t)}const qt=Tt(e=>{history.replaceState({},"",`?timelines=${e}`)},100);function Kt(){const e=Jt(),[t,n]=L(e);function i(){n([...t(),ve([])])}function r(l){n(t().filter(s=>s!==l))}function o(l){const[s]=l.blocks,u=s().map(([c])=>({...c()})),d=ve(u);n([...t(),d])}return Oe(()=>{const l=encodeURIComponent(btoa(Gt(t())));qt(l)}),[(()=>{const l=zt();return l.$$click=i,l})(),D(he,{get each(){return t()},children:l=>D(Ht,{startHour:0,endHour:24,get blocks(){return l.blocks},onDelete:()=>r(l),onDuplicate:()=>o(l)})})]}$e(["click"]);const Qt=document.getElementById("root");nt(()=>D(Kt,{}),Qt);
