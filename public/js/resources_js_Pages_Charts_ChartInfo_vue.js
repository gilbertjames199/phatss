"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Charts_ChartInfo_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/dist/index.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");


chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_0__.Title, chart_js__WEBPACK_IMPORTED_MODULE_0__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_0__.Legend, chart_js__WEBPACK_IMPORTED_MODULE_0__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_0__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_0__.LinearScale);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Bar: vue_chartjs__WEBPACK_IMPORTED_MODULE_1__.Bar
  },
  props: {
    total_all: Number,
    info_newspaper: String,
    info_bar: String,
    info_TV: String,
    info_radio: String,
    info_socmed: String,
    chartId: {
      type: String,
      "default": 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      "default": 'label'
    },
    width: {
      type: Number,
      "default": 500
    },
    height: {
      type: Number,
      "default": 300
    },
    cssClasses: {
      "default": '',
      type: String
    },
    styles: {
      type: Object,
      "default": function _default() {}
    },
    plugins: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      chartData: {
        labels: [this.info_newspaper + '% Newspapers', this.info_bar + '% Barangay Assembly', this.info_TV + '% TV', this.info_radio + '% Radio', this.info_socmed + '% Social Media'],
        //Math.round((parseFloat(this.smokers.replace(/,/g, ''))/100)*this.total_all),
        datasets: [{
          label: ['Sources of Local and National News'],
          backgroundColor: ['#0007c4'],
          data: [Math.round(parseFloat(this.info_newspaper.replace(/,/g, '')) / 100 * this.total_all), Math.round(parseFloat(this.info_bar.replace(/,/g, '')) / 100 * this.total_all), Math.round(parseFloat(this.info_TV.replace(/,/g, '')) / 100 * this.total_all), Math.round(parseFloat(this.info_radio.replace(/,/g, '')) / 100 * this.total_all), Math.round(parseFloat(this.info_socmed.replace(/,/g, '')) / 100 * this.total_all)]
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Bar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Bar");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Bar, {
    "chart-options": $data.chartOptions,
    "chart-data": $data.chartData,
    "chart-id": $props.chartId,
    "dataset-id-key": $props.datasetIdKey,
    plugins: $props.plugins,
    "css-classes": $props.cssClasses,
    styles: $props.styles,
    width: $props.width,
    height: $props.height
  }, null, 8
  /* PROPS */
  , ["chart-options", "chart-data", "chart-id", "dataset-id-key", "plugins", "css-classes", "styles", "width", "height"]);
}

/***/ }),

/***/ "./resources/js/Pages/Charts/ChartInfo.vue":
/*!*************************************************!*\
  !*** ./resources/js/Pages/Charts/ChartInfo.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ChartInfo_vue_vue_type_template_id_5b18be0a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChartInfo.vue?vue&type=template&id=5b18be0a */ "./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a");
/* harmony import */ var _ChartInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChartInfo.vue?vue&type=script&lang=js */ "./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_time_sheets_inertiajs_template_charts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_time_sheets_inertiajs_template_charts_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ChartInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ChartInfo_vue_vue_type_template_id_5b18be0a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Charts/ChartInfo.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChartInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChartInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ChartInfo.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChartInfo_vue_vue_type_template_id_5b18be0a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChartInfo_vue_vue_type_template_id_5b18be0a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ChartInfo.vue?vue&type=template&id=5b18be0a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Charts/ChartInfo.vue?vue&type=template&id=5b18be0a");


/***/ })

}]);