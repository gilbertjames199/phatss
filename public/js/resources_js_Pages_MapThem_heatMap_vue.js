"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_MapThem_heatMap_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var leaflet_heatmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet-heatmap */ "./node_modules/leaflet-heatmap/leaflet-heatmap.js");
/* harmony import */ var leaflet_heatmap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet_heatmap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);

 // import * as turf from "@turf/turf";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {},
  props: {
    count: String,
    p_mun: String,
    p_bar: String,
    p_pur: String,
    p_relrisk: String,
    p_my_filter: String,
    p_data: Object,
    barangays: Object,
    municipalities: Object,
    puroks: Object,
    g0: Object,
    g1: Object,
    g2: Object,
    g3: Object
  },
  data: function data() {
    return {
      myData: {
        max: 5,
        data: this.$props.p_data,
        lat_val: 0,
        lng_val: 0
      },
      baseLayer: null,
      heatmapLayer: null,
      map: null,
      mun: this.$props.p_mun,
      bar: this.$props.p_bar,
      relrisk: this.$props.p_relrisk,
      pur: this.$props.p_pur,
      my_filter: this.$props.p_my_filter,
      home_lang: null,
      home_lat: null
    };
  },
  watch: {// p_mun(newValue) {
    //     this.mun = newValue;
    // }
  },
  computed: {// comp_mun() {
    //     return this.p_mun;
    // },
    // comp_relrisk(){
    //     return this.relrisk;
    // }
  },
  //   beforeMounted(){
  //     this.mun=this.p_mun;
  //     alert(this.mun)
  //   },
  mounted: function mounted() {
    // alert(this.p_mun+ ' mun: '+this.mun);
    // this.mun=this.p_mun;
    // alert(this.p_mun+ ' mun: '+this.mun);
    // this.relrisk=this.p_relrisk;
    this.initMap();
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
      // Set up the base layer
      this.getLocation();

      if (this.lat_val != 0 && this.lng_val != 0) {
        this.baseLayer = leaflet__WEBPACK_IMPORTED_MODULE_1___default().tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
          maxZoom: 18,
          minZoom: 0
        }); // Heatmap configuration

        var cfg = {
          radius: 10,
          blur: 1,
          maxOpacity: 0.5,
          scaleRadius: false,
          useLocalExtrema: true,
          latField: "x",
          lngField: "y",
          valueField: "count" // gradient: {
          //     0.1: '#0000ff',  // Blue for 10
          //     0.2: '#008000',  // Green for 20
          //     0.3: '#ffa500',  // Orange for 30
          //     0.4: '#ff0000',  // Red for 40
          // }
          // gradient: {
          //     0.0: "#0eaae8",   // Cold color for very low density
          //     0.25: "#098abd",  // Transition from cold to slightly warm
          //     0.5: "#096fbd",   // Moderate density
          //     0.75: "#023ba6", // Warm color for high density
          //     1.0: "#010880"      // Bright color for very high density
          // }

        }; // Create heatmap layer

        this.heatmapLayer = new (leaflet_heatmap__WEBPACK_IMPORTED_MODULE_0___default())(cfg); //SET Coordinates

        this.home_lat = 7.6165921;
        this.home_lang = 126.0364403;
        var my_zoom = 9;

        if (this.mun) {
          this.setCoords();
          my_zoom = 11;
        } // Initialize the map


        this.map = new (leaflet__WEBPACK_IMPORTED_MODULE_1___default().map)("leafletMapid", {
          // center: new L.LatLng(this.lat_val, this.lng_val),
          // center: new L.LatLng(50.339247, 9.902947),
          center: new (leaflet__WEBPACK_IMPORTED_MODULE_1___default().LatLng)(this.home_lat, this.home_lang),
          zoom: my_zoom
        }); // Set data and add layers to the map

        this.heatmapLayer.setData(this.myData);
        this.baseLayer.addTo(this.map);
        this.heatmapLayer.addTo(this.map); // Add hover functionality to show tooltips with coordinates

        this.addHoverTooltips();
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
        // alert(type);
        // this.bar="";
        this.pur = "";
      }

      this.$inertia.get("/map/heat", {
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
          window.location.reload(); // this.mun=this.comp_mun;
          // this.relrisk=this.comp_relrisk;
        }
      });
    },
    clearFilter: function clearFilter() {
      this.mun = "";
      this.bar = "";
      this.pur = "";
      this.relrisk = "";
      this.my_filter = "";
      this.filter_me("");
    },
    addHoverTooltips: function addHoverTooltips() {
      var _this2 = this;

      // Loop through the data and create markers with tooltips for each point
      this.myData.data.forEach(function (point) {
        var color = '#99bccb'; // Default to blue for count = 10
        // if (point.count === 20) color = '#a7f174'; // Green for 20
        // else if (point.count === 30) color = '#e0df6d'; // Orange for 30
        // else if (point.count === 40) color = '#fa7d74'; // Red for 40

        var marker = leaflet__WEBPACK_IMPORTED_MODULE_1___default().circleMarker([point.x, point.y], {
          radius: 5,
          // You can adjust the radius as needed
          color: 'transparent',
          //color: 'transparent', // Makes the marker itself invisible
          // colorOpacity: 0.5,
          // fillColor: color,
          fillOpacity: 0 // Makes the fill transparent

        });
        var tooltipContent = "\n                <div style=\"text-align: left; font-size: 14px; line-height: 1.5;\">\n                    <span style='text-align: center'><h4>Household Details</h4></span><hr>\n                    <strong>Name:</strong> <u>".concat(point.name || "N/A", "</u><br>\n                    <strong>Address:</strong> <u>").concat(point.address || "N/A", "</u><br>\n                    <strong>Coordinates:</strong> <u>(").concat(point.x.toFixed(6), ", ").concat(point.y.toFixed(6), ")</u><br>\n                </div>\n            "); //  <table class="table table-sm table-borderless table-hover">
        //     <thead>
        //         <tr colspan="2" style='text-align: center'>
        //             <th><h4>Household Details</h4></th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td><strong>Name:</strong></td>
        //             <td><u>${point.name || "N/A"}</u></td>
        //         </tr>
        //         <tr>
        //             <td><strong>Address:</strong></td>
        //             <td><u>${point.address || "N/A"}</u></td>
        //         </tr>
        //         <tr>
        //             <td><strong>Coordinates:</strong></td>
        //             <td><u>(${point.x.toFixed(6)}, ${point.y.toFixed(6)})</u></td>
        //         </tr>
        //     </tbody>
        // </table>
        // // <strong>Count:</strong> ${point.count || "N/A"}
        // // `Coordinates: (${point.x.toFixed(6)}, ${point.y.toFixed(6)})`

        marker.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top'
        });
        marker.addTo(_this2.map);
      });
    },
    setCoords: function setCoords() {
      if (this.mun == 'Compostela') {
        this.home_lat = 7.6660;
        this.home_lang = 126.0847;
      }

      if (this.mun == 'Laak') {
        this.home_lat = 7.8771;
        this.home_lang = 125.7844;
      }

      if (this.mun == 'Mabini') {
        this.home_lat = 7.2821;
        this.home_lang = 125.8574;
      }

      if (this.mun == 'Maco') {
        this.home_lat = 7.3593;
        this.home_lang = 125.8580;
      }

      if (this.mun == 'Maragusan') {
        this.home_lat = 7.3522;
        this.home_lang = 126.1545;
      }

      if (this.mun == 'Mawab') {
        this.home_lat = 7.4969;
        this.home_lang = 125.9588;
      }

      if (this.mun == 'Monkayo') {
        this.home_lat = 7.8514;
        this.home_lang = 126.0458;
      }

      if (this.mun == 'Montevista') {
        this.home_lat = 7.7305;
        this.home_lang = 125.9806;
      }

      if (this.mun == 'Nabunturan') {
        this.home_lat = 7.6038;
        this.home_lang = 125.9632;
      }

      if (this.mun == 'New Bataan') {
        this.home_lat = 7.5547;
        this.home_lang = 126.1404;
      }

      if (this.mun == 'Pantukan') {
        // this.home_lat=7.2552;
        // this.home_lang = 126.1562;
        this.home_lat = 7.17728;
        this.home_lang = 126.02043;
      } // if(this.mun=='Laak'){
      //     this.home_lat=7.8771;
      //     this.home_lang = 125.7844;
      // }

    },
    getOptionText: function getOptionText(value) {
      var options = {
        "_1_has_toilet": "Have no toilet",
        "_2_toilet_used": "Have toilet but not being used",
        "_3_toilet_functional": "Toilet is not functional/well-maintained",
        "_4_soap": "Have no access to nearby soap and water",
        "_5_children": "Children's, elderly's, or PWD's feces and diapers not properly disposed",
        "_6_spaces": "Feces found in open spaces in the community",
        "_7_feces": "Feces, sanitary napkins, diapers, and solid waste found in open spaces in the community",
        "_8_composting": "Does not practice segregation or composting",
        "_9_dispose": "Do not dispose their garbage properly",
        "_10_emptied": "Have not emptied their septic tank",
        "_15_household": "Households that use a shared toilet",
        "_16_household": "Households that use a communal/public toilet",
        "_17_using": "Not using their own toilet"
      };
      return options[value] || "";
    } // generateInterpolatedData() {
    //     // Convert your data into a GeoJSON FeatureCollection
    //     const points = this.myData.data.map((point) => {
    //         return turf.point([point.y, point.x], { count: point.count });
    //     });
    //     const geojsonPoints = turf.featureCollection(points);
    //     // Create a bounding box around your data points
    //     const bbox = turf.bbox(geojsonPoints);
    //     // Generate a grid of points for interpolation
    //     const grid = turf.pointGrid(bbox, 0.01, { units: "kilometers" });
    //     // Perform IDW interpolation
    //     const options = { gridType: "point", property: "count", units: "kilometers" };
    //     const interpolated = turf.interpolate(geojsonPoints, grid, options);
    //     // Convert interpolated points back to the heatmap data format
    //     this.myData.data = interpolated.features.map((feature) => {
    //         const [y, x] = feature.geometry.coordinates;
    //         return { x, y, count: feature.properties.count || 0 };
    //     });
    //     // Reinitialize the heatmap with the new interpolated data
    //     this.initMap();
    // }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-63520288"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};

