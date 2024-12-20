<template>

    <Head>
        <title>Map Them</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Map</h3>
            <Link href="">Show Mapgdfgdfg</Link>
        </div>
        <div class="bgc-white p-20 bd">
            <button @click="getLocation()">Get Location</button>
            {{ lat }}, {{ lng }}
            <!-- {{ google_points }} -->
            <div ref="mapContainer" style="width: 1000px; height: 500px"></div>
            {{ google_points }}
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import L from 'leaflet'

export default {
    props: {
        google_points: Object
    },
    data() {
        return {
            lat_val: 0,
            lng_val: 0
        }
    },
    setup(props) {
        const lat = ref(0)
        const lng = ref(0)
        const map = ref(null)
        const mapContainer = ref(null)

        onMounted(() => {
            nextTick(() => {
                map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13)
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map.value)
            })
        })
        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }
        const getLocation = () => {
            if (navigator.geolocation) {
                // navigator.geolocation.getCurrentPosition((position) => {
                navigator.geolocation.watchPosition((position) => {
                    lat.value = position.coords.latitude
                    lng.value = position.coords.longitude

                    // this.lat_val = lat.value
                    // this.lng_val = lng.value
                    map.value.setView([lat.value, lng.value], 13)
                    L.marker([lat.value, lng.value], { draggable: true })
                        .addTo(map.value)
                        .on("dragend", (event) => {
                            console.log(event)
                        });

                    props.google_points.forEach(item => {
                        // console.log(item);
                        if (isNumeric(item._Location_latitude) && isNumeric(item._Location_longitude)) {
                            console.log(item._Location_latitude)
                            L.marker([item._Location_latitude, item._Location_longitude], { draggable: true })
                                .addTo(map.value)
                                .on("dragend", (event) => {
                                    console.log(event)
                                });
                        }

                    })

                    // L.marker([7.574680598713269, 125.99341776257607], { draggable: true })
                    //     .addTo(map.value)
                    //     .on("dragend", (event) => {
                    //         console.log(event)
                    //     });

                });


            }
        }

        return {
            lat,
            lng,
            map,
            mapContainer,
            getLocation
        }
    }
}
</script>
<!-- <template>

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
            {{ lat_val }}, {{ lng_val }}

            <div ref="mapContainer" style="width: 400px; height:400px"></div>
        </div>
    </div>
</template>

<script>
// import { GmapMap, GmapMarker } from '@fawmi/vue-google-maps'
import { ref } from 'vue'
import L from 'leaflet'

const lat = ref(0)
const lng = ref(0)
const map = ref()
const mapContainer = ref()
export default {
    components: {
        // GmapMap,
        // GmapMarker,
    },
    props: {
        google_points: Object
    },
    data() {
        return {
            lat_val: 0,
            lng_val: 0
        }
    },
    mounted() {
        map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map.value);

    },
    methods: {
        getLocation() {
            // 7.575702, 125.992776
            // lat.value = 7.575702;
            // lng.value = 125.992776;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    lat.value = position.coords.latitude
                    lng.value = position.coords.longitude

                })
            }
            this.lat_val = lat.value
            this.lng_val = lng.value
            // alert(lat.value);
        }
    }
}
</script> -->
