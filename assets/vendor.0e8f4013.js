import{nextTick as e,inject as t,shallowRef as n,unref as r,computed as o,reactive as a,defineComponent as c,h as i,provide as s,ref as l,watch as u}from"https://cdn.jsdelivr.net/npm/vue@3.2.4/dist/vue.runtime.esm-browser.prod.js";const f=e=>"function"==typeof e,p=Object.prototype.toString,d=e=>{return"[object Object]"===(t=e,p.call(t));var t};function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=function e(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];if(!r.length)return t;var a=r.shift();if(d(t)&&d(a)){for(var c in a)d(a[c])?(t[c]||Object.assign(t,h({},c,{})),e(t[c],a[c])):Object.assign(t,h({},c,a[c]));return e.apply(void 0,[t].concat(r))}},y=function(){return"undefined"!=typeof window&&"undefined"!=typeof document},b=function(e){y()},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return b('Missing "appName" property inside the plugin options.',null==e.app_name),b('Missing "name" property in the route.',null==e.screen_name),e};function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=e.split("/"),r=t.split("/");return""===n[0]&&"/"===t[t.length-1]&&n.shift(),r.join("/")+n.join("/")}var O,k={},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={bootstrap:!0,onReady:null,onError:null,onBeforeTrack:null,onAfterTrack:null,pageTrackerTemplate:null,customResourceURL:"https://www.googletagmanager.com/gtag/js",customPreconnectOrigin:"https://www.googletagmanager.com",deferScriptLoad:!1,pageTrackerExcludedRoutes:[],pageTrackerEnabled:!0,enabled:!0,disableScriptLoad:!1,pageTrackerScreenviewEnabled:!1,appName:null,pageTrackerUseFullPath:!1,pageTrackerPrependBase:!0,pageTrackerSkipSamePath:!0,globalDataLayerName:"dataLayer",globalObjectName:"gtag",defaultGroupName:"default",includes:null,config:{id:null,params:{send_page_view:!1}}};k=v(t,e)},P=function(){return k},R=function(){var e,t=P(),n=t.globalObjectName;y()&&void 0!==window[n]&&(e=window)[n].apply(e,arguments)},j=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=P(),o=r.config,a=r.includes;R.apply(void 0,["config",o.id].concat(t)),Array.isArray(a)&&a.forEach((function(e){R.apply(void 0,["config",e.id].concat(t))}))},_=function(e,t){y()&&(window["ga-disable-".concat(e)]=t)},S=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=P(),n=t.config,r=t.includes;_(n.id,e),Array.isArray(r)&&r.forEach((function(t){return _(t.id,e)}))},x=function(){S(!0)},T=function(e){O=e},C=function(){return O},$=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=P(),r=n.includes,o=n.defaultGroupName;null==t.send_to&&Array.isArray(r)&&r.length&&(t.send_to=r.map((function(e){return e.id})).concat(o)),R("event",e,t)},L=function(e){if(y()){var t;if("string"==typeof e)t={page_path:e};else if(e.path||e.fullPath){var n=P(),r=n.pageTrackerUseFullPath,o=n.pageTrackerPrependBase,a=C(),c=a&&a.options.base,i=r?e.fullPath:e.path;t=m(m({},e.name&&{page_title:e.name}),{},{page_path:o?E(i,c):i})}else t=e;null==t.page_location&&(t.page_location=window.location.href),null==t.send_page_view&&(t.send_page_view=!0),$("page_view",t)}},q=function(e){var t,n=P().appName;e&&((t="string"==typeof e?{screen_name:e}:e).app_name=t.app_name||n,$("screen_view",t))},B=Object.freeze({__proto__:null,query:R,config:j,optOut:x,optIn:function(){S(!1)},pageview:L,screenview:q,exception:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];$.apply(void 0,["exception"].concat(t))},linker:function(e){j("linker",e)},time:function(e){$("timing_complete",e)},set:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];R.apply(void 0,["set"].concat(t))},refund:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];$.apply(void 0,["refund"].concat(t))},purchase:function(e){$("purchase",e)},customMap:function(e){j({custom_map:e})},event:$}),N=function(e){e.config.globalProperties.$gtag=B},D=function(e){return m({send_page_view:!1},e)},M=function(){var e=P(),t=e.config,n=e.includes;R("config",t.id,D(t.params)),Array.isArray(n)&&n.forEach((function(e){R("config",e.id,D(e.params))}))},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=P(),r=n.appName,o=n.pageTrackerTemplate,a=n.pageTrackerScreenviewEnabled,c=n.pageTrackerSkipSamePath;if(!c||e.path!==t.path){var i=e;f(o)?i=o(e,t):a&&(i=w({app_name:r,screen_name:e.name})),a?q(i):L(i)}},U=function(e){var t=P().pageTrackerExcludedRoutes;return t.includes(e.path)||t.includes(e.name)},I=function(){var t,n,r,o,a=P(),c=a.onReady,i=a.onError,s=a.globalObjectName,l=a.globalDataLayerName,u=a.config,p=a.customResourceURL,d=a.customPreconnectOrigin,h=a.deferScriptLoad,g=a.pageTrackerEnabled,m=a.disableScriptLoad,v=Boolean(g&&C());if(function(){if(y()){var e=P(),t=e.enabled,n=e.globalObjectName,r=e.globalDataLayerName;null==window[n]&&(window[r]=window[r]||[],window[n]=function(){window[r].push(arguments)}),window[n]("js",new Date),t||x(),window[n]}}(),v?(t=P(),n=t.onBeforeTrack,r=t.onAfterTrack,(o=C()).isReady().then((function(){e().then((function(){var e=o.currentRoute;M(),U(e.value)||G(e.value)})),o.afterEach((function(t,o){e().then((function(){U(t)||(f(n)&&n(t,o),G(t,o),f(r)&&r(t,o))}))}))}))):M(),!m)return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,r){if("undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("script");if(a.async=!0,a.src=e,a.defer=t.defer,t.preconnectOrigin){var c=document.createElement("link");c.href=t.preconnectOrigin,c.rel="preconnect",o.appendChild(c)}o.appendChild(a),a.onload=n,a.onerror=r}}))}("".concat(p,"?id=").concat(u.id,"&l=").concat(l),{preconnectOrigin:d,defer:h}).then((function(){c&&c(window[s])})).catch((function(e){return i&&i(e),e}))},F=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;N(e),A(t),T(n),P().bootstrap&&I()};
/*!
  * vue-router v4.0.11
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const W="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,z=e=>W?Symbol(e):"_vr_"+e,V=z("rvlm"),K=z("rvd"),H=z("r"),Q=z("rl"),X=z("rvl"),Y="undefined"!=typeof window;const Z=Object.assign;function J(e,t){const n={};for(const r in t){const o=t[r];n[r]=Array.isArray(o)?o.map(e):e(o)}return n}const ee=()=>{},te=/\/$/;function ne(e,t,n="/"){let r,o={},a="",c="";const i=t.indexOf("?"),s=t.indexOf("#",i>-1?i:0);return i>-1&&(r=t.slice(0,i),a=t.slice(i+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),c=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o,a,c=n.length-1;for(o=0;o<r.length;o++)if(a=r[o],1!==c&&"."!==a){if(".."!==a)break;c--}return n.slice(0,c).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function re(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function oe(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function ae(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!ce(e[n],t[n]))return!1;return!0}function ce(e,t){return Array.isArray(e)?ie(e,t):Array.isArray(t)?ie(t,e):e===t}function ie(e,t){return Array.isArray(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var se,le,ue,fe;function pe(e){if(!e)if(Y){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),e.replace(te,"")}(le=se||(se={})).pop="pop",le.push="push",(fe=ue||(ue={})).back="back",fe.forward="forward",fe.unknown="";const de=/^[^#]+#/;function he(e,t){return e.replace(de,"#")+t}const ge=()=>({left:window.pageXOffset,top:window.pageYOffset});function me(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function ve(e,t){return(history.state?history.state.position-t:-1)+e}const ye=new Map;function be(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return"/"!==n[0]&&(n="/"+n),re(n,"")}return re(n,e)+r+o}function we(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?ge():null}}function Ee(e){const{history:t,location:n}=window,r={value:be(e,n)},o={value:t.state};function a(r,a,c){const i=e.indexOf("#"),s=i>-1?(n.host&&document.querySelector("base")?e:e.slice(i))+r:location.protocol+"//"+location.host+e+r;try{t[c?"replaceState":"pushState"](a,"",s),o.value=a}catch(l){console.error(l),n[c?"replace":"assign"](s)}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const c=Z({},o.value,t.state,{forward:e,scroll:ge()});a(c.current,c,!0),a(e,Z({},we(r.value,e,null),{position:c.position+1},n),!1),r.value=e},replace:function(e,n){a(e,Z({},t.state,we(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}}}function Oe(e){const t=Ee(e=pe(e)),n=function(e,t,n,r){let o=[],a=[],c=null;const i=({state:a})=>{const i=be(e,location),s=n.value,l=t.value;let u=0;if(a){if(n.value=i,t.value=a,c&&c===s)return void(c=null);u=l?a.position-l.position:0}else r(i);o.forEach((e=>{e(n.value,s,{delta:u,type:se.pop,direction:u?u>0?ue.forward:ue.back:ue.unknown})}))};function s(){const{history:e}=window;e.state&&e.replaceState(Z({},e.state,{scroll:ge()}),"")}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",s),{pauseListeners:function(){c=n.value},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",s)}}}(e,t.state,t.location,t.replace);const r=Z({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e)},createHref:he.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function ke(e){return"string"==typeof e||"symbol"==typeof e}const Ae={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Pe=z("nf");var Re,je;function _e(e,t){return Z(new Error,{type:e,[Pe]:!0},t)}function Se(e,t){return e instanceof Error&&Pe in e&&(null==t||!!(e.type&t))}(je=Re||(Re={}))[je.aborted=4]="aborted",je[je.cancelled=8]="cancelled",je[je.duplicated=16]="duplicated";const xe={sensitive:!1,strict:!1,start:!0,end:!0},Te=/[.+*?^${}()[\]/\\]/g;function Ce(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function $e(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=Ce(r[n],o[n]);if(e)return e;n++}return o.length-r.length}const Le={type:0,value:""},qe=/[a-zA-Z0-9_]/;function Be(e,t,n){const r=function(e,t){const n=Z({},xe,t),r=[];let o=n.start?"^":"";const a=[];for(const s of e){const e=s.length?[]:[90];n.strict&&!s.length&&(o+="/");for(let t=0;t<s.length;t++){const r=s[t];let c=40+(n.sensitive?.25:0);if(0===r.type)t||(o+="/"),o+=r.value.replace(Te,"\\$&"),c+=40;else if(1===r.type){const{value:e,repeatable:n,optional:l,regexp:u}=r;a.push({name:e,repeatable:n,optional:l});const f=u||"[^/]+?";if("[^/]+?"!==f){c+=10;try{new RegExp(`(${f})`)}catch(i){throw new Error(`Invalid custom RegExp for param "${e}" (${f}): `+i.message)}}let p=n?`((?:${f})(?:/(?:${f}))*)`:`(${f})`;t||(p=l&&s.length<2?`(?:/${p})`:"/"+p),l&&(p+="?"),o+=p,c+=20,l&&(c+=-8),n&&(c+=-20),".*"===f&&(c+=-50)}e.push(c)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");return{re:c,score:r,keys:a,parse:function(e){const t=e.match(c),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",o=a[r-1];n[o.name]=e&&o.repeatable?e.split("/"):e}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:i}=e,s=a in t?t[a]:"";if(Array.isArray(s)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=Array.isArray(s)?s.join("/"):s;if(!l){if(!i)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=l}}return n}}}(function(e){if(!e)return[[]];if("/"===e)return[[Le]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[]}let i,s=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===i||"+"===i)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:"*"===i||"+"===i,optional:"*"===i||"?"===i})):t("Invalid state to consume buffer"),l="")}function p(){l+=i}for(;s<e.length;)if(i=e[s++],"\\"!==i||2===n)switch(n){case 0:"/"===i?(l&&f(),c()):":"===i?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===i?n=2:qe.test(i)?p():(f(),n=0,"*"!==i&&"?"!==i&&"+"!==i&&s--);break;case 2:")"===i?"\\"==u[u.length-1]?u=u.slice(0,-1)+i:n=3:u+=i;break;case 3:f(),n=0,"*"!==i&&"?"!==i&&"+"!==i&&s--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),c(),o}(e.path),n),o=Z(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Ne(e,t){const n=[],r=new Map;function o(e,n,r){const i=!r,s=function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:De(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}(e);s.aliasOf=r&&r.record;const l=Ue(t,e),u=[s];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(Z({},s,{components:r?r.record.components:s.components,path:e,aliasOf:r?r.record:s}))}let f,p;for(const t of u){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(f=Be(t,n,l),r?r.alias.push(f):(p=p||f,p!==f&&p.alias.push(f),i&&e.name&&!Me(f)&&a(e.name)),"children"in s){const e=s.children;for(let t=0;t<e.length;t++)o(e[t],f,r&&r.children[t])}r=r||f,c(f)}return p?()=>{a(p)}:ee}function a(e){if(ke(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a))}}function c(e){let t=0;for(;t<n.length&&$e(e,n[t])>=0;)t++;n.splice(t,0,e),e.record.name&&!Me(e)&&r.set(e.record.name,e)}return t=Ue({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,c,i={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw _e(1,{location:e});c=o.record.name,i=Z(function(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params),a=o.stringify(i)}else if("path"in e)a=e.path,o=n.find((e=>e.re.test(a))),o&&(i=o.parse(a),c=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw _e(1,{location:e,currentLocation:t});c=o.record.name,i=Z({},t.params,e.params),a=o.stringify(i)}const s=[];let l=o;for(;l;)s.unshift(l.record),l=l.parent;return{name:c,path:a,params:i,matched:s,meta:Ge(s)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function De(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function Me(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Ge(e){return e.reduce(((e,t)=>Z(e,t.meta)),{})}function Ue(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const Ie=/#/g,Fe=/&/g,We=/\//g,ze=/=/g,Ve=/\?/g,Ke=/\+/g,He=/%5B/g,Qe=/%5D/g,Xe=/%5E/g,Ye=/%60/g,Ze=/%7B/g,Je=/%7C/g,et=/%7D/g,tt=/%20/g;function nt(e){return encodeURI(""+e).replace(Je,"|").replace(He,"[").replace(Qe,"]")}function rt(e){return nt(e).replace(Ke,"%2B").replace(tt,"+").replace(Ie,"%23").replace(Fe,"%26").replace(Ye,"`").replace(Ze,"{").replace(et,"}").replace(Xe,"^")}function ot(e){return null==e?"":function(e){return nt(e).replace(Ie,"%23").replace(Ve,"%3F")}(e).replace(We,"%2F")}function at(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}function ct(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const e=n[r].replace(Ke," "),o=e.indexOf("="),a=at(o<0?e:e.slice(0,o)),c=o<0?null:at(e.slice(o+1));if(a in t){let e=t[a];Array.isArray(e)||(e=t[a]=[e]),e.push(c)}else t[a]=c}return t}function it(e){let t="";for(let n in e){const r=e[n];if(n=rt(n).replace(ze,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(Array.isArray(r)?r.map((e=>e&&rt(e))):[r&&rt(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function st(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=Array.isArray(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}function lt(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e,reset:function(){e=[]}}}function ut(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((c,i)=>{const s=e=>{var s;!1===e?i(_e(4,{from:n,to:t})):e instanceof Error?i(e):"string"==typeof(s=e)||s&&"object"==typeof s?i(_e(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c())},l=e.call(r&&r.instances[o],t,n,s);let u=Promise.resolve(l);e.length<3&&(u=u.then(s)),u.catch((e=>i(e)))}))}function ft(e,t,n,r){const o=[];for(const c of e)for(const e in c.components){let i=c.components[e];if("beforeRouteEnter"===t||c.instances[e])if("object"==typeof(a=i)||"displayName"in a||"props"in a||"__vccOpts"in a){const a=(i.__vccOpts||i)[t];a&&o.push(ut(a,n,r,c,e))}else{let a=i();o.push((()=>a.then((o=>{if(!o)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${c.path}"`));const a=(i=o).__esModule||W&&"Module"===i[Symbol.toStringTag]?o.default:o;var i;c.components[e]=a;const s=(a.__vccOpts||a)[t];return s&&ut(s,n,r,c,e)()}))))}}var a;return o}function pt(e){const n=t(H),a=t(Q),c=o((()=>n.resolve(r(e.to)))),i=o((()=>{const{matched:e}=c.value,{length:t}=e,n=e[t-1],r=a.matched;if(!n||!r.length)return-1;const o=r.findIndex(oe.bind(null,n));if(o>-1)return o;const i=ht(e[t-2]);return t>1&&ht(n)===i&&r[r.length-1].path!==i?r.findIndex(oe.bind(null,e[t-2])):o})),s=o((()=>i.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!Array.isArray(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(a.params,c.value.params))),l=o((()=>i.value>-1&&i.value===a.matched.length-1&&ae(a.params,c.value.params)));return{route:c,href:o((()=>c.value.href)),isActive:s,isExactActive:l,navigate:function(t={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return!0}(t)?n[r(e.replace)?"replace":"push"](r(e.to)).catch(ee):Promise.resolve()}}}const dt=c({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:pt,setup(e,{slots:n}){const r=a(pt(e)),{options:c}=t(H),s=o((()=>({[gt(e.activeClass,c.linkActiveClass,"router-link-active")]:r.isActive,[gt(e.exactActiveClass,c.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return()=>{const t=n.default&&n.default(r);return e.custom?t:i("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:s.value},t)}}});function ht(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const gt=(e,t,n)=>null!=e?e:null!=t?t:n;function mt(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const vt=c({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:n,slots:r}){const a=t(X),c=o((()=>e.route||a.value)),f=t(K,0),p=o((()=>c.value.matched[f]));s(K,f+1),s(V,p),s(X,c);const d=l();return u((()=>[d.value,p.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&oe(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const t=c.value,o=p.value,a=o&&o.components[e.name],s=e.name;if(!a)return mt(r.default,{Component:a,route:t});const l=o.props[e.name],u=l?!0===l?t.params:"function"==typeof l?l(t):l:null,f=i(a,Z({},u,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(o.instances[s]=null)},ref:d}));return mt(r.default,{Component:f,route:t})||f}}});function yt(t){const c=Ne(t.routes,t),i=t.parseQuery||ct,s=t.stringifyQuery||it,l=t.history,u=lt(),f=lt(),p=lt(),d=n(Ae);let h=Ae;Y&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const g=J.bind(null,(e=>""+e)),m=J.bind(null,ot),v=J.bind(null,at);function y(e,t){if(t=Z({},t||d.value),"string"==typeof e){const n=ne(i,e,t.path),r=c.resolve({path:n.path},t),o=l.createHref(n.fullPath);return Z(n,r,{params:v(r.params),hash:at(n.hash),redirectedFrom:void 0,href:o})}let n;if("path"in e)n=Z({},e,{path:ne(i,e.path,t.path).path});else{const r=Z({},e.params);for(const e in r)null==r[e]&&delete r[e];n=Z({},e,{params:m(e.params)}),t.params=m(t.params)}const r=c.resolve(n,t),o=e.hash||"";r.params=g(v(r.params));const a=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(s,Z({},e,{hash:(u=o,nt(u).replace(Ze,"{").replace(et,"}").replace(Xe,"^")),path:r.path}));var u;const f=l.createHref(a);return Z({fullPath:a,hash:o,query:s===it?st(e.query):e.query||{}},r,{redirectedFrom:void 0,href:f})}function b(e){return"string"==typeof e?ne(i,e,d.value.path):Z({},e)}function w(e,t){if(h!==e)return _e(8,{from:t,to:e})}function E(e){return k(e)}function O(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=b(r):{path:r},r.params={}),Z({query:e.query,hash:e.hash,params:e.params},r)}}function k(e,t){const n=h=y(e),r=d.value,o=e.state,a=e.force,c=!0===e.replace,i=O(n);if(i)return k(Z(b(i),{state:o,force:a,replace:c}),t||n);const l=n;let u;return l.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&oe(t.matched[r],n.matched[o])&&ae(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(s,r,n)&&(u=_e(16,{to:l,from:r}),q(r,r,!0,!1)),(u?Promise.resolve(u):P(l,r)).catch((e=>Se(e)?e:$(e,l,r))).then((e=>{if(e){if(Se(e,2))return k(Z(b(e.to),{state:o,force:a,replace:c}),t||l)}else e=j(l,r,!0,c,o);return R(l,r,e),e}))}function A(e,t){const n=w(e,t);return n?Promise.reject(n):Promise.resolve()}function P(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>oe(e,a)))?r.push(a):n.push(a));const i=e.matched[c];i&&(t.matched.find((e=>oe(e,i)))||o.push(i))}return[n,r,o]}(e,t);n=ft(r.reverse(),"beforeRouteLeave",e,t);for(const i of r)i.leaveGuards.forEach((r=>{n.push(ut(r,e,t))}));const c=A.bind(null,e,t);return n.push(c),bt(n).then((()=>{n=[];for(const r of u.list())n.push(ut(r,e,t));return n.push(c),bt(n)})).then((()=>{n=ft(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(ut(r,e,t))}));return n.push(c),bt(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(Array.isArray(r.beforeEnter))for(const o of r.beforeEnter)n.push(ut(o,e,t));else n.push(ut(r.beforeEnter,e,t));return n.push(c),bt(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=ft(a,"beforeRouteEnter",e,t),n.push(c),bt(n)))).then((()=>{n=[];for(const r of f.list())n.push(ut(r,e,t));return n.push(c),bt(n)})).catch((e=>Se(e,8)?e:Promise.reject(e)))}function R(e,t,n){for(const r of p.list())r(e,t,n)}function j(e,t,n,r,o){const a=w(e,t);if(a)return a;const c=t===Ae,i=Y?history.state:{};n&&(r||c?l.replace(e.fullPath,Z({scroll:c&&i&&i.scroll},o)):l.push(e.fullPath,o)),d.value=e,q(e,t,n,c),L()}let _;function S(){_=l.listen(((e,t,n)=>{const r=y(e),o=O(r);if(o)return void k(Z(o,{replace:!0}),r).catch(ee);h=r;const a=d.value;var c,i;Y&&(c=ve(a.fullPath,n.delta),i=ge(),ye.set(c,i)),P(r,a).catch((e=>Se(e,12)?e:Se(e,2)?(k(e.to,r).then((e=>{Se(e,20)&&!n.delta&&n.type===se.pop&&l.go(-1,!1)})).catch(ee),Promise.reject()):(n.delta&&l.go(-n.delta,!1),$(e,r,a)))).then((e=>{(e=e||j(r,a,!1))&&(n.delta?l.go(-n.delta,!1):n.type===se.pop&&Se(e,20)&&l.go(-1,!1)),R(r,a,e)})).catch(ee)}))}let x,T=lt(),C=lt();function $(e,t,n){L(e);const r=C.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function L(e){x||(x=!0,S(),T.list().forEach((([t,n])=>e?n(e):t())),T.reset())}function q(n,r,o,a){const{scrollBehavior:c}=t;if(!Y||!c)return Promise.resolve();const i=!o&&function(e){const t=ye.get(e);return ye.delete(e),t}(ve(n.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return e().then((()=>c(n,r,i))).then((e=>e&&me(e))).catch((e=>$(e,n,r)))}const B=e=>l.go(e);let N;const D=new Set;return{currentRoute:d,addRoute:function(e,t){let n,r;return ke(e)?(n=c.getRecordMatcher(e),r=t):r=e,c.addRoute(r,n)},removeRoute:function(e){const t=c.getRecordMatcher(e);t&&c.removeRoute(t)},hasRoute:function(e){return!!c.getRecordMatcher(e)},getRoutes:function(){return c.getRoutes().map((e=>e.record))},resolve:y,options:t,push:E,replace:function(e){return E(Z(b(e),{replace:!0}))},go:B,back:()=>B(-1),forward:()=>B(1),beforeEach:u.add,beforeResolve:f.add,afterEach:p.add,onError:C.add,isReady:function(){return x&&d.value!==Ae?Promise.resolve():new Promise(((e,t)=>{T.add([e,t])}))},install(e){e.component("RouterLink",dt),e.component("RouterView",vt),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>r(d)}),Y&&!N&&d.value===Ae&&(N=!0,E(l.location).catch((e=>{})));const t={};for(const r in Ae)t[r]=o((()=>d.value[r]));e.provide(H,this),e.provide(Q,a(t)),e.provide(X,d);const n=e.unmount;D.add(e),e.unmount=function(){D.delete(e),D.size<1&&(h=Ae,_&&_(),d.value=Ae,N=!1,x=!1),n()}}}}function bt(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}function wt(){return t(H)}function Et(){return t(Q)}export{wt as a,Oe as b,yt as c,F as i,Et as u};