var _hoisted_1 = {
  "class": "row gap-20 masonry pos-r"
};
var _hoisted_2 = {
  "class": "masonry-item w-100"
};
var _hoisted_3 = {
  "class": "row gap-20"
};

var _hoisted_4 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "col-md-9"
  }, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "layers bd bgc-white p-20"
  }, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "leafletMapid",
    "class": "mapdiv border border-dark"
  })])], -1
  /* HOISTED */
  );
});

var _hoisted_5 = {
  "class": "col-md-3"
};
var _hoisted_6 = {
  "class": "layers bd bgc-white p-20"
};
var _hoisted_7 = {
  "class": "layer w-100 mB-10"
};

var _hoisted_8 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("FILTERS"), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br")], -1
  /* HOISTED */
  );
});

var _hoisted_9 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_10 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Municipality:", -1
  /* HOISTED */
  );
});

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ");

var _hoisted_12 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ");

var _hoisted_14 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Barangays: ", -1
  /* HOISTED */
  );
});

var _hoisted_15 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ");

var _hoisted_17 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Puroks: ", -1
  /* HOISTED */
  );
});

var _hoisted_18 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ");

var _hoisted_20 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Type: ", -1
  /* HOISTED */
  );
});

var _hoisted_21 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_22 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "G0", -1
  /* HOISTED */
  );
});

