"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Patient_Create_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
 //import Places from "@/Shared/PlacesShared";
//import BootstrapModalNoJquery from './BootstrapModalNoJquery.vue';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    editData: Object,
    sectors: Object,
    functions: Object
  },
  components: {
    //BootstrapModalNoJquery,
    Places: function (_Places) {
      function Places() {
        return _Places.apply(this, arguments);
      }

      Places.toString = function () {
        return _Places.toString();
      };

      return Places;
    }(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(Places);
        }, 2000);
      });
    })
  },
  data: function data() {
    return {
      submitted: false,
      form: (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
        ptr: {
          first_name: "",
          middle_name: "",
          last_name: "",
          address_province: "",
          address_municipality: "",
          address_barangay: "",
          address_purok_sitio: "",
          address_house_number_street: "",
          birthdate: "",
          sex: "",
          occupation: "",
          birth_place_province: "",
          birth_place_municipality: "",
          birth_place_barangay: "",
          birth_place_purok_sitio: "",
          birth_place_house_number_street: "",
          civil_status: "",
          spouse_first: "",
          spouse_middle: "",
          spouse_last: "",
          mother_first: "",
          mother_middle: "",
          mother_last: "",
          father_first: "",
          father_middle: "",
          father_last: "",
          phil_health_member: "",
          phil_health_no: "",
          Religion: "",
          Nationality: "",
          spouse_occ: "",
          tel_no: "",
          insurance: ""
        },
        ptcr: {
          patient_id: "",
          type_of_visit: 1,
          blood_pressure: "",
          temperature: "",
          pulse_cardiac_rate: "",
          respiratory_rate: "",
          height: "",
          weight: "",
          ob_gyn_lmp: "",
          ob_gyn_edc: "",
          ob_gyn_aog: "",
          allergies: 0,
          allergies_foods: "",
          allergies_drugs: "",
          allergies_others: "",
          allergies_others_specification: "",
          covid_vaccinated: 0,
          chief_complaints: "",
          smoker: 0,
          smoker_type_e_cigarrette: 0,
          smoker_type_cigarrette: 0,
          smoker_type_cigars: 0,
          smoker_type_pipes: 0,
          smoker_others_specify: 0,
          smoker_others_specification: 0,
          smoker_quitter: 0,
          doctor_order_subjective: "",
          doctor_order_objective: "",
          doctor_order_assessment: "",
          doctor_order_plan: ""
        }
      }),
      mun: this.$props.p_mun,
      bar: this.$props.p_bar,
      pageTitle: ""
    };
  },
  mounted: function mounted() {
    if (this.editData !== undefined) {
      if (this.bari) {
        this.bar = this.bari;
      }

      this.pageTitle = "Edit";
      this.form.name = this.editData.name;
      this.form.position = this.editData.position;
      this.form.competency = this.editData.competency;
      this.form.role = this.editData.role;
      this.form.id = this.editData.id;
      this.form.FFUNCCOD = this.editData.FFUNCCOD;
    } else {
      this.pageTitle = "Create";
    }
  },
  methods: {
    submit: function submit() {
      this.form.target_qty = parseFloat(this.form.target_qty1) + parseFloat(this.form.target_qty2) + parseFloat(this.form.target_qty3) + parseFloat(this.form.target_qty4); //alert(this.form.target_qty);

      if (this.editData !== undefined) {
        this.form.patch("/ImplementingTeam/" + this.form.id, this.form);
      } else {
        this.form.post("/ImplementingTeam");
      }
    },
    filter_me: function filter_me(type) {
      // alert(this.mun)
      if (type === 'mun') {
        // alert(type);
        this.bar = "";
        this.pur = "";
      }

      if (type === 'bar') {
        this.pur = "";
      }

      this.$inertia.get("/patient-records/create", {
        mun: this.mun,
        bar: this.bar,
        pur: this.pur,
        relrisk: this.relrisk,
        my_filter: this.my_filter // division: this.division_selected

      }, {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        onSuccess: function onSuccess() {
          window.location.reload();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
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

var _hoisted_4 = {
  "class": "col-md-8"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
  type: "hidden",
  required: ""
}, null, -1
/* HOISTED */
);

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Type of Visit", -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "peers"
};
var _hoisted_8 = {
  "class": "peer mt-2"
};

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  ");

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "new_patient"
}, "New Patient ", -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("      ");

var _hoisted_12 = {
  "class": "peer mt-2"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  ");

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "old_patient"
}, "Old Patient", -1
/* HOISTED */
);

var _hoisted_15 = {
  key: 0
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "FIRST NAME", -1
/* HOISTED */
);

var _hoisted_17 = ["disabled"];

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "MIDDLE NAME", -1
/* HOISTED */
);

var _hoisted_19 = ["disabled"];

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "LAST NAME", -1
/* HOISTED */
);

var _hoisted_21 = ["disabled"];

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "ADDRESS", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "Municipality", -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "Barangay", -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "Purok/Sitio", -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "HOUSE NUMBER/ STREET", -1
/* HOISTED */
);

var _hoisted_31 = ["disabled"];

var _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "POSITION", -1
/* HOISTED */
);

var _hoisted_33 = {
  key: 1,
  "class": "fs-6 c-red-500"
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "COMPETENCY", -1
/* HOISTED */
);

var _hoisted_35 = {
  key: 2,
  "class": "fs-6 c-red-500"
};

var _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "ROLE", -1
/* HOISTED */
);

var _hoisted_37 = {
  key: 3,
  "class": "fs-6 c-red-500"
};

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": ""
}, "OFFICE", -1
/* HOISTED */
);

