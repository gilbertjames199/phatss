"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Issues_ViewB_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Shared_LRoutingMachine_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Shared/LRoutingMachine.vue */ "./resources/js/Shared/LRoutingMachine.vue");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leaflet_dist_images_marker_icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png");
/* harmony import */ var leaflet_dist_images_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png");
/* harmony import */ var leaflet_dist_images_marker_shadow_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png");


 //*********************** */




var waypoints = [{
  lat: 7.57608,
  lng: 125.992595
}, {
  lat: 7.60332,
  lng: 125.96808
}];
leaflet__WEBPACK_IMPORTED_MODULE_2___default().Icon.Default.mergeOptions({
  iconRetinaUrl: leaflet_dist_images_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_4__["default"],
  iconUrl: leaflet_dist_images_marker_icon_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  shadowUrl: leaflet_dist_images_marker_shadow_png__WEBPACK_IMPORTED_MODULE_5__["default"]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    long_from: Number,
    lat_from: Number,
    long_to: Number,
    lat_to: Number,
    nhc: Object,
    issue: Object
  },
  components: {
    LRoutingMachine: _Shared_LRoutingMachine_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      mapId: "map",
      mapObject: null,
      zoom: 6,
      center: {
        lat: 7.60332,
        lng: 125.992595
      },
      osmUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //   waypoints,
      from: {
        lat: null,
        lng: null
      },
      to: {
        lat: null,
        lng: null
      },
      searchFrom: "",
      searchTo: "",
      showSuggestions: null,
      suggestions: [],
      waypoints: []
    };
  },
  watch: {
    from: function from(newFrom) {
      this.updateWaypoints();
    },
    to: function to(newTo) {
      this.updateWaypoints();
    }
  },
  mounted: function mounted() {
    this.mapObject = leaflet__WEBPACK_IMPORTED_MODULE_2___default().map(this.mapId, {
      zoom: this.zoom,
      center: this.center
    });
    leaflet__WEBPACK_IMPORTED_MODULE_2___default().tileLayer(this.osmUrl, {
      attribution: this.attribution
    }).addTo(this.mapObject); // Add click event listener

    this.mapObject.on("click", this.handleMapClick); // Restore values from localStorage

    var storedFrom = localStorage.getItem("searchFrom");
    var storedTo = localStorage.getItem("searchTo");

    if (storedFrom) {
      this.searchFrom = storedFrom;
      this.from = JSON.parse(localStorage.getItem("fromCoord"));
    }

    if (storedTo) {
      this.searchTo = storedTo;
      this.to = JSON.parse(localStorage.getItem("toCoord"));
    } // Calculate the center as the average of from and to coordinates


    if (this.from.lat && this.to.lat) {
      this.center = {
        lat: (this.from.lat + this.to.lat) / 2,
        lng: (this.from.lng + this.to.lng) / 2
      };
    }
  },
  methods: {
    searchLocation: function searchLocation(type) {
      var _this = this;

      var query = type === "from" ? this.searchFrom : this.searchTo;

      if (!query) {
        this.suggestions = [];
        return;
      }

      var url = "https://nominatim.openstreetmap.org/search?format=json&q=".concat(query);
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.suggestions = data;
      });
    },
    selectLocation: function selectLocation(location, type) {
      this.showSuggestions = null;

      if (type === "from") {
        this.from = {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon)
        };
        this.searchFrom = location.display_name;
      } else {
        this.to = {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon)
        };
        this.searchTo = location.display_name;
      }
    },
    handleMapClick: function handleMapClick(e) {
      var _e$latlng = e.latlng,
          lat = _e$latlng.lat,
          lng = _e$latlng.lng;

      if (this.showSuggestions === "from") {
        this.from = {
          lat: lat,
          lng: lng
        };
        this.searchFrom = "lat: ".concat(lat, ", lng: ").concat(lng);
        this.showSuggestions = null;
      } else if (this.showSuggestions === "to") {
        this.to = {
          lat: lat,
          lng: lng
        };
        this.searchTo = "lat: ".concat(lat, ", lng: ").concat(lng);
        this.showSuggestions = null;
      }
    },
    updateWaypoints: function updateWaypoints() {
      this.waypoints = [this.from, this.to].filter(function (point) {
        return point.lat && point.lng;
      });
    },
    reloadPage: function reloadPage() {
      if (this.searchFrom && this.searchTo) {
        // Save values to localStorage
        localStorage.setItem("searchFrom", this.searchFrom);
        localStorage.setItem("searchTo", this.searchTo);
        localStorage.setItem("fromCoord", JSON.stringify(this.from));
        localStorage.setItem("toCoord", JSON.stringify(this.to)); // Reload the page

        location.reload();
      } else {
        alert("Both 'From' and 'To' fields must be filled to reload the page.");
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var leaflet_routing_machine_dist_leaflet_routing_machine_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet-routing-machine/dist/leaflet-routing-machine.css */ "./node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet-routing-machine */ "./node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js");
/* harmony import */ var leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__);



var props = {
  mapObject: {
    type: Object
  },
  visible: {
    type: Boolean,
    "default": true
  },
  waypoints: {
    type: Array,
    required: true
  },
  router: {
    type: leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__.IRouter
  },
  plan: {
    type: (leaflet__WEBPACK_IMPORTED_MODULE_1___default().Routing.Plan)
  },
  geocoder: {
    type: leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__.IGeocoder
  },
  fitSelectedRoutes: {
    type: [String, Boolean],
    "default": "smart"
  },
  lineOptions: {
    type: leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__.LineOptions
  },
  routeLine: {
    type: Function
  },
  autoRoute: {
    type: Boolean,
    "default": true
  },
  routeWhileDragging: {
    type: Boolean,
    "default": false
  },
  routeDragInterval: {
    type: Number,
    "default": 500
  },
  waypointMode: {
    type: String,
    "default": "connect"
  },
  useZoomParameter: {
    type: Boolean,
    "default": false
  },
  showAlternatives: {
    type: Boolean,
    "default": true
  },
  altLineOptions: {
    type: leaflet_routing_machine__WEBPACK_IMPORTED_MODULE_2__.LineOptions
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: props,
  name: "LRoutingMachine",
  data: function data() {
    return {
      ready: false,
      map: null,
      layer: null
    };
  },
  watch: {
    mapObject: function mapObject() {
      if (this.mapObject == null) {
        return;
      }

      this.add();
    }
  },
  mounted: function mounted() {
    this.add();
  },
  beforeUnmount: function beforeUnmount() {
    return this.layer ? this.layer.remove() : null;
  },
  methods: {
    add: function add() {
      if (this.mapObject == null) {
        return;
      }

      var waypoints = this.waypoints,
          fitSelectedRoutes = this.fitSelectedRoutes,
          autoRoute = this.autoRoute,
          routeWhileDragging = this.routeWhileDragging,
          routeDragInterval = this.routeDragInterval,
          waypointMode = this.waypointMode,
          useZoomParameter = this.useZoomParameter,
          showAlternatives = this.showAlternatives;
      var options = {
        waypoints: waypoints,
        fitSelectedRoutes: fitSelectedRoutes,
        autoRoute: autoRoute,
        routeWhileDragging: routeWhileDragging,
        routeDragInterval: routeDragInterval,
        waypointMode: waypointMode,
        useZoomParameter: useZoomParameter,
        showAlternatives: showAlternatives
      };
      var routingLayer = leaflet__WEBPACK_IMPORTED_MODULE_1___default().Routing.control(options);
      routingLayer.addTo(this.mapObject);
      this.layer = routingLayer;
      this.ready = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Route Optimization", -1
/* HOISTED */
);

var _hoisted_2 = {
  id: "app"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "from"
}, "From:", -1
/* HOISTED */
);

var _hoisted_4 = {
  key: 0,
  "class": "suggestions"
};
var _hoisted_5 = ["onClick"];

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "to"
}, "To:", -1
/* HOISTED */
);

var _hoisted_7 = {
  key: 1,
  "class": "suggestions"
};
var _hoisted_8 = ["onClick"];
var _hoisted_9 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_LRoutingMachine = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("LRoutingMachine");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("********************************************"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" searchFrom:  {{ searchFrom }}\n      searchTo: {{ searchTo }} "), _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "from",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.searchFrom = $event;
    }),
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.searchLocation('from');
    }),
    onFocus: _cache[2] || (_cache[2] = function ($event) {
      return $data.showSuggestions = 'from';
    }),
    placeholder: "Search or click on map"
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchFrom]]), $data.showSuggestions === 'from' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_4, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.suggestions, function (suggestion, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index,
      onClick: function onClick($event) {
        return $options.selectLocation(suggestion, 'from');
      }
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.display_name), 9
    /* TEXT, PROPS */
    , _hoisted_5);
  }), 128
  /* KEYED_FRAGMENT */
  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "to",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.searchTo = $event;
    }),
    onInput: _cache[4] || (_cache[4] = function ($event) {
      return $options.searchLocation('to');
    }),
    onFocus: _cache[5] || (_cache[5] = function ($event) {
      return $data.showSuggestions = 'to';
    }),
    placeholder: "Search or click on map"
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchTo]]), $data.showSuggestions === 'to' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.suggestions, function (suggestion, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index,
      onClick: function onClick($event) {
        return $options.selectLocation(suggestion, 'to');
      }
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.display_name), 9
    /* TEXT, PROPS */
    , _hoisted_8);
  }), 128
  /* KEYED_FRAGMENT */
  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.reloadPage && $options.reloadPage.apply($options, arguments);
    }),
    "class": "reload-button"
  }, "Reload Page"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("********************************************"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: $data.mapId,
    "class": "map"
  }, null, 8
  /* PROPS */
  , _hoisted_9), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LRoutingMachine, {
    mapObject: $data.mapObject,
    waypoints: $data.waypoints
  }, null, 8
  /* PROPS */
  , ["mapObject", "waypoints"])])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nhtml,\nbody,\n#app {\n  /* height: 100%;\n  margin: 0; */\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n.map {\n    position: relative;\n  width: 100%;\n  height: 100vh;\n  /* position: absolute;\n  width: 50%;\n  height: 100%; */\n}\n@media (max-width: 768px) {\n.map {\n    height: 80vh; /* Slightly smaller map for smaller devices */\n}\n}\n@media (max-width: 768px) {\n.map {\n    width: 100%; /* Full width for tablets and phones */\n    height: 70vh; /* Adjust height for smaller screens */\n}\n}\n.suggestions {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  border: 1px solid #ccc;\n  max-height: 150px;\n  overflow-y: auto;\n  background-color: #fff;\n}\n.suggestions li {\n  padding: 8px;\n  cursor: pointer;\n}\n.suggestions li:hover {\n  background-color: #f0f0f0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_style_index_0_id_405cc0b1_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_style_index_0_id_405cc0b1_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_style_index_0_id_405cc0b1_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/Pages/Issues/ViewB.vue":