var _hoisted_23 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "G1", -1
  /* HOISTED */
  );
});

var _hoisted_24 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "G2", -1
  /* HOISTED */
  );
});

var _hoisted_25 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", null, "G3", -1
  /* HOISTED */
  );
});

var _hoisted_26 = [_hoisted_21, _hoisted_22, _hoisted_23, _hoisted_24, _hoisted_25];

var _hoisted_27 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_28 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Additional Filters: ", -1
  /* HOISTED */
  );
});

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option data-v-63520288></option><option value=\"_1_has_toilet\" data-v-63520288>Have no toilet</option><option value=\"_2_toilet_used\" data-v-63520288>Have toilet but not being used</option><option value=\"_3_toilet_functional\" data-v-63520288>Toilet is not functional/well-maintained</option><option value=\"_4_soap\" data-v-63520288>Have no access to nearby soap and water</option><option value=\"_5_children\" data-v-63520288>Children&#39;s, elderly&#39;s, or PWD&#39;s feces and diapers not properly disposed</option><option value=\"_6_spaces\" data-v-63520288>Feces found in open spaces in the community</option><option value=\"_7_feces\" data-v-63520288>Feces, sanitary napkins, diapers, and solid waste found in open spaces in the community</option><option value=\"_8_composting\" data-v-63520288>Does not practice segregation or composting</option><option value=\"_9_dispose\" data-v-63520288>Do not dispose their garbage properly</option><option value=\"_10_emptied\" data-v-63520288>Have not emptied their septic tank</option><option value=\"_15_household\" data-v-63520288>Households that use a shared toilet</option><option value=\"_16_household\" data-v-63520288>Households that use a communal/public toilet</option><option value=\"_17_using\" data-v-63520288>Not using their own toilet</option>", 14);

