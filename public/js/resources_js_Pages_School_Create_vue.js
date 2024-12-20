"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_School_Create_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
 // import Places from "@/Shared/PlacesShared";
// import { ModelSelect } from 'vue-search-select';
// import Select2 from 'vue-select2';
//import BootstrapModalNoJquery from './BootstrapModalNoJquery.vue';
// import PermissionsModal from './PermissionsModal.vue';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    // paps_selected: Object,
    // opcr_targets: Object,
    // programs: Object,
    // ooes: Object,
    // opcr_list_id: String,
    type: Object,
    editData: Object
  },
  components: {// PermissionsModal
    //BootstrapModalNoJquery,
    // Select2,
    // ModelSelect,
    // Places: () => new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(Places)
    //     }, 2000)
    // })
  },
  data: function data() {
    return {
      submitted: false,
      form: (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
        description: "",
        types: [],
        id: null
      }),
      intervention_types: []
    };
  },
  mounted: function mounted() {
    this.getInterventionsAll();

    if (this.editData !== undefined) {
      this.pageTitle = "Edit";
      this.form.description = this.editData.description; // this.form.types = this.editData.types

      this.extractTypeIds(this.editData.type_tags);
      this.form.id = this.editData.id;
    } else {
      this.pageTitle = "Create ";
      this.setCurrentYear();
    }
  },
  methods: {
    submit: function submit() {
      if (this.editData !== undefined) {
        this.form.patch("/intervention/update", this.form);
      } else {
        // alert("Sample");
        var url = "/intervention/store"; // alert('for store '+url);

        this.form.post(url);
      }
    },
    setCurrentYear: function setCurrentYear() {
      var yr = new Date().getFullYear();
      this.form.year = parseFloat(yr) + 1;
    },
    getInterventionsAll: function getInterventionsAll() {
      var _this = this;

      this.intervention_types = [];
      this.type.forEach(function (i) {
        //alert(i.permission);
        _this.intervention_types.push({
          'id': i.id,
          'value': i.id,
          'label': i.type
        });
      });
    },
    extractTypeIds: function extractTypeIds(type_data) {
      var _this2 = this;

      // Clear existing IDs in form.types
      this.form.types = []; // Iterate through the data array and push type IDs to form.types

      type_data.forEach(function (item) {
        if (item.types && item.types.length > 0) {
          item.types.forEach(function (type) {
            _this2.form.types.push(type.id);
          });
        }
      });
    },
    goBack: function goBack() {
      // Use JavaScript's history API to navigate to the previous page
      if (window.history.length > 1) {
        window.history.back(); // Go to the previous page
      } else {
        this.$router ? this.$router.push('/') : window.location.href = '/'; // Default route or home page
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
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
  d: "M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5.0-.708-.708l-11-11a.5.5 0 0 0-.708 0Z"
})], -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "col-md-8"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
  type: "hidden",
  required: ""
}, null, -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Intervention", -1
/* HOISTED */
);

var _hoisted_7 = {
  key: 0,
  "class": "fs-6 c-red-500"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Type", -1
/* HOISTED */
);

var _hoisted_9 = {
  key: 1,
  "class": "fs-6 c-red-500"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_19 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  var _component_multiselect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("multiselect");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.pageTitle) + " Intervention", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ pageTitle }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Link :href=\"`/appropriations/${pap1.id}`\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" fill=\"currentColor\" class=\"bi bi-x-lg\"\r\n                viewBox=\"0 0 16 16\">\r\n                <path fill-rule=\"evenodd\"\r\n                    d=\"M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z\" />\r\n                <path fill-rule=\"evenodd\"\r\n                    d=\"M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z\" />\r\n            </svg>\r\n            </Link> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    onClick: $options.goBack,
    "class": "back-button"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_3];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.submit();
    }, ["prevent"]))
  }, [_hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.form.idpaps = $event;
    }),
    "class": "form-control",
    autocomplete: "positionchrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.idpaps]]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "class": "form-control",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.description = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.description]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <input type=\"hidden\" v-model=\"form.idmfo\" class=\"form-control\" autocomplete=\"chrome-off\"> "), $data.form.errors.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.description), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{  form.types }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <input type=\"text\" class=\"form-control\" v-model=\"form.type\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_multiselect, {
    modelValue: $data.form.types,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.types = $event;
    }),
    options: $data.intervention_types,
    mode: "tags",
    searchable: true
  }, null, 8
  /* PROPS */
  , ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <input type=\"hidden\" v-model=\"form.idmfo\" class=\"form-control\" autocomplete=\"chrome-off\"> "), $data.form.errors.types ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.types), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.id = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.id]]), _hoisted_10, _hoisted_11, _hoisted_12, _hoisted_13, _hoisted_14, _hoisted_15, _hoisted_16, _hoisted_17, _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn text-white btn-primary mt-3 text-white",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.submit();
    }),
    disabled: $data.form.processing
  }, " Save changes ", 8
  /* PROPS */
  , _hoisted_19)], 32
  /* HYDRATE_EVENTS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ editData.type_tags}} ")]);
}

/***/ }),

/***/ "./resources/js/Pages/School/Create.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/School/Create.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Create_vue_vue_type_template_id_a472b484__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=a472b484 */ "./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484");
/* harmony import */ var _Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js */ "./resources/js/Pages/School/Create.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Create_vue_vue_type_template_id_a472b484__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/School/Create.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/School/Create.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/School/Create.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Create.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484":
/*!****************************************************************************!*\
  !*** ./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_template_id_a472b484__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_template_id_a472b484__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Create.vue?vue&type=template&id=a472b484 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/School/Create.vue?vue&type=template&id=a472b484");


/***/ })

}]);