/*!*********************************************!*\
  !*** ./resources/js/Pages/Issues/ViewB.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewB_vue_vue_type_template_id_405cc0b1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewB.vue?vue&type=template&id=405cc0b1 */ "./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1");
/* harmony import */ var _ViewB_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewB.vue?vue&type=script&lang=js */ "./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewB_vue_vue_type_style_index_0_id_405cc0b1_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css */ "./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ViewB_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ViewB_vue_vue_type_template_id_405cc0b1__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Issues/ViewB.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Shared/LRoutingMachine.vue":
/*!*************************************************!*\
  !*** ./resources/js/Shared/LRoutingMachine.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LRoutingMachine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LRoutingMachine.vue?vue&type=script&lang=js */ "./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_LRoutingMachine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/Shared/LRoutingMachine.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewB.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LRoutingMachine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LRoutingMachine_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LRoutingMachine.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Shared/LRoutingMachine.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_template_id_405cc0b1__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_template_id_405cc0b1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewB.vue?vue&type=template&id=405cc0b1 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=template&id=405cc0b1");


/***/ }),

/***/ "./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewB_vue_vue_type_style_index_0_id_405cc0b1_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/ViewB.vue?vue&type=style&index=0&id=405cc0b1&lang=css");


/***/ })

}]);