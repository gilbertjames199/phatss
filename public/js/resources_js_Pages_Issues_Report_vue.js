"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Issues_Report_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue3 */ "./node_modules/@inertiajs/inertia-vue3/dist/index.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_control_geocoder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet-control-geocoder */ "./node_modules/leaflet-control-geocoder/dist/Control.Geocoder.modern.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    editData: Object,
    barangays: Object // municipalities_global: Array

  },
  data: function data() {
    return {
      form: (0,_inertiajs_inertia_vue3__WEBPACK_IMPORTED_MODULE_0__.useForm)({
        id: "",
        issue: "",
        municipality: "",
        type: "",
        barangay: "",
        Latitude: "",
        Longitude: ""
      }),
      displayed_coordinates: "",
      title: "",
      my_barangays: [],
      searchQuery: "",
      suggestions: []
    };
  },
  mounted: function mounted() {
    // this.getMyLocation();
    if (this.editData !== undefined) {
      this.title = "Edit Reported";
      this.form.id = this.editData.id;
      this.form.issue = this.editData.issue;
      this.form.municipality = this.editData.municipality;
      this.form.barangay = this.editData.barangay;
      this.filterBarangay();
      this.form.type = this.editData.type;
      this.form.Latitude = this.editData.Latitude;
      this.form.Longitude = this.editData.Longitude;
      this.initMap(this.form.Latitude, this.form.Longitude);
    } else {
      this.title = "Report";
      this.initMap(7.575589251826168, 125.99270958172241);
    }
  },
  methods: {
    submit: function submit() {
      if (this.editData !== undefined) {
        this.form.patch("/issue/update");
      } else {
        this.form.post("store");
      }
    },
    filterBarangay: function filterBarangay() {
      var _this = this;

      this.my_barangays = this.barangays.filter(function (i) {
        return i.municipality === _this.form.municipality;
      }).map(function (i) {
        return i.barangay;
      });
    },
    getMyLocation: function getMyLocation() {
      var _this2 = this;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          _this2.form.Latitude = position.coords.latitude;
          _this2.form.Longitude = position.coords.longitude;

          _this2.updateMap(position.coords.latitude, position.coords.longitude);
        }, function (error) {
          alert("Geolocation failed: " + error.message);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    searchLocation: function searchLocation() {
      var _this3 = this;

      if (!this.searchQuery) {
        this.suggestions = [];
        return;
      }

      var url = "https://api.locationiq.com/v1/autocomplete.php?key=pk.2070cb3dbf9066600306adad278707a2&q=".concat(this.searchQuery, "&format=json");
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this3.suggestions = data;
      });
    },
    selectLocation: function selectLocation(location) {
      this.form.Latitude = location.lat;
      this.form.Longitude = location.lon;
      this.updateMap(location.lat, location.lon);
      this.suggestions = [];
      this.searchQuery = location.display_name;
    },
    initMap: function initMap(lat, lng) {
      var _this4 = this;

      this.map = leaflet__WEBPACK_IMPORTED_MODULE_1___default().map("map").setView([lat, lng], 15);
      leaflet__WEBPACK_IMPORTED_MODULE_1___default().tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
      this.marker = leaflet__WEBPACK_IMPORTED_MODULE_1___default().marker([lat, lng]).addTo(this.map);
      this.map.on("click", function (event) {
        var _event$latlng = event.latlng,
            lat = _event$latlng.lat,
            lng = _event$latlng.lng;
        _this4.form.Latitude = lat;
        _this4.form.Longitude = lng;

        _this4.updateMap(lat, lng);
      });
    },
    updateMap: function updateMap(lat, lng) {
      this.map.setView([lat, lng], 15);

      if (!this.marker) {
        this.marker = leaflet__WEBPACK_IMPORTED_MODULE_1___default().marker([lat, lng]).addTo(this.map);
      } else {
        this.marker.setLatLng([lat, lng]);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220 ***!
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
  d: "M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"
})], -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "row"
};
var _hoisted_5 = {
  "class": "col-md-4"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "issue"
}, "Issue Description", -1
/* HOISTED */
);

var _hoisted_7 = {
  key: 0,
  "class": "fs-6 c-red-500"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "municipality"
}, "Municipality", -1
/* HOISTED */
);

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_10 = {
  key: 1,
  "class": "fs-6 c-red-500"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "barangay"
}, "Barangay", -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_13 = {
  key: 2,
  "class": "fs-6 c-red-500"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "barangay"
}, "Type", -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
/* HOISTED */
);

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Emergency and Disaster-Related Sanitation Issue", -1
/* HOISTED */
);

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Hygiene and Personal Sanitation Issue", -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Industrial and Environmental Sanitation Issue", -1
/* HOISTED */
);

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Solid Waste Management Issue", -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Toilet and Human Waste Management Issue", -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Vector-Borne Sanitation Issue", -1
/* HOISTED */
);

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "Water Sanitation Issue", -1
/* HOISTED */
);