var _hoisted_39 = ["value"];
var _hoisted_40 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pageTitle) + " Clinical Records", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: "/ImplementingTeam"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_3];
    }),
    _: 1
    /* STABLE */

  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col-md-8\">\n            <button class=\"btn btn-secondary\" @click=\"showModal\" :disabled=\"submitted\">Permissions</button>\n        </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.submit();
    }, ["prevent"]))
  }, [_hoisted_5, _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"peers\">\n                    <div>\n                        <input\n                            type=\"checkbox\"\n                            v-model=\"form.ptcr.new_patient\"\n                            :true-value=\"1\"\n                            :false-value=\"0\"\n                            class=\"form-check-input\"\n                            >&nbsp;\n                            <label for=\"\">New Patient </label>\n                    </div>\n                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>\n                    <div>\n                        <input\n                            type=\"checkbox\"\n                            v-model=\"form.ptcr.old_patient\"\n                            :true-value=\"1\"\n                            :false-value=\"0\"\n                            class=\"form-check-input\"\n                            >&nbsp;\n                            <label for=\"\">Old Patient </label>\n\n                    </div>\n                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.form.ptcr.type_of_visit = $event;
    }),
    value: 1,
    "class": "form-check-input",
    id: "new_patient"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.ptcr.type_of_visit]]), _hoisted_9, _hoisted_10]), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.ptcr.type_of_visit = $event;
    }),
    value: 0,
    "class": "form-check-input",
    id: "old_patient"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.ptcr.type_of_visit]]), _hoisted_13, _hoisted_14])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ form.ptcr.type_of_visit }} "), $data.form.ptcr.type_of_visit == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.ptr.first_name = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off",
    disabled: $data.form.ptcr.type_of_visit == 0
  }, null, 8
  /* PROPS */
  , _hoisted_17), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ptr.first_name]]), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.ptr.middle_name = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off",
    disabled: $data.form.ptcr.type_of_visit == 0
  }, null, 8
  /* PROPS */
  , _hoisted_19), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ptr.middle_name]]), _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.form.ptr.last_name = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off",
    disabled: $data.form.ptcr.type_of_visit == 0
  }, null, 8
  /* PROPS */
  , _hoisted_21), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ptr.last_name]]), _hoisted_22, _hoisted_23, _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.form.ptr.municipality = $event;
    }),
    "class": "form-control",
    onChange: _cache[6] || (_cache[6] = function ($event) {
      return _ctx.loadBarangays($data.form.ptr.municipality);
    })
  }, [_hoisted_25, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.municipalities, function (mun) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(mun), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.ptr.municipality]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"fs-6 c-red-500\" v-if=\"form.errors.municipality\">{{ form.errors.municipality }}</div> "), _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.barangay) + " ", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.form.ptr.barangay = $event;
    }),
    "class": "form-control",
    onChange: _cache[8] || (_cache[8] = function ($event) {
      return _ctx.loadPuroks(_this.form.ptr.barangay, _this.form.ptr.municipality);
    })
  }, [_hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" :value=\"bar.code\" "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.all_barangays, function (bar) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(bar.barangay), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.ptr.barangay]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"fs-6 c-red-500\" v-if=\"form.errors.barangay\">{{ form.errors.barangay }}</div> "), _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
      return $data.form.ptr.purok_sitio = $event;
    }),
    "class": "form-control"
  }, [_hoisted_29, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.all_puroks, function (pur) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pur.purok_sitio), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.ptr.purok_sitio]]), _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
      return $data.form.ptr.address_house_number_street = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off",
    disabled: $data.form.ptcr.type_of_visit == 0
  }, null, 8
  /* PROPS */
  , _hoisted_31), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ptr.address_house_number_street]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"fs-6 c-red-500\" v-if=\"form.errors.purok_sitio\">{{ form.errors.purok_sitio }}</div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"fs-6 c-red-500\" v-if=\"form.errors.ptr.first_name\">{{ form.errors.position }}</div> "), _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return $data.form.position = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.position]]), $data.form.errors.position ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.position), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return $data.form.competency = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.competency]]), $data.form.errors.competency ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errorscompetency), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return $data.form.role = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.role]]), $data.form.errors.role ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.role), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("<input type=\"text\" v-model=\"form.FFUNCCOD\" class=\"form-control\" autocomplete=\"chrome-off\">"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
      return $data.form.FFUNCCOD = $event;
    })
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.functions, function (functional) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      value: functional.FFUNCCOD
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(functional.FFUNCTION), 9
    /* TEXT, PROPS */
    , _hoisted_39);
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.FFUNCCOD]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
      return $data.form.id = $event;
    }),
    "class": "form-control",
    autocomplete: "chrome-off"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.id]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn btn-primary mt-3 text-white",
    onClick: _cache[16] || (_cache[16] = function ($event) {
      return $options.submit();
    }),
    disabled: $data.form.processing
  }, " Save changes ", 8
  /* PROPS */
  , _hoisted_40)], 32
  /* HYDRATE_EVENTS */
  )])]);
}

/***/ }),

/***/ "./resources/js/Pages/Patient/Create.vue":
/*!***********************************************!*\
  !*** ./resources/js/Pages/Patient/Create.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Create_vue_vue_type_template_id_e7fcd362__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=e7fcd362 */ "./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362");
/* harmony import */ var _Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js */ "./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Create_vue_vue_type_template_id_e7fcd362__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Patient/Create.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Create.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362":
/*!*****************************************************************************!*\
  !*** ./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362 ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_template_id_e7fcd362__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Create_vue_vue_type_template_id_e7fcd362__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Create.vue?vue&type=template&id=e7fcd362 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Patient/Create.vue?vue&type=template&id=e7fcd362");


/***/ })

}]);