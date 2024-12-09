"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_MapThem_heatMap2_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_heatmap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet-heatmap */ "./node_modules/leaflet-heatmap/leaflet-heatmap.js");
/* harmony import */ var leaflet_heatmap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_heatmap__WEBPACK_IMPORTED_MODULE_3__);
// import { GmapMap, GmapMarker } from '@fawmi/vue-google-maps'


 // import 'leaflet.heat'

 // Correctly import HeatmapOverlay

var lat = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
var lng = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
var map = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
var mapContainer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {// GmapMap,
    // GmapMarker,
    // L
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      lat_val: 0,
      lng_val: 0,
      map: null,
      heatmapLayer: null,
      heatData: []
    };
  },
  beforeMount: function beforeMount() {
    this.getLocation();
  },
  mounted: function mounted() {
    this.getLocation();
  },
  methods: {
    getLocation: function getLocation() {
      var _this = this;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          _this.lat_val = position.coords.latitude;
          _this.lng_val = position.coords.longitude;

          _this.initMap();
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      } // if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition((position) => {
      //         this.lat_val = position.coords.latitude
      //         this.lng_val = position.coords.longitude
      //         this.initMap()
      //     })
      // }
      // // this.lat_val = lat.value
      // // this.lng_val = lng.value
      // alert(this.lat_val);

    },
    initMap: function initMap() {
      // if (this.$refs.mapContainer) {
      // }
      // this.map = L.map(this.$refs.mapContainer).setView([this.lat_val, this.lng_val], 13);
      var myData = {
        max: 1000,
        // Set the maximum intensity value
        data: this.data.map(function (point) {
          return {
            lat: point[0],
            lng: point[1],
            count: point[2]
          };
        })
      };
      var baseLayer = leaflet__WEBPACK_IMPORTED_MODULE_1___default().tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 0,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      this.heatData = myData; // var heatmapLayer = new HeatmapOverlay(cfg);

      var cfg = {
        radius: 0.05,
        maxOpacity: 0.8,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count'
      };
      this.heatmapLayer = new (leaflet_heatmap__WEBPACK_IMPORTED_MODULE_3___default())(cfg);
      this.map = new (leaflet__WEBPACK_IMPORTED_MODULE_1___default().map)("mapHeatContainer", {
        center: new (leaflet__WEBPACK_IMPORTED_MODULE_1___default().LatLng)(this.lat_val, this.lng_val),
        zoom: 9
      });
      this.heatmapLayer.setData(myData);
      baseLayer.addTo(this.map);
      this.heatmapLayer.addTo(this.map);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("title", null, "Map Them", -1
/* HOISTED */
);

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "fsdfsdfsfsdfsdf", -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "row gap-20 masonry pos-r"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "masonry-sizer col-md-6"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  id: "mapHeatContainer",
  style: {
    "width": "1200px",
    "height": "500px"
  }
})], -1
/* HOISTED */
);

var _hoisted_5 = {
  "class": "masonry-sizer col-md-6"
};
var _hoisted_6 = {
  "class": "peers fxw-nw jc-sb ai-c"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Map", -1
/* HOISTED */
);

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Show Map");

var _hoisted_9 = {
  "class": "bgc-white p-20 bd"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");

  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_1];
    }),
    _: 1
    /* STABLE */

  }), _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: ""
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_8];
    }),
    _: 1
    /* STABLE */

  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.getLocation();
    })
  }, "Get Location"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.generateHeatmap();
    })
  }, "Generate Heatmap"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lat_val) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lng_val) + " heat -map overlay", 1
  /* TEXT */
  ), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ data }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ heatData }} ")])])])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap2.vue":
/*!*************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap2.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _heatMap2_vue_vue_type_template_id_06befbb4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heatMap2.vue?vue&type=template&id=06befbb4 */ "./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4");
/* harmony import */ var _heatMap2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heatMap2.vue?vue&type=script&lang=js */ "./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_heatMap2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_heatMap2_vue_vue_type_template_id_06befbb4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/MapThem/heatMap2.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap2_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap2.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4":
/*!*******************************************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap2_vue_vue_type_template_id_06befbb4__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap2_vue_vue_type_template_id_06befbb4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap2.vue?vue&type=template&id=06befbb4 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap2.vue?vue&type=template&id=06befbb4");


/***/ })

}]);