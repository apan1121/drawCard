webpackHotUpdate("app/index",{

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
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" }
                  },
                  [
                    _vm._v(
                      "\n                            Header 顏色\n                            "
                    ),
                    _c("span", {
                      style: {
                        background: _vm.input.headerColor,
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        border: "1px solid #999"
                      }
                    })
                  ]
                ),
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
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" }
                  },
                  [
                    _vm._v(
                      "\n                            背景圖片\n                        "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.input.backgroundImg,
                      expression: "input.backgroundImg"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.input.backgroundImg },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.input, "backgroundImg", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  {
                    staticStyle: { display: "flex" },
                    attrs: { for: "exampleInputEmail1" }
                  },
                  [
                    _vm._v(
                      "\n                            背景透明度\n                        "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.number",
                      value: _vm.input.backgroundOpacity,
                      expression: "input.backgroundOpacity",
                      modifiers: { number: true }
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "number", min: "0", max: "1", step: "0.1" },
                  domProps: { value: _vm.input.backgroundOpacity },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.input,
                        "backgroundOpacity",
                        _vm._n($event.target.value)
                      )
                    },
                    blur: function($event) {
                      _vm.$forceUpdate()
                    }
                  }
                })
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
//# sourceMappingURL=index.daabcc5735e7ccd401db.hot-update.js.map