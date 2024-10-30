<template>

    <Head>
        <title>Map Them</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Map</h3>
            <Link href="">Show Map</Link>
        </div>
        <div class="bgc-white p-20 bd">

            <button @click="getLocation()">Get Location</button>
            <button @click="generateHeatmap()">Generate Heatmap</button>

            &nbsp;{{ lat_val }}, {{ lng_val }}
            <div id="mapHeatContainer" style="width: 1200px; height:500px"></div>
            <div ref="mapContainer" style="width: 1200px; height:500px"></div>
            heat -map overlay<br>
            <!-- {{ data }}-->
              {{ heatData }}

        </div>
    </div>
</template>
<script >
// import { GmapMap, GmapMarker } from '@fawmi/vue-google-maps'
import { ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

// import 'leaflet.heat'
import HeatmapOverlay from 'leaflet-heatmap' // Correctly import HeatmapOverlay

const lat = ref(0)
const lng = ref(0)
const map = ref()
const mapContainer = ref()
export default {
    components: {
        // GmapMap,
        // GmapMarker,
        // L
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            lat_val: 0,
            lng_val: 0,
            map: null,
            heatmapLayer: null,
            heatData: [],
        }
    },
    beforeMount(){
        this.getLocation();
    },
    mounted() {


this.getLocation();
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
        initMap(){
            if (this.$refs.mapContainer) {
                this.map = L.map(this.$refs.mapContainer).setView([this.lat_val, this.lng_val], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(this.map);
                const myData = {
                    max: 8, // Set the maximum intensity value
                    data: this.data.map(point => ({
                        lat: point[0],
                        lng: point[1],
                        count: point[2]
                    }))
                };
                 this.heatData = myData;
                // var heatmapLayer = new HeatmapOverlay(cfg);
                var cfg = {
                    radius: 0.05,
                    maxOpacity: 0.8,
                    scaleRadius: true,
                    useLocalExtrema: true,
                    latField: 'lat',
                    lngField: 'lng',
                    valueField: 'count'
                };
                this.heatmapLayer = new HeatmapOverlay(cfg);
                this.map = new L.map("mapHeatContainer", {
                    center: new L.LatLng(50.339247, 9.902947),
                    zoom: 8,
                });
                this.heatmapLayer.setData(myData);
                this.heatmapLayer.addTo(this.map);

            }
        },
        generateHeatmap() {
            if (!this.map) {
                alert("Map is not initialized yet.");
                return;
            }

            // If there is an existing heatmapLayer, remove it
            if (this.heatmapLayer) {
                this.map.removeLayer(this.heatmapLayer);
            }

            // Configuration for the heatmap
            const cfg = {
                radius: 0.05,
                maxOpacity: 0.8,
                scaleRadius: true,
                useLocalExtrema: true,
                latField: 'lat',
                lngField: 'lng',
                valueField: 'count'
            };

            // Convert data into the required format
            const heatmapData = {
                max: 8, // Set the maximum intensity value
                data: this.data.map(point => ({
                    lat: point[0],
                    lng: point[1],
                    count: point[2]
                }))
            };
            alert(heatmapData)
            // Create the heatmap layer
            this.heatmapLayer = new HeatmapOverlay(cfg); // Use the imported HeatmapOverlay
            this.heatData = heatmapData;
            // Add the heatmap layer to the map
            this.heatmapLayer.addTo(this.map);
            // this.map.addLayer(this.heatmapLayer);

            // Set the data for the heatmap layer
            this.heatmapLayer.setData(heatmapData);
        }

    }
}
</script>