var _hoisted_43 = [_hoisted_29];

var _hoisted_44 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_45 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_46 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Additional Details", -1
  /* HOISTED */
  );
});

var _hoisted_47 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Count: ", -1
  /* HOISTED */
  );
});

var _hoisted_48 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)();

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div>\n        <div class=\"row gap-5 masonry pos-r\">\n\n            <div class=\"peers fxw-nw jc-sb ai-c\">\n\n            </div>\n        </div>\n\n    </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ count }} mun: {{ mun }} &nbsp;p_mun: {{ p_mun }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("MAP"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getOptionText($data.my_filter)), 1
  /* TEXT */
  ), _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("FILTERS"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_hoisted_8, _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ municipalities }} "), _hoisted_10, _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.mun = $event;
    }),
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.filter_me('mun');
    })
  }, [_hoisted_12, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.municipalities, function (municipality) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(municipality), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <option>Compostela</option>\n                                <option>Laak</option>\n                                <option>Mabini</option>\n                                <option>Maco</option>\n                                <option>Maragusan</option>\n                                <option>Mawab</option>\n                                <option>Monkayo</option>\n                                <option>Montevista</option>\n                                <option>Nabunturan</option>\n                                <option>New Bataan</option>\n                                <option>Pantukan</option> ")], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.mun]]), _hoisted_13, _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.bar = $event;
    }),
    onChange: _cache[3] || (_cache[3] = function ($event) {
      return $options.filter_me('bar');
    })
  }, [_hoisted_15, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.barangays, function (barangay) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(barangay), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.bar]]), _hoisted_16, _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.pur = $event;
    }),
    onChange: _cache[5] || (_cache[5] = function ($event) {
      return $options.filter_me('pur');
    })
  }, [_hoisted_18, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.puroks, function (purok) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(purok), 1
    /* TEXT */
    );
  }), 256
  /* UNKEYED_FRAGMENT */
  ))], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.pur]]), _hoisted_19, _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.relrisk = $event;
    }),
    onChange: _cache[7] || (_cache[7] = function ($event) {
      return $options.filter_me('relrisk');
    })
  }, _hoisted_26, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.relrisk]]), _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button class=\"btn btn-danger text-white\" @click=\"clearFilter\">Clear Filters</button> "), _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return $data.my_filter = $event;
    }),
    onChange: _cache[9] || (_cache[9] = function ($event) {
      return $options.filter_me('relrisk');
    })
  }, _hoisted_43, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.my_filter]]), _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-danger text-white",
    onClick: _cache[10] || (_cache[10] = function () {
      return $options.clearFilter && $options.clearFilter.apply($options, arguments);
    })
  }, "Clear Filters"), _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_hoisted_46, _hoisted_47, _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.format_number($props.count, 0, true)), 1
  /* TEXT */
  )])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" myData: {{ myData }}\n  p_data: {{ p_data }} ")], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.mapdiv[data-v-63520288] {\n  width: 100%;\n  height: 500px; /* Adjust the height as needed */\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_style_index_0_id_63520288_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_style_index_0_id_63520288_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_style_index_0_id_63520288_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap.vue":
/*!************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _heatMap_vue_vue_type_template_id_63520288_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heatMap.vue?vue&type=template&id=63520288&scoped=true */ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true");
/* harmony import */ var _heatMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heatMap.vue?vue&type=script&lang=js */ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js");
/* harmony import */ var _heatMap_vue_vue_type_style_index_0_id_63520288_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css */ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css");
/* harmony import */ var C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,C_xampp_htdocs_PhATSS_ML_PhATSS_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_heatMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_heatMap_vue_vue_type_template_id_63520288_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-63520288"],['__file',"resources/js/Pages/MapThem/heatMap.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true":
/*!******************************************************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_template_id_63520288_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_template_id_63520288_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap.vue?vue&type=template&id=63520288&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=template&id=63520288&scoped=true");


/***/ }),

/***/ "./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css":
/*!********************************************************************************************************!*\
  !*** ./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_heatMap_vue_vue_type_style_index_0_id_63520288_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/MapThem/heatMap.vue?vue&type=style&index=0&id=63520288&scoped=true&lang=css");


/***/ })

}]);