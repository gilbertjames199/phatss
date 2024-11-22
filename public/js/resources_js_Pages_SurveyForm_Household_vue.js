"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_SurveyForm_Household_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import { ModelSelect } from 'vue-search-select';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    editData: Object,
    id: String,
    auth: Object
  },
  components: {// ModelSelect
  },
  data: function data() {
    var _useForm;

    return {
      pageTitle: null,
      form: (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)((_useForm = {
        id: "",
        date_survey: "",
        time_started: "",
        ENUMERATOR: "",
        district: "",
        municipality: "",
        barangay: "",
        purok_sitio: "",
        street: "",
        housenumber: "",
        unitnumber: "",
        Location: "",
        _Location_latitude: "",
        _Location_longitude: "",
        _Location_altitude: "",
        _Location_precision: "",
        name_respondent: "",
        FIRST_NAME: "",
        mname: "",
        suffix: "",
        name_respondent_001: "",
        FIRST_NAME_001: "",
        mname_001: "",
        suffix_001: "",
        _1_has_toilet: "",
        _2_toilet_used: "",
        _3_toilet_functional: "",
        _4_soap: "",
        _5_children: "",
        _6_spaces: "",
        _7_feces: "",
        _8_composting: "",
        _9_dispose: "",
        _10_emptied: "",
        _11_do_sludge: "",
        _12_do_tank: "",
        _13_sewer: "",
        _14_check: "",
        _14_check_1: "",
        _14_check_2: "",
        _14_check_3: "",
        _14_check_4: "",
        _14_check_5: "",
        _15_household: "",
        _15_1_people: "",
        _16_household: "",
        _17_using: "",
        _18_If_the_household_mediate_surroundings: "",
        Take_a_photo_for_question_18: "",
        Take_a_photo_for_question_18_URL: "",
        _19_materials: "",
        Name_of_MRF: "",
        Location_001: "",
        risk_level: "",
        Risk_Level_is_risk_level: "",
        Relative_risk_is_re_tive_risk_assessment: "",
        _1_Number_of_function_for_children_to_use: "",
        _2_school_soap: "",
        _3_school_gender: "",
        Check_type_of_toilet_present: "",
        Check_type_of_toilet_present_1: "",
        Check_type_of_toilet_present_2: "",
        Check_type_of_toilet_present_3: "",
        Check_type_of_toilet_present_4: "",
        _4_school_compost: "",
        _5_school_segre: "",
        _1_cdc_toilet: "",
        _2_cdc_func: "",
        _3_cdc_safe: "",
        Check_type_of_toilet_present_001: "",
        Check_type_of_toilet_present_001_1: "",
        Check_type_of_toilet_present_001_2: "",
        Check_type_of_toilet_present_001_3: "",
        Check_type_of_toilet_present_001_4: "",
        Check_type_of_toilet_present_001_5: "",
        _4_cdc_soap: "",
        _5_cdc_waste: "",
        _6_cdc_garb: "",
        _C_1_toilet: "",
        _C_2_functional: "",
        _C_3_water: "",
        Check_type_of_toilet_present_002: "",
        Check_type_of_toilet_present_002_flush_sewer: "",
        Check_type_of_toilet_present_002_flush_septic: "",
        Check_type_of_toilet_present_002_flush_pit: "",
        Check_type_of_toilet_present_002_ventilated: "",
        Check_type_of_toilet_present_002_pit_lat: "",
        _C_4_segregation: "",
        _C_5_dispose: "",
        no_of_heads: "",
        name_enumerator: "",
        pupils: "",
        toilets: "",
        calc_ratio: "",
        _C_Average_Pupil_Fu_pils_is_calc_ratio: ""
      }, _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _defineProperty(_useForm, "district", ""), _useForm))
    };
  },
  watch: {},
  computed: {},
  mounted: function mounted() {
    if (this.editData !== undefined) {
      this.pageTitle = "Edit";
    } else {
      this.pageTitle = "Create";
    }
  },
  methods: {
    submit: function submit() {
      if (this.editData !== undefined) {
        this.form.patch("/survey/household/update/{id}");
      } else {
        this.form.post("/survey/store");
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "relative row gap-20 masonry pos-r"
};
var _hoisted_2 = {
  "class": "peers fxw-nw jc-sb ai-c"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "25",
  height: "25",
  fill: "currentColor",
  "class": "bi bi-x-lg",
  viewBox: "0 0 16 16"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
})], -1
/* HOISTED */
);

var _hoisted_4 = [_hoisted_3];
var _hoisted_5 = {
  "class": "col-md-8"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h1>H1</h1> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pageTitle) + " Survey", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-danger text-white",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.goBack && _ctx.goBack.apply(_ctx, arguments);
    })
  }, _hoisted_4)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.submit();
    }, ["prevent"]))
  }, null, 32
  /* HYDRATE_EVENTS */
  )])])], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/SurveyForm/Household.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Pages/SurveyForm/Household.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Household_vue_vue_type_template_id_6ea5f457__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Household.vue?vue&type=template&id=6ea5f457 */ "./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457");
/* harmony import */ var _Household_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Household.vue?vue&type=script&lang=js */ "./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Household_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Household_vue_vue_type_template_id_6ea5f457__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/SurveyForm/Household.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Household_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Household_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Household.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457":
/*!***********************************************************************************!*\
  !*** ./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457 ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Household_vue_vue_type_template_id_6ea5f457__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Household_vue_vue_type_template_id_6ea5f457__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Household.vue?vue&type=template&id=6ea5f457 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/SurveyForm/Household.vue?vue&type=template&id=6ea5f457");


/***/ })

}]);