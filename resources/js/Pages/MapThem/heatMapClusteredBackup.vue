<template>
    <!-- <div>
        <div class="row gap-5 masonry pos-r">

            <div class="peers fxw-nw jc-sb ai-c">

            </div>
        </div>

    </div> -->
        <!-- {{ count }} mun: {{ mun }} &nbsp;p_mun: {{ p_mun }} -->

    <div class="row gap-20 masonry pos-r">
        <div class="masonry-item w-100">
            <div class="row gap-20">
                <!--MAP-->
                <!-- <button @click="clearSelection" class="btn btn-danger text-white mt-2" v-if="selectedPoint">Clear Selection</button> -->
                <h4>{{ getOptionText(my_filter) }}</h4>
                <div class="col-md-9">

                    <div class="layers bd bgc-white p-20">
                        <div id="leafletMapid" class="mapdiv border border-dark"></div>
                    </div>
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h4>FILTERS<br></h4>
                            <hr>
                            <!-- {{ municipalities }} -->
                            <b>Municipality:</b> &nbsp;
                            <!-- <select class="form-control"  @change="filter_me('mun')"> -->
                            <select class="form-control" v-model="mun" @change="filter_me('mun')">
                                <option></option>
                                <option v-for="municipality in municipalities">
                                    {{ municipality }}
                                </option>
                                <!-- <option>Compostela</option>
                                <option>Laak</option>
                                <option>Mabini</option>
                                <option>Maco</option>
                                <option>Maragusan</option>
                                <option>Mawab</option>
                                <option>Monkayo</option>
                                <option>Montevista</option>
                                <option>Nabunturan</option>
                                <option>New Bataan</option>
                                <option>Pantukan</option> -->
                            </select>
                            &nbsp;
                            <b>Barangays: </b>
                            <select class="form-control"  v-model="bar" @change="filter_me('bar')">
                                <option></option>
                                <option v-for="barangay in barangays">
                                    {{ barangay }}
                                </option>
                            </select>
                            &nbsp;
                            <b>Puroks: </b>
                            <select class="form-control"  v-model="pur" @change="filter_me('pur')">
                                <option></option>
                                <option v-for="purok in puroks">
                                    {{ purok }}
                                </option>
                            </select>
                            &nbsp;
                            <b>Type: </b>
                            <select class="form-control" v-model="relrisk" @change="filter_me('relrisk')">
                                <option></option>
                                <option>G0</option>
                                <option>G1</option>
                                <option>G2</option>
                                <option>G3</option>
                            </select>
                            <br>
                            <!-- <button class="btn btn-danger text-white" @click="clearFilter">Clear Filters</button> -->

                            <b>Additional Filters: </b>
                            <select class="form-control" v-model="my_filter" @change="filter_me('relrisk')">
                                <option></option>
                                <option value="_1_has_toilet">Households with no toilet</option>
                                <option value="_2_toilet_used">Households with toilet but not being used</option>
                                <option value="_3_toilet_functional">Households with toilet but is not functional/well-maintained</option>
                                <option value="_4_soap">Households with no access to nearby soap and water</option>
                                <option value="_5_children">Children, elderly, or PWD's feces and diapers not properly disposed</option>
                                <option value="_6_spaces">Feces found in open spaces in the community</option>
                                <option value="_7_feces">Feces, sanitary napkins, diapers, and solid waste found in open spaces in the community</option>
                                <option value="_8_composting">Households that do not practice segregation or composting</option>
                                <option value="_9_dispose">Households that do not dispose their garbage properly</option>
                                <option value="_10_emptied">Have not emptied their septic tank</option>
                                <option value="_15_household">Households that use a shared toilet</option>
                                <option value="_16_household">Households that use a communal/public toilet</option>
                                <option value="_17_using">Households not using their own toilet</option>
                            </select>
                            <br>
                            <button class="btn btn-danger text-white" @click="clearFilter">Clear Filters</button>
                            <hr>
                            <span >
                                <h4>Additional Details</h4>
                                <b>Count: </b> <u>{{ format_number(count,0,true) }}</u>
                            </span>

                        </div>

                    </div>
                </div>
                <div class="col-md-3" v-if="selectedPoint">
                    <div class="layers bd bgc-white p-20">

                        <div class="layer w-100 mB-10">
                            <div class="d-flex justify-content-between align-items-center">
                                <h4>Details</h4>
                                <button v-if="selectedPoint" @click="clearSelection" class="btn btn-danger text-white"><b>X</b></button>
                            </div>
                            <hr>
                            <div >
                                <p><strong>Name:</strong> <u>{{ selectedPoint.name || "N/A" }}</u></p>
                                <p><strong>Address:</strong> <u>{{ selectedPoint.address || "N/A" }}</u></p>
                                <p><strong>Precision:</strong> <u>{{ selectedPoint.precision || "N/A" }}</u></p>
                                <p><strong>Risk Level:</strong> <u>{{ selectedPoint.risk_level || "N/A" }}</u></p>
                                <p><strong>Relative Risk Assessment:</strong> <u>{{ selectedPoint.relative_risk_assessment || "N/A" }}</u></p>
                                <p><strong>Coordinates:</strong> <u>({{ selectedPoint.x.toFixed(6) }}, {{ selectedPoint.y.toFixed(6) }})</u></p>
                                <!-- <p><strong>Relative Risk Assessment:</strong> <u>{{ selectedPoint.relative_risk_assessment }}</u></p>
                                <p><strong>Coordinates:</strong> <u>({{ selectedPoint.x.toFixed(6) }}, {{ selectedPoint.y.toFixed(6) }})</u></p> -->
                                <p><strong>1.)  Is there a toilet?</strong> <u>{{ selectedPoint._1_has_toilet }}</u></p>
                                <p><strong>2.) Is it being used?</strong> <u>{{ selectedPoint._2_toilet_used }}</u></p>
                                <p><strong>3.) Is the toilet functional and well maintained?</strong> <u>{{ selectedPoint._3_toilet_functional }}</u></p>
                                <p><strong>4.) Is there soap and water at or near the toilet?</strong> <u>{{ selectedPoint._4_soap }}</u></p>
                                <p><strong>5.)  Are children, elderly, and PWDs' feces and diaper properly disposed? <br>(Y/N/NA if there are no children, elderly, and PWD members in the household)</strong> <u>{{ selectedPoint._5_children }}</u></p>
                                <p><strong>6.) Are there no more feces found in open spaces in the community?</strong> <u>{{ selectedPoint._6_spaces }}</u></p>
                                <p><strong>7.) Are there no feces, sanitary napkins, diapers, and solid waste found in <br>open spaces in the community? (Y/N)</strong> <u>{{ selectedPoint._7_feces }}</u></p>
                                <p><strong>8.) Does the household practice waste segregation and/or composting? G2</strong> <u>{{ selectedPoint._8_composting }}</u></p>
                                <p><strong>9.) Does the household dispose of their garbage properly? G2</strong> <u>{{ selectedPoint._9_dispose }}</u></p>
                                <p><strong>10.) Have you ever emptied your septic tank or pit? (Y/N) G3</strong> <u>{{ selectedPoint._10_emptied }}</u></p>
                                <p><strong>11.) Is there a Municipal Sewerage Treatment Facility?</strong> <u>{{ selectedPoint._13_sewer }}</u></p>
                                <p><strong>12.) Does the household use a shared toilet? (G1)</strong> <u>{{ selectedPoint._15_household }}</u></p>
                                <p><strong>13.) Does the household use a communal/public toilet? (G1)</strong> <u>{{ selectedPoint._16_household }}</u></p>
                                <p><strong>14.) Is the household using their own toilet?</strong> <u>{{ selectedPoint._17_using }}</u></p>
                                <p><strong>15.) Visit the Materials Recovery Facility (MRF) in the barangay. Is the MRF Functional?</strong> <u>{{ selectedPoint._19_materials }}</u></p>
                                <button></button>
                                <!-- <p><strong>1.)  Is there a toilet?</strong> <u>{{ point._1_has_toilet || "N/A" }}</u></p>
                                <p><strong>2.) Is it being used?</strong> <u>{{ point._2_toilet_used || "N/A" }}</u></p>
                                <p><strong>3.) Is the toilet functional and well maintained?</strong> <u>{{ point._3_toilet_functional || "N/A" }}</u></p>
                                <p><strong>4.) Is there soap and water at or near the toilet?</strong> <u>{{ point._4_soap || "N/A" }}</u></p>
                                <p><strong>5.)  Are children, elderly, and PWDs' feces and diaper properly disposed? <br>(Y/N/NA if there are no children, elderly, and PWD members in the household)</strong> <u>{{ point._5_children || "N/A" }}</u></p>
                                <p><strong>6.) Are there no more feces found in open spaces in the community?</strong> <u>{{ point._6_spaces || "N/A" }}</u></p>
                                <p><strong>7.) Are there no feces, sanitary napkins, diapers, and solid waste found in <br>open spaces in the community? (Y/N)</strong> <u>{{ point._7_feces || "N/A" }}</u></p>
                                <p><strong>8.) Does the household practice waste segregation and/or composting? G2</strong> <u>{{ point._8_composting || "N/A" }}</u></p>
                                <p><strong>9.) Does the household dispose of their garbage properly? G2</strong> <u>{{ point._9_dispose || "N/A" }}</u></p>
                                <p><strong>10.) Have you ever emptied your septic tank or pit? (Y/N) G3</strong> <u>{{ point._10_emptied || "N/A" }}</u></p>
                                <p><strong>11.) Is there a Municipal Sewerage Treatment Facility?</strong> <u>{{ point._13_sewer || "N/A" }}</u></p>
                                <p><strong>12.) Does the household use a shared toilet? (G1)</strong> <u>{{ point._15_household || "N/A" }}</u></p>
                                <p><strong>13.) Does the household use a communal/public toilet? (G1)</strong> <u>{{ point._16_household || "N/A" }}</u></p>
                                <p><strong>14.) Is the household using their own toilet?</strong> <u>{{ point._17_using || "N/A" }}</u></p>
                                <p><strong>15.) Visit the Materials Recovery Facility (MRF) in the barangay. Is the MRF Functional?</strong> <u>{{ point._19_materials || "N/A" }}</u></p> -->

                            </div>
                            <div >
                                <!-- <p>No point selected. Click on a point in the map to view details.</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!--FILTERS-->
                <div class="col-md-3">

                </div>
            </div>
        </div>
    </div>
  <!-- myData: {{ myData }}
  p_data: {{ p_data }} -->
