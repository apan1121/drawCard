webpackHotUpdate("app/index",{

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/pressplay/workspace/DockerPP_V2/pp_app/web/drawCard/node_modules/babel-loader/lib!/Users/pressplay/workspace/DockerPP_V2/pp_app/web/drawCard/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vue = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.js");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(/*! vuex */ "../../node_modules/vuex/dist/vuex.esm.js");

var _cardBox = __webpack_require__(/*! ./cardBox */ "./app/components/common/cardBox.vue");

var _cardBox2 = _interopRequireDefault(_cardBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var targetDom = null;

exports.default = {
    data: function data() {
        return {
            input: {
                webTitle: "",
                boxSize: 0,
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                randomDrawWait: 0
            },
            orgInput: {
                webTitle: "",
                boxSize: 0,
                headerColor: '#343a40',
                backgroundImg: '',
                randomDrawWait: 0
            }
        };
    },
    methods: {
        save: function save() {
            var that = this;
            var params = {
                config: that.input
            };
            targetDom.modal("hide");
        },
        cancel: function cancel() {
            var that = this;
            var params = {
                config: that.orgInput
            };
            that.$store.dispatch("setConfig", params);
            targetDom.modal("hide");
        },
        clear: function clear() {
            var that = this;
            if (confirm("您確定要清除所有的資料嗎？")) {
                that.$store.dispatch("clearAllData");
                targetDom.modal("hide");
            }
        }
    },
    watch: {
        input: {
            deep: true,
            handler: function handler(val, oldVal) {
                var that = this;
                var params = {
                    config: that.input
                };
                that.$store.dispatch("setConfig", params);
            }
        },
        triggerOpenSetting: function triggerOpenSetting() {
            var that = this;
            targetDom.modal("show");
        }
    },
    computed: _extends({}, (0, _vuex.mapGetters)(["triggerOpenSetting", "config"])),
    mounted: function mounted() {
        var that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function () {
            var config = JSON.parse(JSON.stringify(that.config));
            that.input = _extends({}, that.input, config);
            that.orgInput = _extends({}, that.orgInput, config);
        });
    },

    props: {},
    components: {}
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js")))

/***/ })

})
//# sourceMappingURL=index.439984fa33537d636e56.hot-update.js.map