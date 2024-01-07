"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[580],{7880:(t,e,r)=>{r.r(e),r.d(e,{default:()=>D});var i=r(3967),o={class:"alert alert-primary alert-dismissible fade show",role:"alert"},a=(0,i.createElementVNode)("i",{class:"fas fa-bullhorn"},null,-1),l=(0,i.createElementVNode)("button",{type:"button",class:"close","data-dismiss":"alert","aria-label":"Close"},[(0,i.createElementVNode)("span",{"aria-hidden":"true"},"×")],-1),n={class:"lucky-draw-empty-box"},s={class:"lucky-draw-empty-info text-left"},c=(0,i.createElementVNode)("br",null,null,-1),u={class:"mb-2"},d={class:"mb-2"},g={class:"mb-2"};var T=r(2678),m=r(1587),p=r(988),f=r(6300);function b(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var i,o,a,l,n=[],s=!0,c=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;s=!1}else for(;!(s=(i=a.call(r)).done)&&(n.push(i.value),n.length!==e);s=!0);}catch(u){c=!0,o=u}finally{try{if(!s&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw o}}return n}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function v(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?v(Object(r),!0).forEach((function(e){C(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function C(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const z={components:{LuckyDrawPrizeBox:(0,i.defineAsyncComponent)((()=>r.e(599).then(r.bind(r,3812))))},filters:{},props:{},data:()=>({langPaths:["common","DrawPage","Tutorial"]}),computed:w({},(0,T.mapGetters)({validPrizeList:"validPrizeList",validCardList:"validCardList",randomCardTitle:"randomCardTitle",randomCardImg:"randomCardImg",randomPrize:"randomPrize",waitCardSN:"waitCardSN",L10nStorage:"L10nStorage"})),watch:{L10nStorage:{immediate:!0,deep:!0,handler(){this.setL10nToState()}},currentI18nLocal:{immediate:!0,deep:!0,handler(t,e){var r=this;t!==e&&e&&(p.XD.setDefault({locale:r.currentI18nLocal}),p.XD.mixpanel("Locale_choose",{locale:r.currentI18nLocal}),p.XD.gtag("event","Locale_choose",{locale:r.currentI18nLocal}),this.setL10nToState())}}},beforeCreate(){},created(){},mounted(){},updated(){},unmounted(){},methods:w(w(w({},(0,T.mapActions)({})),(0,T.mapMutations)({triggerModal:"triggerModal",savePrize:"savePrize",saveCard:"saveCard",createRandomLuckyDraw:"createRandomLuckyDraw",setL10n:"setL10n",setIsTutorial:"setIsTutorial"})),{},{editPrizeList(){this.triggerModal({key:"PrizeList"})},triggerTutorial(){var t=this,e={offset:{top:60,bottom:60},startCallback(){t.setIsTutorial(!0),p.XD.mixpanel("TutorialStart_trigger",{type:"Tutorial"}),p.XD.gtag("event","TutorialStart_trigger",{type:"Tutorial"})},closeCallback(){t.setIsTutorial(!1),p.XD.mixpanel("TutorialEnd_trigger",{type:"Tutorial"}),p.XD.gtag("event","TutorialEnd_trigger",{type:"Tutorial"})},step_callback(t,e){p.XD.mixpanel("TutorialStep_trigger",{type:"Tutorial",index:e.index}),p.XD.gtag("event","TutorialStep_trigger",{type:"Tutorial",index:e.index})}},r=t.randomPrize.split(","),i=t.randomCardTitle.split(","),o=()=>{var t=p.Z_.randRange(0,i.length-1);return i.splice(t,1)[0]},a=t.randomCardImg.split(","),l=()=>{var t=p.Z_.randRange(0,a.length-1);return a.splice(t,1)[0]},n=[{target:"",title:t.$t("Tutorial.NewbieTutorialTitle"),intro:t.$t("Tutorial.NewbieTutorialDesc")},{target:"",title:t.$t("Tutorial.NoPrizeTitle"),intro:t.$t("Tutorial.NoPrizeDesc")},{target:'.navbar .navbar-nav .nav-item .nav-link[rel="PrizeList"]',title:t.$t("Tutorial.WhereToCreatePrizeTitle"),intro:t.$t("Tutorial.WhereToCreatePrizeDesc"),beforeAction(e,r,i){f("#navbarCollapse").addClass("show"),t.triggerModal({key:"PrizeList",close:!1}),setTimeout((()=>{i()}),10)},afterAction(t,e,r){f("#navbarCollapse").removeClass("show"),setTimeout((()=>{r()}),10)}},{target:"#PrizeListBox button#addPrize",title:t.$t("Tutorial.CreateNewPrizeTitle"),intro:t.$t("Tutorial.CreateNewPrizeDesc"),scrollTarget:"#PrizeListBox",beforeAction(e,r,i){f("#navbarCollapse").removeClass("show"),t.triggerModal({key:"PrizeList"}),setTimeout((()=>{i()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#PrizeListBox .edit-prize-box",title:t.$t("Tutorial.AddNewPrizeTitle"),intro:t.$t("Tutorial.AddNewPrizeDesc"),scrollTarget:"#PrizeListBox",beforeAction(t,e,r){f("#PrizeListBox button#addPrize").trigger("click"),setTimeout((()=>{r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),100)}},{target:"#PrizeListBox .edit-prize-box",title:t.$t("Tutorial.QuicklyCreatePrizeTitle"),intro:t.$t("Tutorial.QuicklyCreatePrizeDesc"),scrollTarget:"#PrizeListBox",beforeAction(e,i,o){f("#PrizeListBox .edit-prize-box");var a,l=b((a=p.Z_.randRange(0,r.length-1),r.splice(a,1)[0].split(":")),2),n={sn:"add",title:l[0],desc:l[1],audio:"",cnt:p.Z_.randRange(3,3),del:!1};if(t.savePrize(n),t.validPrizeList.length){var s=t.validPrizeList[t.validPrizeList.length-1];f("body").trigger("triggerFocusPrizeSN",s.sn)}setTimeout((()=>{o()}),200)},afterAction(t,e,r){setTimeout((()=>{r()}),100)}},{target:"#PrizeListBox .prize-cnt-notice",title:t.$t("Tutorial.AmountOfPrizeTitle"),intro:t.$t("Tutorial.AmountOfPrizeDesc"),beforeAction(t,e,r){f("#PrizeListBox .modal-body").scrollTop(0),setTimeout((()=>{r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),100)}},{target:'#PrizeListBox .btn-group .btn[edit-type="csv"]',title:t.$t("Tutorial.BatchEditTitle"),intro:t.$t("Tutorial.BatchEditDesc"),beforeAction(t,e,r){f('#PrizeListBox .btn-group .btn[edit-type="csv"]').trigger("click"),setTimeout((()=>{r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),100)}},{target:"#PrizeListBox .download-csv",title:t.$t("Tutorial.DownloadPrizeCSVTitle"),intro:t.$t("Tutorial.DownloadPrizeCSVDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#PrizeListBox .upload-csv",title:t.$t("Tutorial.UploadPrizeCSVTitle"),intro:t.$t("Tutorial.UploadPrizeCSVDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:".lucky-draw-prize-box.mask",title:t.$t("Tutorial.PrizeCompletedTitle"),intro:t.$t("Tutorial.PrizeCompletedDesc"),beforeAction(t,e,r){f("#PrizeListBox").modal("hide"),setTimeout((()=>{r()}),100)},afterAction(t,e,r){f(".lucky-draw-prize-box.mask .mask-wrapper").trigger("click"),setTimeout((()=>{r()}),10)}},{target:".lucky-draw-prize-box",title:t.$t("Tutorial.DrawCardWaitTitle"),intro:t.$t("Tutorial.DrawCardWaitDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),10)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{beforeCheck(e,r,i,o){t.validCardList.length<3?e.run("cardNotEnough"):e.run("cardEnough")}},{key:"cardNotEnough",target:".prize-button .btn",title:t.$t("Tutorial.DrawItTitle"),intro:t.$t("Tutorial.DrawItDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),10)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:'.navbar .navbar-nav .nav-item .nav-link[rel="CardList"]',title:t.$t("Tutorial.ShowCardListTitle"),intro:t.$t("Tutorial.ShowCardListDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),10)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#CardListBox .modal-footer .btn",title:t.$t("Tutorial.AddNewCardTitle"),intro:t.$t("Tutorial.AddNewCardDesc"),beforeAction(e,r,i){t.triggerModal({key:"CardList"}),setTimeout((()=>{i()}),200)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#CardListBox .edit-card-box",title:t.$t("Tutorial.EnterCardInfoTitle"),intro:t.$t("Tutorial.EnterCardInfoDesc"),beforeAction(t,e,r){f("#CardListBox .add-card").trigger("click"),setTimeout((()=>{r()}),500)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#CardListBox .edit-card-box",title:t.$t("Tutorial.QuicklyCreateCardTitle"),intro:t.$t("Tutorial.QuicklyCreateCardDesc"),beforeAction(e,r,i){var a=o(),n={sn:"add",img:l(),title:a,showTitleFlag:!0,note:"",del:!1};if(t.saveCard(n),t.validCardList.length){var s=t.validCardList[t.validCardList.length-1];f("body").trigger("triggerFocusCardSN",s.sn)}setTimeout((()=>{i()}),200)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#CardListBox .card-list-page",title:t.$t("Tutorial.YouNeedEnoughCardTitle"),intro:t.$t("Tutorial.YouNeedEnoughCardDesc"),beforeAction(e,r,i){for(var a=3-t.validCardList.length,n=0;n<a;n++){var s=o(),c={sn:"add",img:l(),title:s,showTitleFlag:!0,note:"",del:!1};t.saveCard(c)}f("body").trigger("triggerFocusCardSN",!1),setTimeout((()=>{i()}),200)},afterAction(t,e,r){f("#CardListBox").modal("hide"),setTimeout((()=>{r()}),10)}},{key:"cardEnough",beforeCheck(t,e,r,i){f(".lucky-draw-prize-box").trigger("getEmptyCardIdCnt",(e=>{0===e?t.run("canNotDrawIt"):t.run("canDrawIt")}))}},{key:"canDrawIt",target:".prize-button .btn",title:t.$t("Tutorial.DrawItNowTitle"),intro:t.$t("Tutorial.DrawItNowDesc"),beforeAction(t,e,r){f(".lucky-draw-prize-box.mask .mask-wrapper").trigger("click"),setTimeout((()=>{r()}),10)},afterAction(t,e,r){f(".lucky-draw-prize-box .prize-button .btn").trigger("click"),setTimeout((()=>{r()}),100)}},{target:".lucky-draw-prize-box .prize-draw-content",title:t.$t("Tutorial.DrawingTitle"),intro:t.$t("Tutorial.DrawingDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),10)},waitToNextAction(t,e){f("body").on("drawEnd",(()=>{f("body").off("drawEnd"),e()}))}},{key:"canNotDrawIt",target:".lucky-draw-prize-box",title:t.$t("Tutorial.DrawCompleteTitle"),intro:t.$t("Tutorial.DrawCompleteDesc"),scrollTarget:".lucky-draw-prize-box",beforeAction(t,e,r){f(".lucky-draw-prize-box.mask .mask-wrapper")&&f(".lucky-draw-prize-box.mask .mask-wrapper").trigger("click"),setTimeout((()=>{r()}),10)}},{target:"",title:t.$t("Tutorial.CompleteTitle"),intro:t.$t("Tutorial.CompleteDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:'.navbar .navbar-nav .nav-item .nav-link[rel="ResultList"]',title:t.$t("Tutorial.DrawResultTitle"),intro:t.$t("Tutorial.DrawResultDesc"),beforeAction(t,e,r){f("#navbarCollapse").addClass("show"),setTimeout((()=>{r()}),10)},afterAction(t,e,r){f("#navbarCollapse").removeClass("show"),setTimeout((()=>{r()}),10)}},{target:"#ResultBox .card-list-page",title:t.$t("Tutorial.CardPrizeInfoTitle"),intro:t.$t("Tutorial.CardPrizeInfoDesc"),beforeAction(e,r,i){t.triggerModal({key:"Result"}),setTimeout((()=>{i()}),200)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#ResultBox .download-btn",title:t.$t("Tutorial.DownloadTitle"),intro:t.$t("Tutorial.DownloadDesc"),scrollTarget:"#ResultBox",beforeAction(t,e,r){document.querySelector("#ResultBox").scroll({top:0}),setTimeout((()=>{r()}),100)},afterAction(e,r,i){t.triggerModal({key:"Result",close:!0}),setTimeout((()=>{i()}),10)}},{title:t.$t("Tutorial.NearingTheEndTitle"),intro:t.$t("Tutorial.NearingTheEndDesc"),beforeAction(t,e,r){setTimeout((()=>{r()}),100)}},{target:'.nav-link[rel="Setting"]',title:t.$t("Tutorial.YouHaveYourStyleTitle"),intro:t.$t("Tutorial.YouHaveYourStyleDesc"),beforeAction(t,e,r){f("#navbarCollapse").addClass("show"),setTimeout((()=>{r()}),10)},afterAction(t,e,r){f("#navbarCollapse").removeClass("show"),setTimeout((()=>{r()}),10)}},{target:'#SettingBox .box-setting[rel="Style"]',scrollTarget:"#SettingBox",title:t.$t("Tutorial.YourThemeTitle"),intro:t.$t("Tutorial.YourThemeDesc"),beforeAction(e,r,i){t.triggerModal({key:"Setting"}),setTimeout((()=>{document.querySelector("#SettingBox").scroll({top:0}),i()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:'#SettingBox .box-setting[rel="Card"]',scrollTarget:"#SettingBox",title:t.$t("Tutorial.YourPreferencesTitle"),intro:t.$t("Tutorial.YourPreferencesDesc"),beforeAction(t,e,r){setTimeout((()=>{document.querySelector("#SettingBox").scroll({top:0}),r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{target:"#SettingBox .modal-footer .text-left",scrollTarget:"#SettingBox",title:t.$t("Tutorial.HadEnoughFunTitle"),intro:t.$t("Tutorial.HadEnoughFunDesc"),beforeAction(t,e,r){setTimeout((()=>{document.querySelector("#SettingBox").scroll({top:0}),r()}),100)},afterAction(t,e,r){setTimeout((()=>{r()}),10)}},{title:t.$t("Tutorial.OpenYourIdeaTitle"),intro:t.$t("Tutorial.OpenYourIdeaDesc"),beforeAction(e,r,i){t.triggerModal({key:"Setting",close:!1}),setTimeout((()=>{i()}),100)}}];new m.Z(n,e).run()},createRandomLuckyDrawAct(){var t=this;t.createRandomLuckyDraw(),p.XD.mixpanel("DrawCardRandom_click",{config:JSON.parse(JSON.stringify(t.config)),prizeList:JSON.parse(JSON.stringify(t.prizeList)),cardList:JSON.parse(JSON.stringify(t.cardList))}),p.XD.gtag("event","DrawCardRandom_click",{config:JSON.parse(JSON.stringify(t.config)),prizeList:JSON.parse(JSON.stringify(t.prizeList)),cardList:JSON.parse(JSON.stringify(t.cardList))})},setL10nToState(){var t=this;clearTimeout(t.setL10nToStateTimer),t.setL10nToStateTimer=setTimeout((()=>{var e={randomPrize:this.$t("common.Random.PrizeTitle"),randomCardTitle:this.$t("common.Random.CardTitle")};t.setL10n(e)}),500)}})};const D=(0,r(4407).Z)(z,[["render",function(t,e,r,T,m,p){var f=(0,i.resolveComponent)("lucky-draw-prize-box");return(0,i.openBlock)(),(0,i.createElementBlock)("div",{class:(0,i.normalizeClass)(["lucky-draw-box",{empty:0===t.validPrizeList.length}])},[t.validPrizeList.length>0?((0,i.openBlock)(!0),(0,i.createElementBlock)(i.Fragment,{key:0},(0,i.renderList)(t.validPrizeList,(t=>((0,i.openBlock)(),(0,i.createBlock)(i.TransitionGroup,{key:t.sn,name:"lucky-draw-prize-box",tag:"div","enter-active-class":"fadeInUp","leave-active-class":"fadeOutDown"},{default:(0,i.withCtx)((()=>[((0,i.openBlock)(),(0,i.createBlock)(f,{key:"prizeInfoTransition".concat(t.sn),"prize-info":t},null,8,["prize-info"]))])),_:2},1024)))),128)):((0,i.openBlock)(),(0,i.createElementBlock)(i.Fragment,{key:1},[(0,i.createElementVNode)("div",o,[a,(0,i.createTextVNode)(" "+(0,i.toDisplayString)(t.$t("DrawPage.DrawNotice"))+" ",1),l]),(0,i.createElementVNode)("div",n,[(0,i.createElementVNode)("div",s,[(0,i.createElementVNode)("p",null,[(0,i.createTextVNode)((0,i.toDisplayString)(t.$t("DrawPage.DrawListHasNotBeenCreated"))+" ",1),c,(0,i.createTextVNode)(" "+(0,i.toDisplayString)(t.$t("DrawPage.YouCan"))+"： ",1)]),(0,i.createElementVNode)("ol",null,[(0,i.createElementVNode)("li",u,[(0,i.createElementVNode)("a",{href:"javascript:;",onClick:e[0]||(e[0]=function(){return p.editPrizeList&&p.editPrizeList(...arguments)})},(0,i.toDisplayString)(t.$t("DrawPage.EnterPrize")),1)]),(0,i.createElementVNode)("li",d,[(0,i.createElementVNode)("a",{href:"javascript:;",onClick:e[1]||(e[1]=function(){return p.triggerTutorial&&p.triggerTutorial(...arguments)})},(0,i.toDisplayString)(t.$t("DrawPage.WatchGuide")),1)]),(0,i.createElementVNode)("li",g,[(0,i.createElementVNode)("a",{href:"javascript:;",onClick:e[2]||(e[2]=function(){return p.createRandomLuckyDrawAct&&p.createRandomLuckyDrawAct(...arguments)})},(0,i.toDisplayString)(t.$t("DrawPage.RandomTest")),1)])])])])],64))],2)}]])}}]);