</template>

<script>
import HeatmapOverlay from "leaflet-heatmap";
import L from "leaflet";
// import * as turf from "@turf/turf";

export default {
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
    g3: Object,
  },
  data() {
    return {
      myData: {
        max: 5,
        data: this.$props.p_data,
        lat_val: 0,
        lng_val: 0,
      },
      selectedMarker: null,
      baseLayer: null,
      heatmapLayer: null,
      map: null,
      mun: this.$props.p_mun,
      bar: this.$props.p_bar,
      relrisk: this.$props.p_relrisk,
      pur: this.$props.p_pur,
      my_filter: this.$props.p_my_filter,
      home_lang: null,
      home_lat: null,
      selectedPoint: null,
    };
  },
  watch: {
    // p_mun(newValue) {
    //     this.mun = newValue;
    // }
  },
  computed: {
    // comp_mun() {
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
  mounted() {
    // alert(this.p_mun+ ' mun: '+this.mun);
    // this.mun=this.p_mun;
    // alert(this.p_mun+ ' mun: '+this.mun);
    // this.relrisk=this.p_relrisk;
    this.initMap();
  },
  methods: {
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat_val = position.coords.latitude;
                this.lng_val = position.coords.longitude;
                this.initMap();
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        // if (navigator.geolocation) {
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
    // gradient: {
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
    initMap() {
        // Set up the base layer
        this.getLocation();
        if(this.lat_val!=0 && this.lng_val!=0){
            this.baseLayer = L.tileLayer(
                "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                attribution:
                    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18,
                minZoom: 0,
                }
            );

            // Heatmap configuration
            const cfg = {
                radius: 10,
                blur: 1,
                maxOpacity: 0.5,
                scaleRadius: false,
                useLocalExtrema: true,
                latField: "x",
                lngField: "y",
                valueField: "count",

            };

            // Create heatmap layer
            this.heatmapLayer = new HeatmapOverlay(cfg);
            //SET Coordinates
            this.home_lat=7.6165921;
            this.home_lang=126.0364403;
            var my_zoom=9;
            if(this.mun){
                this.setCoords();
                my_zoom=11;
            }
            // Initialize the map
            this.map = new L.map("leafletMapid", {
                // center: new L.LatLng(this.lat_val, this.lng_val),
                // center: new L.LatLng(50.339247, 9.902947),
                center: new L.LatLng(this.home_lat, this.home_lang),
                zoom: my_zoom,
            });

            // Set data and add layers to the map
            this.heatmapLayer.setData(this.myData);
            this.baseLayer.addTo(this.map);
            this.heatmapLayer.addTo(this.map);

            // Add hover functionality to show tooltips with coordinates
            this.addHoverTooltips();
            this.addMarkers();

        }

    },
    filter_me(type){
        // alert(this.mun)
        if(type==='mun'){
            // alert(type);
            this.bar="";
            this.pur="";
        }
        if(type==='bar'){
            // alert(type);
            // this.bar="";
            this.pur="";
        }
        this.$inertia.get(
                "/map/heat",
                {
                    mun: this.mun,
                    bar: this.bar,
                    pur: this.pur,
                    relrisk: this.relrisk,
                    my_filter: this.my_filter
                    // division: this.division_selected
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                    onSuccess: () => {
                        window.location.reload();
                        // this.mun=this.comp_mun;
                        // this.relrisk=this.comp_relrisk;
                    },
                }
            );
    },
    clearFilter(){
        this.mun="";
        this.bar="";
        this.pur="";
        this.relrisk="";
        this.my_filter="";
        this.filter_me("");
    },
    addHoverTooltips() {
        // Loop through the data and create markers with tooltips for each point
        this.myData.data.forEach(point => {
            let color = '#99bccb'; // Default to blue for count = 10
            // if (point.count === 20) color = '#a7f174'; // Green for 20
            // else if (point.count === 30) color = '#e0df6d'; // Orange for 30
            // else if (point.count === 40) color = '#fa7d74'; // Red for 40

            const marker = L.circleMarker([point.x, point.y], {
                radius: 5, // You can adjust the radius as needed
                color: 'transparent',//color: 'transparent', // Makes the marker itself invisible
                // colorOpacity: 0.5,
                // fillColor: color,
                fillOpacity: 0 // Makes the fill transparent
            });
            const tooltipContent = `
                <div style="text-align: left; font-size: 14px; line-height: 1.5;">
                    <span style='text-align: center'><h4>Household Details</h4></span><hr>
                    <strong>Name:</strong> <u>${point.name || "N/A"}</u><br>
                    <strong>Address:</strong> <u>${point.address || "N/A"}</u><br>
                    <strong>Precision:</strong> <u>${point.precision || "N/A"}</u><br>
                    <strong>Risk Level:</strong> <u>${point.risk_level || "N/A"}</u><br>
                    <strong>Relative Risk Assessment:</strong> <u>${point.relative_risk_assessment || "N/A"}</u><br>
                    <strong>Coordinates:</strong> <u>(${point.x.toFixed(6)}, ${point.y.toFixed(6)})</u><br>

                </div>
            `;
                /*<strong>1.)  Is there a toilet?</strong> <u>${point._1_has_toilet || "N/A"}</u><br>
                    <strong>2.) Is it being used?</strong> <u>${point._2_toilet_used || "N/A"}</u><br>sasas
                    <strong>3.) Is the toilet functional and well maintained?</strong> <u>${point._3_toilet_functional || "N/A"}</u><br>
                    <strong>4.) Is there soap and water at or near the toilet?</strong> <u>${point._4_soap || "N/A"}</u><br>
                    <strong>5.)  Are children, elderly, and PWDs' feces and diaper properly disposed. <br>(Y/N/NA if there are no children, elderly and PWD members in the household)</strong> <u>${point._5_children || "N/A"}</u><br>
                    <strong>6.) Are there no more feces found in open spaces in the community?</strong> <u>${point._6_spaces || "N/A"}</u><br>
                    <strong>7.) Are there no feces, sanitary napkins, diapers and solid waste found in <br>open spaces in the community? (Y/N)</strong> <u>${point._7_feces || "N/A"}</u><br>
                    <strong>8.) Does the household practice waste segregation and/or composting? G2</strong> <u>${point._8_composting || "N/A"}</u><br>
                    <strong>9.) Does the household dispose their garbage properly? G2</strong> <u>${point._9_dispose || "N/A"}</u><br>
                    <strong>10.) Have you ever emptied your septic tank or pit? (Y/N) G3</strong> <u>${point._10_emptied || "N/A"}</u><br>
                    <strong>11.) Is there a Municipal Sewerage Treatment Facility?</strong> <u>${point._13_sewer || "N/A"}</u><br>
                    <strong>12.) Does the household use a shared toilet? (G1)</strong> <u>${point._15_household || "N/A"}</u><br>
                    <strong>13.) Does the household use a communal/public toilet (G1)</strong> <u>${point._16_household || "N/A"}</u><br>
                    <strong>14.) Is the household using their own toilet?</strong> <u>${point._17_using || "N/A"}</u><br>
                    <strong>15.) Visit the Materials Recovery Facility (MRF) in the barangay. Is the MRF Functional?</strong> <u>${point._19_materials || "N/A"}</u><br>*/
            // // <strong>Count:</strong> ${point.count || "N/A"}
            // // `Coordinates: (${point.x.toFixed(6)}, ${point.y.toFixed(6)})`
            marker.bindTooltip(tooltipContent, {
                permanent: false,
                direction: 'top'
            });

            marker.addTo(this.map);
        });
    },
    addMarkers() {
      this.myData.data.forEach(point => {
        const marker = L.circleMarker([point.x, point.y], {
          radius: 5,
          color: "transparent",
          fillOpacity: 0
        }).addTo(this.map);

        marker.on("click", () => {
          if (this.selectedMarker) {
            this.map.removeLayer(this.selectedMarker);
          }
          this.selectedMarker = L.marker([point.x, point.y]).addTo(this.map);
          this.selectedPoint = point;
        });
      });
    },
    setCoords(){
        if(this.mun=='Compostela'){
            this.home_lat=7.6660;
            this.home_lang = 126.0847;
        }
        if(this.mun=='Laak'){
            this.home_lat=7.8771;
            this.home_lang = 125.7844;
        }
        if(this.mun=='Mabini'){
            this.home_lat=7.2821;
            this.home_lang = 125.8574;
        }
        if(this.mun=='Maco'){
            this.home_lat=7.3593;
            this.home_lang = 125.8580;
        }
        if(this.mun=='Maragusan'){
            this.home_lat=7.3522;
            this.home_lang = 126.1545;
        }
        if(this.mun=='Mawab'){
            this.home_lat=7.4969;
            this.home_lang = 125.9588;
        }
        if(this.mun=='Monkayo'){
            this.home_lat=7.8514;
            this.home_lang = 126.0458;
        }
        if(this.mun=='Montevista'){
            this.home_lat=7.7305;
            this.home_lang = 125.9806;
        }
        if(this.mun=='Nabunturan'){
            this.home_lat=7.6038;
            this.home_lang = 125.9632;
        }
        if(this.mun=='New Bataan'){
            this.home_lat=7.5547;
            this.home_lang = 126.1404;
        }
        if(this.mun=='Pantukan'){
            // this.home_lat=7.2552;
            // this.home_lang = 126.1562;
            this.home_lat=7.17728;
            this.home_lang=126.02043;
        }
        // if(this.mun=='Laak'){
        //     this.home_lat=7.8771;
        //     this.home_lang = 125.7844;
        // }
    },
    getOptionText(value) {
      const options = {
        "_1_has_toilet": "Households with no toilet",
        "_2_toilet_used": "Households with toilet but not being used",
        "_3_toilet_functional": "Households with toilet but is not functional/well-maintained",
        "_4_soap": "Households with no access to nearby soap and water",
        "_5_children": "Children's, elderly's, or PWD's feces and diapers not properly disposed",
        "_6_spaces": "Feces found in open spaces in the community",
        "_7_feces": "Feces, sanitary napkins, diapers, and solid waste found in open spaces in the community",
        "_8_composting": "Households that do not practice segregation or composting",
        "_9_dispose": "Households that do not dispose their garbage properly",
        "_10_emptied": "Have not emptied their septic tank",
        "_15_household": "Households that use a shared toilet",
        "_16_household": "Households that use a communal/public toilet",
        "_17_using": "Households not using their own toilet",
      };
      return options[value] || "";
    },
    clearSelection() {
      if (this.selectedMarker) {
        this.map.removeLayer(this.selectedMarker);
        this.selectedMarker = null;
      }
      this.selectedPoint = null;
    }
    // generateInterpolatedData() {
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
  },
};
</script>

<style scoped>
.mapdiv {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
}
</style>
