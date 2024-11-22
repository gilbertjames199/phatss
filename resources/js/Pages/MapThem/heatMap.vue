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
                <div class="col-md-9">
                    <div class="layers bd bgc-white p-20">
                        <div id="leafletMapid" class="mapdiv border border-dark"></div>
                    </div>
                </div>
                <!--FILTERS-->
                <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h4>FILTERS<br></h4>
                            <hr>
                            <!-- {{ municipalities }} -->
                            <b>Municipality:</b> &nbsp;
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
                            <button class="btn btn-danger text-white" @click="clearFilter">Clear Filters</button>
                            <hr>
                            <span >
                                <h4>Additional Details</h4>
                                <b>Count: </b> <u>{{ format_number(count,0,true) }}</u>
                            </span>

                        </div>

                    </div>
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
    p_data: Object,
    barangays: Object,
    municipalities: Object,
    puroks: Object
  },
  data() {
    return {
      myData: {
        max: 1000,
        data: this.$props.p_data,
        // data: [
        //     { "x": 7.6165921, "y": 126.0364403, "count": 11 },
        //     { "x": 7.6165206, "y": 126.036465, "count": 11 },
        //     { "x": 7.6162185, "y": 126.0365919, "count": 12 },
        //     { "x": 7.6162216, "y": 126.0364438, "count": 12 },
        //     { "x": 7.6164219, "y": 126.0361991, "count": 12 }
        // ],
        // data: this.p_data,
        // data: [
        //   { 'x': 50.32638, 'y': 9.81727, 'count': 38 },
        //   { 'x': 50.31009, 'y': 9.57019, 'count': 100 },
        //   { 'x': 50.31257, 'y': 9.44102, 'count': 250 },
        //   { 'x': 50.34057, 'y': 9.24102, 'count': 21 },
        //   { 'x': 50.43057, 'y': 9.04102, 'count': 250 },
        // ],
        lat_val: 0,
        lng_val: 0,
      },
      baseLayer: null,
      heatmapLayer: null,
      map: null,
      mun: this.$props.p_mun,
      bar: this.$props.p_bar,
      relrisk: this.$props.p_relrisk,
      pur: this.$props.p_pur,
      home_lang: null,
      home_lat: null,
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
                radius: 30,
                blur: 1,
                maxOpacity: 0.5,
                scaleRadius: false,
                useLocalExtrema: true,
                latField: "x",
                lngField: "y",
                valueField: "count",
                // gradient: {
                //     0.0: "#0eaae8",   // Cold color for very low density
                //     0.25: "#098abd",  // Transition from cold to slightly warm
                //     0.5: "#096fbd",   // Moderate density
                //     0.75: "#023ba6", // Warm color for high density
                //     1.0: "#010880"      // Bright color for very high density
                // }
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
        this.filter_me("");
    },
    addHoverTooltips() {
        // Loop through the data and create markers with tooltips for each point
        this.myData.data.forEach(point => {
            const marker = L.circleMarker([point.x, point.y], {
                radius: 5, // You can adjust the radius as needed
                color: 'transparent', // Makes the marker itself invisible
                fillOpacity: 0 // Makes the fill transparent
            });

            marker.bindTooltip(`Coordinates: (${point.x.toFixed(6)}, ${point.y.toFixed(6)})`, {
                permanent: false,
                direction: 'top'
            });

            marker.addTo(this.map);
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
