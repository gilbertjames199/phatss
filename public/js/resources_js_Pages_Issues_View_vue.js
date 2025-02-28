"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Issues_View_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
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
        lat: this.$props.lat_from,
        lng: this.$props.long_from
      },
      //   osmUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      //   osmUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      //   waypoints,
      osmUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      from: {
        lat: this.$props.lat_from,
        lng: this.$props.long_from
      },
      to: {
        lat: this.$props.lat_to,
        lng: this.$props.long_to
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
    // this.mapObject.on("click", this.handleMapClick);
    // Restore values from localStorage

    var storedFrom = localStorage.getItem("searchFrom");
    var storedTo = localStorage.getItem("searchTo");

    if (storedFrom) {
      this.searchFrom = storedFrom;
      this.from = JSON.parse(localStorage.getItem("fromCoord"));
    }

    if (storedTo) {
      this.searchTo = storedTo;
      this.to = JSON.parse(localStorage.getItem("toCoord"));
    } // Add markers for the initial "from" and "to" locations
    // Calculate the center as the average of from and to coordinates


    if (this.from.lat && this.to.lat) {
      this.center = {
        lat: (this.from.lat + this.to.lat) / 2,
        lng: (this.from.lng + this.to.lng) / 2
      };
    }

    this.updateWaypoints(); // this.$nextTick(() => {
    //     setTimeout(() => {
    // if (this.from.lat && this.from.lng) {
    //     this.addMarker(this.from, "From Location");
    // }
    // if (this.to.lat && this.to.lng) {
    //     this.addMarker(this.to, "To Location");
    // }
    //     }, 2000);
    // })
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
      var _this2 = this;

      //   this.waypoints = [this.from, this.to].filter((point) => point.lat && point.lng);
      // alert("update way popints");
      this.waypoints = [{
        lat: this.lat_from,
        lng: this.long_from
      }, {
        lat: this.lat_to,
        lng: this.long_to
      }]; // Clear old markers (optional)

      this.mapObject.eachLayer(function (layer) {
        if (layer instanceof (leaflet__WEBPACK_IMPORTED_MODULE_2___default().Marker)) {
          _this2.mapObject.removeLayer(layer);
        }
      }); // Re-add markers

      this.addMarker(this.from, "From Location");
      this.addMarker(this.to, "To Location");
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
    },
    addMarker: function addMarker(location, label) {
      leaflet__WEBPACK_IMPORTED_MODULE_2___default().marker([location.lat, location.lng]).addTo(this.mapObject).bindPopup("<b>".concat(label, "</b><br>Lat: ").concat(location.lat, ", Lng: ").concat(location.lng)).openPopup();
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
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

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Nearest Response Center", -1
/* HOISTED */
);

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
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

var _hoisted_5 = {
  id: "app"
};
var _hoisted_6 = {
  "class": "row"
};
var _hoisted_7 = {
  "class": "col-md-3 position-relative"
};
var _hoisted_8 = {
  "class": "table-container"
};
var _hoisted_9 = {
  "class": "table-responsive"
};
var _hoisted_10 = {
  "class": "table table-bordered"
};

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", {
  style: {
    "background-color": "dimgray",
    "color": "white"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  colspan: "2"
}, "ISSUE DETAILS")], -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Description:")], -1
/* HOISTED */
);

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Location:")], -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Type: ")], -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", {
  style: {
    "background-color": "dimgray",
    "color": "white"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  colspan: "2"
}, "NEAREST HEALTH/RESPONSE CENTER")], -1
/* HOISTED */
);

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Center name:")], -1
/* HOISTED */
);

var _hoisted_17 = {
  key: 0
};
var _hoisted_18 = {
  key: 1
};

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Distance: ")], -1
/* HOISTED */
);

var _hoisted_20 = {
  "class": "col-md-9 position-relative"
};

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, null, -1
/* HOISTED */
);

var _hoisted_22 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Link");

  var _component_LRoutingMachine = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("LRoutingMachine");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div>\n        This form shows the way points from the location of the issue reported to the nearest response center recorded in our database.\n    </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Link, {
    href: "/issue"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_4];
    }),
    _: 1
    /* STABLE */

  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("********************************************"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_10, [_hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.issue.issue), 1
  /* TEXT */
  )])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.issue.barangay), 1
  /* TEXT */
  )])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.issue.type), 1
  /* TEXT */
  )])]), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, [$props.nhc.DESC === 'Provincial Hospital' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, "Davao de Oro " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.nhc.DESC) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.nhc.municipality), 1
  /* TEXT */
  )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.nhc.type) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.nhc.municipality), 1
  /* TEXT */
  ))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.format_number($props.nhc.distance, 2, true)) + " KM", 1
  /* TEXT */
  )])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: $data.mapId,
    "class": "map"
  }, null, 8
  /* PROPS */
  , _hoisted_22), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LRoutingMachine, {
    mapObject: $data.mapObject,
    waypoints: $data.waypoints
  }, null, 8
  /* PROPS */
  , ["mapObject", "waypoints"])])])])])], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\nhtml,\nbody,\n#app {\n  /* height: 100%;\n  margin: 0; */\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n.map {\n    position: relative;\n  width: 100%;\n  height: 100vh;\n  /* position: absolute;\n  width: 50%;\n  height: 100%; */\n}\n@media (max-width: 768px) {\n.map {\n    height: 80vh; /* Slightly smaller map for smaller devices */\n}\n}\n@media (max-width: 768px) {\n.map {\n    width: 100%; /* Full width for tablets and phones */\n    height: 70vh; /* Adjust height for smaller screens */\n}\n}\n.suggestions {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  border: 1px solid #ccc;\n  max-height: 150px;\n  overflow-y: auto;\n  background-color: #fff;\n}\n.suggestions li {\n  padding: 8px;\n  cursor: pointer;\n}\n.suggestions li:hover {\n  background-color: #f0f0f0;\n}\n.table-container {\n    border: 2px solid black !important;\n    padding: 5px; /* Optional: To avoid text touching the border */\n}\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_style_index_0_id_441bfce1_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./View.vue?vue&type=style&index=0&id=441bfce1&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_style_index_0_id_441bfce1_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_style_index_0_id_441bfce1_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/Pages/Issues/View.vue":
/*!********************************************!*\
  !*** ./resources/js/Pages/Issues/View.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View_vue_vue_type_template_id_441bfce1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.vue?vue&type=template&id=441bfce1 */ "./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1");
/* harmony import */ var _View_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View.vue?vue&type=script&lang=js */ "./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js");
/* harmony import */ var _View_vue_vue_type_style_index_0_id_441bfce1_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View.vue?vue&type=style&index=0&id=441bfce1&lang=css */ "./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_View_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_View_vue_vue_type_template_id_441bfce1__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Issues/View.vue"]])
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

/***/ "./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./View.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=script&lang=js");
 

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

/***/ "./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1 ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_template_id_441bfce1__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_template_id_441bfce1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./View.vue?vue&type=template&id=441bfce1 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=template&id=441bfce1");


/***/ }),

/***/ "./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css":
/*!****************************************************************************************!*\
  !*** ./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_View_vue_vue_type_style_index_0_id_441bfce1_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./View.vue?vue&type=style&index=0&id=441bfce1&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Issues/View.vue?vue&type=style&index=0&id=441bfce1&lang=css");


/***/ })

}]);