var _hoisted_23 = [_hoisted_15, _hoisted_16, _hoisted_17, _hoisted_18, _hoisted_19, _hoisted_20, _hoisted_21, _hoisted_22];
var _hoisted_24 = {
  key: 3,
  "class": "fs-6 c-red-500"
};
var _hoisted_25 = {
  "class": "location-inputs"
};

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Latitude", -1
/* HOISTED */
);

var _hoisted_27 = {
  key: 0,
  "class": "fs-6 c-red-500"
};

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Longitude", -1
/* HOISTED */
);

var _hoisted_29 = {
  key: 1,
  "class": "fs-6 c-red-500"
};
var _hoisted_30 = ["disabled"];
var _hoisted_31 = {
  "class": "col-md-7 position-relative"
};
var _hoisted_32 = {
  "class": "position-relative"
};
var _hoisted_33 = {
  key: 0,
  "class": "list-group position-absolute bg-white w-100 shadow p-2",
  style: {
    "max-height": "200px",
    "overflow-y": "auto",
    "z-index": "1050"
  }
};
var _hoisted_34 = ["onClick"];

var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  id: "map",
  style: {
    "height": "400px",
    "position": "relative",
    "z-index": "1"
  }
}, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.title) + " Sanitation Issue", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: "/issue"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_3];
    }),
    _: 1
    /* STABLE */

  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $options.submit();
    }, ["prevent"]))
  }, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.form.issue = $event;
    }),
    "class": "form-control",
    required: ""
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.issue]]), $data.form.errors.issue ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.issue), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.filterBarangay();
    }),
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.municipality = $event;
    }),
    required: ""
  }, [_hoisted_9, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.municipalities_global, function (mun) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: mun
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(mun), 1
    /* TEXT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.municipality]]), $data.form.errors.municipality ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.municipality), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.barangay = $event;
    }),
    required: ""
  }, [_hoisted_12, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.my_barangays, function (bar) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: bar
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(bar), 1
    /* TEXT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.barangay]]), $data.form.errors.barangay ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.barangay), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.form.type = $event;
    }),
    required: ""
  }, _hoisted_23, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.type]]), $data.form.errors.type ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.type), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <label>Location</label> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.form.Latitude = $event;
    }),
    "class": "form-control",
    placeholder: "Latitude",
    required: "",
    readonly: ""
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.Latitude]]), $data.form.errors.Latitude ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.Latitude), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.form.Longitude = $event;
    }),
    "class": "form-control",
    placeholder: "Longitude",
    required: "",
    readonly: ""
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.Longitude]]), $data.form.errors.Longitude ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.errors.Longitude), 1
  /* TEXT */
  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button type=\"button\" class=\"btn btn-secondary mt-2\" @click=\"getMyLocation\">Use My Location</button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    "class": "btn btn-primary mt-3 text-white",
    disabled: $data.form.processing
  }, "Submit Report", 8
  /* PROPS */
  , _hoisted_30)], 32
  /* HYDRATE_EVENTS */
  )]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return $data.searchQuery = $event;
    }),
    onInput: _cache[9] || (_cache[9] = function () {
      return $options.searchLocation && $options.searchLocation.apply($options, arguments);
    }),
    placeholder: "Search location...",
    "class": "form-control mb-2 position-relative",
    style: {
      "z-index": "1050"
    }
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), $data.suggestions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_33, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.suggestions, function (suggestion, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index,
      onClick: function onClick($event) {
        return $options.selectLocation(suggestion);
      },
      "class": "list-group-item list-group-item-action"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.display_name), 9
    /* TEXT, PROPS */
    , _hoisted_34);
  }), 128
  /* KEYED_FRAGMENT */
  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _hoisted_35])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ editData }} ")], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/Issues/Report.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/Issues/Report.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Report_vue_vue_type_template_id_63bd8220__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Report.vue?vue&type=template&id=63bd8220 */ "./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220");
/* harmony import */ var _Report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Report.vue?vue&type=script&lang=js */ "./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Report_vue_vue_type_template_id_63bd8220__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Issues/Report.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Report.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220":
/*!****************************************************************************!*\
  !*** ./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Report_vue_vue_type_template_id_63bd8220__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Report_vue_vue_type_template_id_63bd8220__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Report.vue?vue&type=template&id=63bd8220 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/Report.vue?vue&type=template&id=63bd8220");


/***/ })

}]);