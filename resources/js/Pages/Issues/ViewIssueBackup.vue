<template>

    <!-- <div>
        This form shows the way points from the location of the issue reported to the nearest response center recorded in our database.
    </div> -->
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h1>Nearest Response Center Backup</h1>
            <Link href="/issue">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
            <path fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
        </svg>
            </Link>
            </div>
            <div id="app">
            <!--********************************************-->
            <div class="row">
                <div class="col-md-3 position-relative">
                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tr style="background-color: dimgray; color:white">
                                    <th colspan="2" >ISSUE DETAILS</th>
                                </tr>
                                <tr>
                                    <td><b>Description:</b></td>
                                    <td><u>{{ issue.issue }}</u></td>
                                </tr>
                                <tr>
                                    <td><b>Location:</b></td>
                                    <td><u>{{ issue.barangay }}</u></td>
                                </tr>
                                <tr>
                                    <td><b>Type: </b></td>
                                    <td><u>{{ issue.type }}</u></td>
                                </tr>
                                <tr style="background-color: dimgray; color:white">
                                    <th colspan="2">NEAREST HEALTH/RESPONSE CENTER</th>
                                </tr>
                                <tr>
                                    <td><b>Center name:</b></td>
                                    <td>
                                        <u>
                                            <span v-if="nhc.DESC==='Provincial Hospital'">Davao de Oro {{ nhc.DESC }}, {{ nhc.municipality }}</span>
                                            <span v-else>{{ nhc.type }}, {{ nhc.municipality }}</span>
                                        </u>
                                    </td>
                                </tr>

                                <!-- <tr>
                                    <td><b>Distance: </b></td>
                                    <td><u>{{ format_number(nhc.distance,2,true) }}&nbsp;KM</u></td>
                                </tr> -->
                            </table>
                        </div>

                    </div>
                </div>
                <div class="col-md-9 position-relative">
                    <div id="map" class="map"></div>
                </div>
                <div class="col-md-4 position-relative" hidden>
                    <div id="directions" class="directions-container"></div>
                </div>
            </div>
    </div>


  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet-routing-machine';
export default {
    props:{
        long_from: Number,
        lat_from: Number,
        long_to: Number,
        lat_to: Number,
        nhc: Object,
        issue: Object
    },
  components: {

  },
  data() {
    return {
        map: null
    };
  },
  watch: {

  },
  mounted() {
    this.initializeMap();
  },
  beforeDestroy() {
    if (this.map) {
        this.map.remove();
    }
},
  methods: {
    initializeMap() {
        var lat_center = parseFloat(this.lat_to)+parseFloat(this.lat_from)/2;
        var long_center = parseFloat(this.long_to)+parseFloat(this.long_from)/2;
        // Initialize map
        this.map = L.map('map').setView([this.lat_to, this.long_from], 13);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        // Add markers for start and end locations
        L.marker([this.lat_from, this.long_from]).addTo(this.map)
            .bindPopup('Start Location')
            .openPopup();

        L.marker([this.lat_to, this.long_to]).addTo(this.map)
            .bindPopup('Nearest Center')
            .openPopup();

        // Add route between two points
        L.Routing.control({
            waypoints: [
                L.latLng(this.lat_from, this.long_from),
                L.latLng(this.lat_to, this.long_to)
            ],
            routeWhileDragging: true,
            // createMarker: function() { return null; },
            createMarker: () => null,
            lineOptions: {
                styles: [{ color: 'red', weight: 4 }]
            },
            show: false // Disable default overlay panel
        }).on('routesfound', (e) => {
            this.displayRouteSteps(e.routes[0]);

            // const routeBounds = e.routes[0].bounds;
            // this.map.fitBounds(routeBounds, {
            //     padding: [20, 20] // Add padding to prevent the route from touching the edges
            // });
        }).addTo(this.map);
    },
    displayRouteSteps(route) {
        const directionsContainer = document.getElementById('directions');
        directionsContainer.innerHTML = ''; // Clear previous steps

        route.instructions.forEach((instruction, index) => {
            const step = document.createElement('div');
            step.innerHTML = `<strong>${index + 1}.</strong> ${instruction.text} - <em>${(instruction.distance / 1000).toFixed(2)} km</em>`;
            directionsContainer.appendChild(step);
        });
    }




  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.map {
    position: relative;
  width: 100%;
  height: 100vh;
}

@media (max-width: 768px) {
  .map {
    height: 80vh; /* Slightly smaller map for smaller devices */
  }
}

@media (max-width: 768px) {
  .map {
    width: 100%; /* Full width for tablets and phones */
    height: 70vh; /* Adjust height for smaller screens */
  }
}

.directions-container {
    height: 250px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #fafafa;
    font-size: 14px;
}

.directions-container div {
    padding: 5px;
    border-bottom: 1px solid #eee;
}

.directions-container div:last-child {
    border-bottom: none;
}

/* .leaflet-control-container .leaflet-routing-container-hide {
  display: none;
} */

.leaflet-routing-container {
    background-color: rgba(255, 255, 255, 0.9) !important;
    font-size: 10px !important;
    padding: 8px;
    border-radius: 5px; /* Optional: adds rounded corners */
}
.leaflet-routing-container .leaflet-routing-alt h2{
    font-size: 14px !important;
    line-height: 1.4 !important;
}
.leaflet-routing-container .leaflet-routing-alt h3{
    font-size: 14px !important;
    line-height: 1.4 !important;
}
.suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}

.table-container {
    border: 2px solid black !important;
    padding: 5px; /* Optional: To avoid text touching the border */
}

</style>
