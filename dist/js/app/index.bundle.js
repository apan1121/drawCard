(()=>{var e,t,r,o,n={4836:(e,t,r)=>{"use strict";r(3967);var o=r(6300),n=r.n(o),a=(r(1393),r(988)),c=null;n()("body").on("resizeImg",(()=>{clearTimeout(c),c=setTimeout((()=>{n()(".imgLiquidFill").imgLiquid()}),50)}));var i=window.location,s=i.origin,u=i.pathname,d="".concat(s).concat(u);a.fA.set("API_CONFIG.API_HOST",d),a.fA.set("ASSETS_HOST",d)},684:(e,t,r)=>{"use strict";var o=r(3967),n=r(2678);r(4836),r(988),r(518);var a=r(2618),c=(r(6300),r(7413),r(7031));function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d=(0,a._)(["common"]),f=(0,c.Hc)(),l=(0,o.createApp)({components:{MainPage:(0,o.defineAsyncComponent)((()=>Promise.all([r.e(237),r.e(103)]).then(r.bind(r,5080))))},filters:{},data:()=>({}),computed:s({},(0,n.mapGetters)([])),watch:{},created(){},mounted(){this.int()},methods:s(s({int(){}},(0,n.mapActions)([])),(0,n.mapMutations)([])),store:d});l.use(d),l.use(f),l.mixin(c.kO),l.mount("#appBox")},1390:(e,t,r)=>{var o={"./en/CardList.json":[5936,936],"./en/DrawCardStorage.json":[1162,162],"./en/DrawPage.json":[7488,488],"./en/PrizeList.json":[7627,627],"./en/ResultList.json":[3608,608],"./en/Setting.json":[6020,20],"./en/Tutorial.json":[842,842],"./en/common.json":[4385,385],"./zh-TW/CardList.json":[4091,91],"./zh-TW/DrawCardStorage.json":[1665,665],"./zh-TW/DrawPage.json":[1235,235],"./zh-TW/PrizeList.json":[1715,715],"./zh-TW/ResultList.json":[6682,682],"./zh-TW/Setting.json":[9850,850],"./zh-TW/Tutorial.json":[278,278],"./zh-TW/common.json":[1148,148]};function n(e){if(!r.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],n=t[0];return r.e(t[1]).then((()=>r.t(n,19)))}n.keys=()=>Object.keys(o),n.id=1390,e.exports=n},6300:(e,t,r)=>{e.exports=r(926)(19755)},518:(e,t,r)=>{e.exports=r(1929)(22201)},3198:(e,t,r)=>{e.exports=r(926)(28594)},1221:(e,t,r)=>{e.exports=r(926)(35666)},382:(e,t,r)=>{e.exports=r(926)(36808)},7413:(e,t,r)=>{e.exports=r(926)(43734)},3967:(e,t,r)=>{e.exports=r(1929)(44359)},3301:(e,t,r)=>{e.exports=r(926)(68820)},1393:(e,t,r)=>{e.exports=r(926)(87934)},1049:(e,t,r)=>{e.exports=r(1929)(9669)},2678:(e,t,r)=>{e.exports=r(1929)(989)},1929:e=>{"use strict";e.exports=_dll_library},926:e=>{"use strict";e.exports=_dll_vendor}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return n[e].call(r.exports,r,r.exports,c),r.exports}c.m=n,e=[],c.O=(t,r,o,n)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,o,n]=e[d],i=!0,s=0;s<r.length;s++)(!1&n||a>=n)&&Object.keys(c.O).every((e=>c.O[e](r[s])))?r.splice(s--,1):(i=!1,n<a&&(a=n));if(i){e.splice(d--,1);var u=o();void 0!==u&&(t=u)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]},c.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return c.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,c.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);c.r(n);var a={};t=t||[null,r({}),r([]),r(r)];for(var i=2&o&&e;"object"==typeof i&&!~t.indexOf(i);i=r(i))Object.getOwnPropertyNames(i).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,c.d(n,a),n},c.d=(e,t)=>{for(var r in t)c.o(t,r)&&!c.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((t,r)=>(c.f[r](e,t),t)),[])),c.u=e=>(({33:"chunk/components/ResultModal",113:"chunk/components/PrizeListModal",209:"chunk/components/HeaderBar",237:"chunk/components/MainPage",376:"chunk/components/CardListModal",455:"chunk/components/CardInfoBox",537:"chunk/components/SettingModal",580:"chunk/components/LuckyDrawBox",599:"chunk/components/LuckyDrawPrizeBox",703:"chunk/components/GoogleSupport",814:"chunk/components/CardBox",918:"chunk/components/DropUpload",943:"chunk/components/DrawCardStorageBox"}[e]||e)+".bundle.js?v="+{20:"47cde281a41603df6de6",33:"76cab1c6703a745dd50b",91:"957bd5896c98ad01f03b",113:"f89a9f6f3ca3e7d27218",148:"2649323218bf010bf67c",162:"cd6f4553f6b75e226933",209:"1f063ee553c4f501a2b1",235:"492fed554a359f149210",237:"27c7cd98fad95c05e2bb",278:"0f4f05dad589f840c414",366:"5523a1f6002a4b8e5146",376:"21548ffa22198b2db24d",385:"6b52788c54e7c2b72c42",455:"864c62d70a16d892f64f",488:"852574e8d19c58113175",537:"0c5c84a35f860a3622f4",580:"b1355e812769b1aa8e05",599:"a87d2cd1afae38eeee4a",608:"c9e52661af16ba8bea73",627:"73297d8b355dcda3b6ea",665:"9fdadb89e68032c5ac14",682:"30a4696f3974cc056514",703:"0e307daf175e0cc14be1",715:"6065f3638047f1101e30",814:"9150a976db1133841323",842:"e5d2f43541f5eba5b0b4",850:"fb31200048aaf112217a",918:"543733c5443a8535e101",936:"81e7201a9cac65611ba5",943:"c0ea30ed06d6600c300b"}[e]),c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o={},c.l=(e,t,r,n)=>{if(o[e])o[e].push(t);else{var a,i;if(void 0!==r)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var d=s[u];if(d.getAttribute("src")==e){a=d;break}}a||(i=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.src=e),o[e]=[t];var f=(t,r)=>{a.onerror=a.onload=null,clearTimeout(l);var n=o[e];if(delete o[e],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(r))),t)return t(r)},l=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),i&&document.head.appendChild(a)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.j=350,c.p="dist/js/",(()=>{var e={350:0,445:0};c.f.j=(t,r)=>{var o=c.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var a=c.p+c.u(t),i=new Error;c.l(a,(r=>{if(c.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",i.name="ChunkLoadError",i.type=n,i.request=a,o[1](i)}}),"chunk-"+t,t)}},c.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[a,i,s]=r,u=0;if(a.some((t=>0!==e[t]))){for(o in i)c.o(i,o)&&(c.m[o]=i[o]);if(s)var d=s(c)}for(t&&t(r);u<a.length;u++)n=a[u],c.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return c.O(d)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),c.O(void 0,[103,656],(()=>c(3198))),c.O(void 0,[103,656],(()=>c(1221)));var i=c.O(void 0,[103,656],(()=>c(684)));i=c.O(i)})();