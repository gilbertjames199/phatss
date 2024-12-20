"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Forecasting_Index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    test: Object
  },
  data: function data() {
    return {
      complaints: "",
      events: "",
      demand: "",
      population: ""
    };
  },
  methods: {
    handleSubmit: function handleSubmit(event) {
      event.preventDefault();
      document.getElementById('display-complaints').innerText = this.complaints;
      document.getElementById('display-events').innerText = this.events;
      document.getElementById('display-demand').innerText = this.demand;
      document.getElementById('display-population').innerText = this.population;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _trend_graph_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trend_graph.png */ "./resources/js/Pages/Forecasting/trend_graph.png");



var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("title", null, "Forecasting", -1
/* HOISTED */
);

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row gap-20 masonry pos-r\"><div class=\"peers fxw-nw jc-sb ai-c\"><h3>Forecasting</h3></div><div class=\"bgc-white p-20 bd\"><!-- &lt;img path=&quot;trend_graph.png&quot; /&gt; --><!-- Centered Image --><div class=\"text-center mb-3\"><img src=\"" + _trend_graph_png__WEBPACK_IMPORTED_MODULE_1__["default"] + "\" alt=\"Forecasting Image\" class=\"img-fluid\"></div><form><!-- Historical Complaints Analysis --><div class=\"form-group\"><label for=\"complaints-analysis\">Analyze Historical Complaints</label><textarea id=\"complaints-analysis\" class=\"form-control\" placeholder=\"Enter data or select criteria (e.g., frequency, types, locations)\"></textarea></div><!-- Correlate Events --><div class=\"form-group\"><label for=\"events-correlation\">Correlate Events</label><textarea id=\"events-correlation\" class=\"form-control\" placeholder=\"Enter events to correlate (e.g., market days, weather conditions, local holidays)\"></textarea></div><!-- Service Demand Estimation --><div class=\"form-group\"><label for=\"service-demand\">Service Demand Estimation</label><textarea id=\"service-demand\" class=\"form-control\" placeholder=\"Estimate future requirements for services (e.g., toilet facilities usage)\"></textarea></div><!-- Population and Sanitation Demand --><div class=\"form-group\"><label for=\"population-demand\">Population and Sanitation Demand</label><textarea id=\"population-demand\" class=\"form-control\" placeholder=\"Describe how population affects sanitation facility demand\"></textarea></div><button type=\"submit\" class=\"btn btn-primary\">Submit</button></form><table class=\"table table-sm table-borderless table-striped table-hover mt-3\"><thead><tr><th>Analysis</th><th>Details</th></tr></thead><tbody><tr><td>Historical Complaints</td><td id=\"display-complaints\"></td></tr><tr><td>Event Correlation</td><td id=\"display-events\"></td></tr><tr><td>Service Demand</td><td id=\"display-demand\"></td></tr><tr><td>Population and Sanitation Demand</td><td id=\"display-population\"></td></tr></tbody></table></div></div>", 1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_1];
    }),
    _: 1
    /* STABLE */

  }), _hoisted_2], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Forecasting/trend_graph.png":
/*!********************************************************!*\
  !*** ./resources/js/Pages/Forecasting/trend_graph.png ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/trend_graph.png?79f8ab15d52e4cbb71b276a44e39881a");

/***/ }),

/***/ "./resources/js/Pages/Forecasting/Index.vue":
/*!**************************************************!*\
  !*** ./resources/js/Pages/Forecasting/Index.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Index_vue_vue_type_template_id_24512151__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=24512151 */ "./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151");
/* harmony import */ var _Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js */ "./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Index_vue_vue_type_template_id_24512151__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Forecasting/Index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Index.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151":
/*!********************************************************************************!*\
  !*** ./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_template_id_24512151__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Index_vue_vue_type_template_id_24512151__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Index.vue?vue&type=template&id=24512151 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Forecasting/Index.vue?vue&type=template&id=24512151");


/***/ })

}]);