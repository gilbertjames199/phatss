<template>

    <h1>Heat Map Backup</h1>
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
</template>

<script>
import HeatmapOverlay from "leaflet-heatmap";
import L from "leaflet";

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
    puroks: Object,
    g0: Object,
    g1: Object,
    g2: Object,
    g3: Object,
  },
  data() {
    return {
      myData: {
        max: 10000,
        data: this.$props.p_data,

        lat_val: 0,
        lng_val: 0,
      },
      myData0: {
        max: 10000,
        data: this.$props.g0,

        lat_val: 0,
        lng_val: 0,
      },
      myData1: {
        max: 10000,
        data: this.$props.g1,

        lat_val: 0,
        lng_val: 0,
      },
      myData2: {
        max: 10000,
        data: this.$props.g2,

        lat_val: 0,
        lng_val: 0,
      },
      myData3: {
        max: 10000,
        data: this.$props.g3,

        lat_val: 0,
        lng_val: 0,
      },
      baseLayer: null,
      heatmapLayer: null,
      heatmapLayer1: null,
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

  },
  computed: {

  },

  mounted() {
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

            // Heatmap configuration 2
            const cfgBlue = {
                ...cfg,
                gradient: { 0.4: "lightblue", 0.6: "blue", 0.9: "darkblue" },
            };

            // Create heatmap layer
            this.heatmapLayer1 = new HeatmapOverlay(cfgBlue);
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
                center: new L.LatLng(this.home_lat, this.home_lang),
                zoom: my_zoom,
            });

            if (this.heatmapLayer) this.map.removeLayer(this.heatmapLayer);
            // if (this.heatmapLayer1) this.map.removeLayer(this.heatmapLayer1);

            // Set data and add layers to the map
            this.heatmapLayer.setData(this.myData);
            // this.heatmapLayer1.setData(this.myData1);

            this.baseLayer.addTo(this.map);
            this.heatmapLayer.addTo(this.map);
            // this.heatmapLayer1.addTo(this.map);


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
                color: 'transparent',
                fillOpacity: 0 // Makes the fill transparent
            });
            const tooltipContent = `
                <div style="text-align: left; font-size: 14px; line-height: 1.5;">
                    <strong>Name:</strong> <u>${point.name || "N/A"}</u><br>
                    <strong>Address:</strong> <u>${point.address || "N/A"}</u><br>
                    <strong>Coordinates:</strong> <u>(${point.x.toFixed(6)}, ${point.y.toFixed(6)})</u><br>
                    <strong>Relative Risk Assessment:</strong><u>${point.relative_risk_assessment}</u>
                </div>
            `;
            marker.bindTooltip(tooltipContent, {
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

  },
};
</script>

<style scoped>
.mapdiv {
  width: 100%;
  height: 500px; /* Adjust the height as needed */
}
</style>
