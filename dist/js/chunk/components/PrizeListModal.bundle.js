"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[113],{5440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Be});var n=i(3967),r={id:"PrizeListBox",ref:"box",class:"modal",tabindex:"-1",role:"dialog","data-backdrop":"static","data-keyboard":"false"},o={class:"modal-dialog",role:"document"},a={class:"modal-content"},l={class:"modal-header"},s={class:"modal-title mr-2"},c=(0,n.createElementVNode)("i",{class:"fas fa-award"},null,-1),d={class:"btn-group",role:"group","aria-label":"prize-edit-type"},u=["edit-type","onClick"],p=(0,n.createElementVNode)("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[(0,n.createElementVNode)("span",{"aria-hidden":"true"},"×")],-1);var m=i(2678),f={ref:"body",class:"modal-body",style:{"max-height":"calc(100vh - 200px)",overflow:"auto","min-height":"400px"}},v={class:"prize-list-page"},g={class:"mb-3"},h={key:0,class:"text-danger"},b={class:"prize-list"},y=(0,n.createElementVNode)("hr",null,null,-1),P={key:1,class:"text-center pt-5 pb-5"},z={key:0,class:"modal-footer"};var S=i(8366),N=i.n(S),C={key:0,class:"prize-info-box"},O=(0,n.createElementVNode)("div",{class:"prize-info-item handle",rel:"drag"},[(0,n.createElementVNode)("i",{class:"fas fa-bars"})],-1),E={class:"prize-info-item",rel:"title"},V={class:"prize-title ellipsis"},w={class:"prize-desc ellipsis"},k={class:"prize-info-item",rel:"cnt"},L={class:"prize-info-item",rel:"tool"},D=[(0,n.createElementVNode)("div",{class:"far fa-edit"},null,-1)],B=[(0,n.createElementVNode)("div",{class:"fas fa-trash-alt"},null,-1)],x={key:1,class:"edit-prize-box mt-3 mb-3"},j={action:"javascript:;"},$={class:"form-group"},T={for:"title"},I={class:"form-group"},A={for:"desc"},J={class:"form-group"},_={for:"cnt"},X={class:"form-group"},F={for:"audio"},M={value:""},U=["value","textContent"],Z={class:"row"},G={class:"col"},W={class:"col"};var R=i(6247),H=i(988);function Y(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function q(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(i),!0).forEach((function(t){K(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Y(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function K(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const Q={components:{},filters:{},props:{mode:{type:String,default:"view"},sn:{type:[String,Number],default:""},title:{type:String,default:""},desc:{type:String,default:""},audio:{type:[String,Number,Boolean],default:""},cnt:{type:[Number,String],default:0},del:{type:[Boolean,String],default:!1}},emits:["close","edit"],data:()=>({langPaths:["common","PrizeList"],input:{sn:"",title:"",desc:"",audio:!1,cnt:1,del:!1}}),computed:q(q({},(0,m.mapGetters)({winnerAudio:"winnerAudio"})),{},{formatInput(){return{sn:this.sn,title:this.title,desc:this.desc,audio:this.audio,cardIds:this.cardIds,cnt:this.cnt,del:!!this.del}}}),watch:{mode:{immediate:!0,handler(){"edit"===this.mode&&(this.input=JSON.parse(JSON.stringify(this.formatInput)))}},formatInput:{immediate:!0,deep:!0,handler(){this.input=JSON.parse(JSON.stringify(this.formatInput))}},"input.audio":{deep:!1,handler(e,t){e!==t&&this.setPlayWinnerAudio(e)}}},beforeCreate(){},created(){},mounted(){},updated(){},unmounted(){},methods:q(q(q({},(0,m.mapActions)({})),(0,m.mapMutations)({setPlayWinnerAudio:"setPlayWinnerAudio",savePrize:"savePrize",removePrize:"removePrize"})),{},{editPrizeInfo(){this.$emit("edit",this.sn)},removePrizeInfo(){R.Z.confirm({title:this.$t("common.popup.Confirm"),html:this.$t("common.Alert.AreYouSureDelete"),confirmButtonText:this.$t("common.Button.Confirm"),cancelButtonText:this.$t("common.Button.Cancel")},(()=>{this.sn;this.removePrize({sn:this.sn}),this.$emit("close"),H.XD.mixpanel("EditPrizeInfoRemove_click",{}),H.XD.gtag("event","EditPrizeInfoRemove_click",{})}),(()=>{}))},save(){var e={sn:"".concat(this.input.sn),title:this.input.title,desc:"".concat(this.input.desc),audio:"".concat(this.input.audio),cnt:parseInt(this.input.cnt),del:!!this.input.del},t=!0;e.title||(R.Z.warning({title:this.$t("common.popup.Warning"),html:this.$t("PrizeList.PlzEnterPrizeTitle"),confirmButtonText:this.$t("common.Button.Confirm")}),t=!1),(isNaN(e.cnt)||""===e.cnt||e.cnt<0)&&(R.Z.warning({title:this.$t("common.popup.Warning"),html:this.$t("PrizeList.PlzCountDoNotZero"),confirmButtonText:this.$t("common.Button.Confirm")}),t=!1),t&&(this.savePrize(e),this.$emit("close"),H.XD.mixpanel("EditPrizeInfoSave_click",e),H.XD.gtag("event","EditPrizeInfoSave_click",e))},cancel(){JSON.stringify(this.input)!==JSON.stringify(this.formatInput)?R.Z.confirm({title:this.$t("common.popup.Confirm"),html:this.$t("common.Alert.AreYouSureDiscardEdit"),confirmButtonText:this.$t("common.Button.Confirm"),cancelButtonText:this.$t("common.Button.Cancel")},(()=>{this.$emit("close"),H.XD.mixpanel("EditPrizeInfoCancel_click",{}),H.XD.gtag("event","EditPrizeInfoCancel_click",{})}),(()=>{})):(()=>{this.$emit("close")})()}})};var ee=i(4407);const te=(0,ee.Z)(Q,[["render",function(e,t,i,r,o,a){return"view"===i.mode?(0,n.withDirectives)(((0,n.openBlock)(),(0,n.createElementBlock)("div",C,[O,(0,n.createElementVNode)("div",E,[(0,n.createElementVNode)("div",V,(0,n.toDisplayString)(i.title),1),(0,n.createElementVNode)("div",w,(0,n.toDisplayString)(i.desc),1)]),(0,n.createElementVNode)("div",k,(0,n.toDisplayString)(i.cnt),1),(0,n.createElementVNode)("div",L,[(0,n.createElementVNode)("button",{class:"btn btn-sm btn-primary",onClick:t[0]||(t[0]=function(){return a.editPrizeInfo&&a.editPrizeInfo(...arguments)})},D),(0,n.createElementVNode)("button",{class:"btn btn-sm btn-warning",onClick:t[1]||(t[1]=function(){return a.removePrizeInfo&&a.removePrizeInfo(...arguments)})},B)])],512)),[[n.vShow,["false",!1].includes(i.del)]]):"edit"===i.mode?((0,n.openBlock)(),(0,n.createElementBlock)("div",x,[(0,n.createElementVNode)("h5",null,(0,n.toDisplayString)("add"===i.sn?e.$t("PrizeList.AddPrize"):e.$t("PrizeList.EditPrize")),1),(0,n.createElementVNode)("form",j,[(0,n.createElementVNode)("div",$,[(0,n.createElementVNode)("label",T,(0,n.toDisplayString)(e.$t("PrizeList.PrizeTitle")),1),(0,n.withDirectives)((0,n.createElementVNode)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>o.input.title=e),name:"title",type:"text",class:"form-control"},null,512),[[n.vModelText,o.input.title,void 0,{trim:!0}]])]),(0,n.createElementVNode)("div",I,[(0,n.createElementVNode)("label",A,(0,n.toDisplayString)(e.$t("PrizeList.PrizeDesc")),1),(0,n.withDirectives)((0,n.createElementVNode)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>o.input.desc=e),name:"desc",type:"text",class:"form-control"},null,512),[[n.vModelText,o.input.desc,void 0,{trim:!0}]])]),(0,n.createElementVNode)("div",J,[(0,n.createElementVNode)("label",_,(0,n.toDisplayString)(e.$t("PrizeList.PrizeCount")),1),(0,n.withDirectives)((0,n.createElementVNode)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>o.input.cnt=e),name:"cnt",min:1,step:0,type:"number",class:"form-control"},null,512),[[n.vModelText,o.input.cnt,void 0,{number:!0,trim:!0}]])]),(0,n.createElementVNode)("div",X,[(0,n.createElementVNode)("label",F,(0,n.toDisplayString)(e.$t("PrizeList.PrizeSound")),1),(0,n.withDirectives)((0,n.createElementVNode)("select",{"onUpdate:modelValue":t[5]||(t[5]=e=>o.input.audio=e),class:"form-control"},[(0,n.createElementVNode)("option",M,(0,n.toDisplayString)(e.$t("PrizeList.PrizeNoSound")),1),((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(e.winnerAudio,((e,t)=>((0,n.openBlock)(),(0,n.createElementBlock)("option",{key:t,value:t,textContent:(0,n.toDisplayString)(t)},null,8,U)))),128))],512),[[n.vModelSelect,o.input.audio,void 0,{trim:!0}]])])]),(0,n.createElementVNode)("div",Z,[(0,n.createElementVNode)("div",G,[(0,n.createElementVNode)("button",{class:"btn btn-block btn-warning btn-sm",onClick:t[6]||(t[6]=function(){return a.cancel&&a.cancel(...arguments)})},(0,n.toDisplayString)(e.$t("common.Button.Cancel")),1)]),(0,n.createElementVNode)("div",W,[(0,n.createElementVNode)("button",{class:"btn btn-block btn-primary btn-sm",onClick:t[7]||(t[7]=function(){return a.save&&a.save(...arguments)})},(0,n.toDisplayString)(e.$t("common.Button.Save")),1)])])])):(0,n.createCommentVNode)("",!0)}]]);var ie=i(6300);function ne(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function re(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(i),!0).forEach((function(t){oe(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):ne(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function oe(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const ae={components:{draggable:N(),PrizeInfoBox:te,GoogleSupport:(0,n.defineAsyncComponent)((()=>i.e(703).then(i.bind(i,9252))))},filters:{},props:{},emits:["change-tab"],data:()=>({langPaths:["common","PrizeList"],focusPrizeSN:null,addNewPrize:!1,inputPrizeList:[]}),computed:re(re({},(0,m.mapGetters)({triggerOpenPrizeList:"triggerOpenPrizeList",validCardList:"validCardList",prizeList:"prizeList"})),{},{validCardCount(){return this.validCardList.length},validPrizeCnt(){return JSON.parse(JSON.stringify(this.prizeList)).filter((e=>[!1,"false"].includes(e.del))).length},PrizeAllCnt(){var e=JSON.parse(JSON.stringify(this.prizeList)),t=0;return e.forEach((e=>{[!1,"false"].includes(e.del)&&e.cnt&&(t+=parseInt(e.cnt))})),t}}),watch:{prizeList:{deep:!0,immediate:!0,handler(){JSON.stringify(this.prizeList)!==JSON.stringify(this.inputPrizeList)&&(this.inputPrizeList=JSON.parse(JSON.stringify(this.prizeList)))}},inputPrizeList:{deep:!0,immediate:!0,handler(){JSON.stringify(this.prizeList)!==JSON.stringify(this.inputPrizeList)&&this.setPrizeList(JSON.parse(JSON.stringify(this.inputPrizeList)))}}},beforeCreate(){},created(){},mounted(){ie("body").on("triggerFocusPrizeSN",((e,t)=>{this.setFocusPrizeSN(t)}))},unmounted(){ie("body").off("triggerFocusPrizeSN")},updated(){},methods:re(re(re({},(0,m.mapActions)({})),(0,m.mapMutations)({setPrizeList:"setPrizeList"})),{},{openAddPrize(){this.addNewPrize={sn:"add",title:"",desc:"",audio:"",cnt:1,del:!1},this.focusPrizeSN=!1;var e=this.$refs.body;ie(e).stop().animate({scrollTop:e.scrollHeight},500,"swing"),H.XD.mixpanel("AddPrizeInfo_click",{}),H.XD.gtag("event","AddPrizeInfo_click",{})},setFocusPrizeSN(e){this.focusPrizeSN=e,this.addNewPrize=!1},checkMove(){}})},le=(0,ee.Z)(ae,[["render",function(e,t,i,r,o,a){var l=(0,n.resolveComponent)("prize-info-box"),s=(0,n.resolveComponent)("draggable"),c=(0,n.resolveComponent)("google-support");return(0,n.openBlock)(),(0,n.createElementBlock)(n.Fragment,null,[(0,n.createElementVNode)("div",f,[(0,n.createElementVNode)("div",v,[(0,n.createElementVNode)("div",g,[(0,n.createElementVNode)("h6",{class:(0,n.normalizeClass)(["mb-0 prize-cnt-notice",{"text-danger":a.PrizeAllCnt>a.validCardCount}])},[(0,n.createTextVNode)((0,n.toDisplayString)(e.$t("PrizeList.PrizeCount"))+" / "+(0,n.toDisplayString)(e.$t("PrizeList.CardCount"))+"： ",1),(0,n.createElementVNode)("span",null,(0,n.toDisplayString)(a.PrizeAllCnt)+" / "+(0,n.toDisplayString)(a.validCardCount),1)],2),a.PrizeAllCnt>a.validCardCount?((0,n.openBlock)(),(0,n.createElementBlock)("small",h," * "+(0,n.toDisplayString)(e.$t("PrizeList.NotEnoughCardForDrawCard")),1)):(0,n.createCommentVNode)("",!0)]),(0,n.createElementVNode)("div",b,[a.validPrizeCnt>0?((0,n.openBlock)(),(0,n.createElementBlock)(n.Fragment,{key:0},[(0,n.createVNode)(s,{modelValue:o.inputPrizeList,"onUpdate:modelValue":t[1]||(t[1]=e=>o.inputPrizeList=e),group:"people","item-key":"index",handle:".handle",onStart:t[2]||(t[2]=t=>e.drag=!0),onEnd:t[3]||(t[3]=t=>e.drag=!1)},{item:(0,n.withCtx)((e=>{var i=e.element,r=e.index;return[((0,n.openBlock)(),(0,n.createBlock)(l,(0,n.mergeProps)({key:r},i,{mode:i.sn===o.focusPrizeSN?"edit":"view",onEdit:a.setFocusPrizeSN,onClose:t[0]||(t[0]=e=>o.focusPrizeSN=!1)}),null,16,["mode","onEdit"]))]})),_:1},8,["modelValue"]),y,(0,n.createVNode)(c,{trigger:e.triggerOpenPrizeList},null,8,["trigger"])],64)):((0,n.openBlock)(),(0,n.createElementBlock)("h4",P,(0,n.toDisplayString)(e.$t("PrizeList.PrizeNotBeenCreated")),1))]),o.addNewPrize?((0,n.openBlock)(),(0,n.createBlock)(l,(0,n.mergeProps)({key:0},o.addNewPrize,{mode:"edit",onClose:t[4]||(t[4]=e=>o.addNewPrize=!1)}),null,16)):(0,n.createCommentVNode)("",!0)])],512),o.addNewPrize?(0,n.createCommentVNode)("",!0):((0,n.openBlock)(),(0,n.createElementBlock)("div",z,[(0,n.createElementVNode)("button",{id:"addPrize",type:"button",class:"btn btn-info btn-block",onClick:t[5]||(t[5]=function(){return a.openAddPrize&&a.openAddPrize(...arguments)})},(0,n.toDisplayString)(e.$t("PrizeList.AddPrize")),1)]))],64)}]]);var se={id:"prizeListCSVPage",class:"modal-body",style:{"max-height":"calc(100vh - 200px)",overflow:"auto"}},ce={class:"form-group"},de=(0,n.createElementVNode)("hr",null,null,-1),ue={class:"modal-footer"},pe={style:{flex:"1"}},me={style:{flex:"1"}},fe={id:"prizeListCSVButton",class:"btn btn-sm btn-block btn-success upload-csv"},ve={class:"modal-footer"},ge={style:{flex:"1"}},he={style:{flex:"1"}};var be=i(286);function ye(e,t){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=function(e,t){if(!e)return;if("string"==typeof e)return Pe(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Pe(e,t)}(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){i=i.call(e)},n:function(){var e=i.next();return a=e.done,e},e:function(e){l=!0,o=e},f:function(){try{a||null==i.return||i.return()}finally{if(l)throw o}}}}function Pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function ze(e,t,i,n,r,o,a){try{var l=e[o](a),s=l.value}catch(c){return void i(c)}l.done?t(s):Promise.resolve(s).then(n,r)}function Se(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function Ne(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Se(Object(i),!0).forEach((function(t){Ce(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Se(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function Ce(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const Oe={components:{GoogleSupport:(0,n.defineAsyncComponent)((()=>i.e(703).then(i.bind(i,9252))))},filters:{},props:{},emits:["change-tab"],data:()=>({langPaths:["common","PrizeList"],csvInput:"",dropUpload:!1,prizeListCSV:""}),computed:Ne({},(0,m.mapGetters)({triggerOpenPrizeList:"triggerOpenPrizeList",config:"config",prizeList:"prizeList"})),watch:{prizeList:{immediate:!0,deep:!0,handler(){var e=JSON.parse(JSON.stringify(this.prizeList)),t=be.unparse(e,{quotes:!0,quoteChar:'"',escapeChar:'"',delimiter:",",header:!0,newline:"\r\n",skipEmptyLines:!0,escapeFormulae:!0});this.prizeListCSV=t||"sn,img,title,showTitleFlag,note,del"}},prizeListCSV:{immediate:!0,deep:!0,handler(){this.csvInput=JSON.parse(JSON.stringify(this.prizeListCSV))}}},beforeCreate(){},created(){},mounted(){var e,t=this;return(e=function*(){var e=t,n=(yield Promise.all([i.e(918),i.e(103)]).then(i.bind(i,1632))).default;e.DropUploadObj=n,e.$nextTick((()=>{e.init()}))},function(){var t=this,i=arguments;return new Promise((function(n,r){var o=e.apply(t,i);function a(e){ze(o,n,r,a,l,"next",e)}function l(e){ze(o,n,r,a,l,"throw",e)}a(void 0)}))})()},updated(){},methods:Ne(Ne(Ne({},(0,m.mapActions)({})),(0,m.mapMutations)({setPrizeList:"setPrizeList"})),{},{init(){var e=this;e.dropUpload=new this.DropUploadObj({dropSelector:"#prizeListCSVPage",clickBtnSelector:"#prizeListCSVButton",mimeTypeList:["text/csv"],process_callback(t,i,n){if("outputFile"===t){var r=new FileReader;r.onload=()=>{e.csvInput=r.result},r.readAsText(i)}}})},downloadCSV(){var e="".concat(this.config.webTitle||"DrawCard"," - ").concat(this.$t("common.Header.PrizeList")),t="data:text/csv;charset=utf-8,".concat(this.csvInput),i=encodeURI(t),n=document.createElement("a");n.setAttribute("href",i),n.setAttribute("download",e),document.body.appendChild(n),n.click(),H.XD.mixpanel("PrizeInfoCSVDownload_click",{csv:this.csvInput}),H.XD.gtag("event","PrizeInfoCSVDownload_click",{csv:this.csvInput})},save(){var e=this;R.Z.confirm({title:this.$t("common.popup.Confirm"),html:this.$t("PrizeList.SaveModifiedPrizeNotice"),confirmButtonText:this.$t("common.Button.Confirm"),cancelButtonText:this.$t("common.Button.Cancel")},(()=>{be.parse(this.csvInput,{complete:t=>{var i=t.data,n=[];if(i.length>0){var r=i.splice(0,1);r=r[0];var o,a=ye(i);try{for(a.s();!(o=a.n()).done;){var l=o.value,s={};for(var c in r){s[r[c]]=l[c]||""}s.audio=!["false",!1].includes(s.audio)&&s.audio,s.del=["true",!0,1].includes(s.del),n.push(s)}}catch(d){a.e(d)}finally{a.f()}}n.length>0?(e.setPrizeList(n),e.$emit("change-tab","list"),H.XD.mixpanel("PrizeInfoCSVSave_click",{csv:this.csvInput}),H.XD.gtag("event","PrizeInfoCSVSave_click",{csv:this.csvInput})):R.Z.warning({title:this.$t("common.popup.Warning"),html:this.$t("common.Alert.NoValidContent"),confirmButtonText:this.$t("common.Button.Confirm")})}})}),(()=>{}))},cancel(){R.Z.confirm({title:this.$t("common.popup.Confirm"),html:this.$t("common.Alert.AreYouSureDiscardEdit"),confirmButtonText:this.$t("common.Button.Confirm"),cancelButtonText:this.$t("common.Button.Cancel")},(()=>{this.csvInput=this.prizeListCSV,H.XD.mixpanel("PrizeInfoCSVCancel_click",{}),H.XD.gtag("event","PrizeInfoCSVCancel_click",{})}),(()=>{}))}})},Ee=(0,ee.Z)(Oe,[["render",function(e,t,i,r,o,a){var l=(0,n.resolveComponent)("google-support");return(0,n.openBlock)(),(0,n.createElementBlock)(n.Fragment,null,[(0,n.createElementVNode)("div",se,[(0,n.createElementVNode)("div",ce,[(0,n.withDirectives)((0,n.createElementVNode)("textarea",{"onUpdate:modelValue":t[0]||(t[0]=e=>o.csvInput=e),class:"form-control csv-input"},"\n            ",512),[[n.vModelText,o.csvInput]]),de,(0,n.createVNode)(l,{trigger:e.triggerOpenPrizeList},null,8,["trigger"])])]),(0,n.withDirectives)((0,n.createElementVNode)("div",ue,[(0,n.createElementVNode)("div",pe,[(0,n.createElementVNode)("button",{class:"btn btn-sm btn-block btn-warning download-csv",onClick:t[1]||(t[1]=function(){return a.downloadCSV&&a.downloadCSV(...arguments)})},(0,n.toDisplayString)(e.$t("common.Button.DownloadCSV")),1)]),(0,n.createElementVNode)("div",me,[(0,n.createElementVNode)("button",fe,(0,n.toDisplayString)(e.$t("common.Button.UploadCSV")),1)])],512),[[n.vShow,o.csvInput===o.prizeListCSV]]),(0,n.withDirectives)((0,n.createElementVNode)("div",ve,[(0,n.createElementVNode)("div",ge,[(0,n.createElementVNode)("button",{class:"btn btn-sm btn-block btn-warning",onClick:t[2]||(t[2]=function(){return a.cancel&&a.cancel(...arguments)})},(0,n.toDisplayString)(e.$t("common.Button.Cancel")),1)]),(0,n.createElementVNode)("div",he,[(0,n.createElementVNode)("button",{class:"btn btn-sm btn-block btn-success save",onClick:t[3]||(t[3]=function(){return a.save&&a.save(...arguments)})},(0,n.toDisplayString)(e.$t("common.Button.Save")),1)])],512),[[n.vShow,o.csvInput!==o.prizeListCSV]])],64)}]]);var Ve=i(6300);function we(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function ke(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?we(Object(i),!0).forEach((function(t){Le(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):we(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function Le(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const De={components:{PrizeListPage:le,PrizeListCSVPage:Ee},filters:{},props:{},data:()=>({langPaths:["common","PrizeList"],editType:"",editTypeOptions:{list:"fas fa-list",csv:"fas fa-file-csv"}}),computed:ke(ke({},(0,m.mapGetters)({triggerOpenPrizeList:"triggerOpenPrizeList"})),{},{editComponent(){var e="PrizeListPage";if("csv"===this.editType)e="PrizeListCSVPage";else e="PrizeListPage";return e}}),watch:{triggerOpenPrizeList:{immediate:!0,handler(){this.$nextTick((()=>{this.triggerOpenPrizeList?Ve(this.$refs.box).modal("show"):Ve(this.$refs.box).modal("hide")}))}},editType:{handler(e,t){e!==t&&t&&(H.XD.mixpanel("PrizeListEditType_choose",{type:this.editType}),H.XD.gtag("event","PrizeListEditType_choose",{type:this.editType}))}}},beforeCreate(){},created(){},mounted(){var e=this,t=Ve(e.$refs.box);t.bind("shown.bs.modal",(()=>{var t=Object.keys(e.editTypeOptions);e.editType=t[0],H.XD.mixpanel("PrizeListOpen_click"),H.XD.gtag("event","PrizeListOpen_click")})),t.bind("hidden.bs.modal",(()=>{e.triggerModal({key:"PrizeList",close:!0}),H.XD.mixpanel("PrizeListClose_click"),H.XD.gtag("event","PrizeListClose_click")}))},updated(){},beforeUnmount(){Ve(this.$refs.box).modal("hide")},unmounted(){},methods:ke(ke(ke({},(0,m.mapActions)({})),(0,m.mapMutations)({triggerModal:"triggerModal"})),{},{changeTab(e){this.editType=e}})},Be=(0,ee.Z)(De,[["render",function(e,t,i,m,f,v){return(0,n.openBlock)(),(0,n.createElementBlock)("div",r,[(0,n.createElementVNode)("div",o,[(0,n.createElementVNode)("div",a,[(0,n.createElementVNode)("div",l,[(0,n.createElementVNode)("h5",s,[c,(0,n.createTextVNode)(" "+(0,n.toDisplayString)(e.$t("common.Header.PrizeList")),1)]),(0,n.createElementVNode)("div",d,[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(f.editTypeOptions,((e,t)=>((0,n.openBlock)(),(0,n.createElementBlock)("button",{key:t,type:"button",class:(0,n.normalizeClass)(["btn btn-sm",{"btn-primary":t===f.editType,"btn-secondary":t!==f.editType}]),"edit-type":t,onClick:e=>f.editType=t},[(0,n.createElementVNode)("i",{class:(0,n.normalizeClass)(e)},null,2)],10,u)))),128))]),p]),((0,n.openBlock)(),(0,n.createBlock)((0,n.resolveDynamicComponent)(v.editComponent),{onChangeTab:v.changeTab},null,40,["onChangeTab"]))])])],512)}]])}}]);