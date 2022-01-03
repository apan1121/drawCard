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
                headerColor: '',
                backgroundImg: '',
                randomDrawWait: 0
            },
            orgInput: {
                webTitle: "",
                boxSize: 0,
                headerColor: '',
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

/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/vue-loader/lib/index.js?!./app/components/common/settingModal.vue?vue&type=template&id=41f90424&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/pressplay/workspace/DockerPP_V2/pp_app/web/drawCard/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/pressplay/workspace/DockerPP_V2/pp_app/web/drawCard/node_modules/vue-loader/lib??vue-loader-options!./app/components/common/settingModal.vue?vue&type=template&id=41f90424& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modal card-list-modal",
      attrs: {
        tabindex: "-1",
        role: "dialog",
        "data-backdrop": "static",
        "data-keyboard": "false"
      }
    },
    [
      _c("div", { staticClass: "modal-dialog", attrs: { role: "document" } }, [
        _c("div", { staticClass: "modal-content" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            _c("form", [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("網站標題")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.webTitle,
                      expression: "input.webTitle"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.webTitle },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "webTitle", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("Header 顏色")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.headerColor,
                      expression: "input.headerColor"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.headerColor },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "headerColor", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _c("span", { style: { background: _vm.input.headerColor } })
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v("圖片大小 [" + _vm._s(_vm.input.boxSize) + " px]")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.boxSize,
                      expression: "input.boxSize"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "100", max: "200" },
                  domProps: { value: _vm.input.boxSize },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "boxSize", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "圖片隨機速度 [" + _vm._s(_vm.input.randomDrawWait) + " ms]"
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.randomDrawWait,
                      expression: "input.randomDrawWait"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "10", max: "1000" },
                  domProps: { value: _vm.input.randomDrawWait },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "randomDrawWait", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                  _vm._v(
                    "圖片抽取速度 [" + _vm._s(_vm.input.drawNextWait) + " ms]"
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.drawNextWait,
                      expression: "input.drawNextWait"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "range", min: "700", max: "5000" },
                  domProps: { value: _vm.input.drawNextWait },
                  on: {
                    __r: function($event) {
                      _vm.$set(_vm.input, "drawNextWait", $event.target.value)
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c("div", { staticClass: "col-6 text-left" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.clear }
                },
                [_vm._v("清除所有資料")]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-6 text-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.cancel }
                },
                [_vm._v("回復")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: { click: _vm.save }
                },
                [_vm._v("儲存")]
              )
            ])
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h5", { staticClass: "modal-title" }, [
        _c("i", { staticClass: "fas fa-award" }),
        _vm._v("\n                    設定\n                ")
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true



/***/ })

})
//# sourceMappingURL=index.0d900660abddcb42899b.hot-update.js.map