<template>

    <!-- <div>
        This form shows the way points from the location of the issue reported to the nearest response center recorded in our database.
    </div> -->
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h1>Nearest Response Center</h1>
            <Link href="/issue">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"/>
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

                                <tr>
                                    <td><b>Distance: </b></td>
                                    <td><u>{{ format_number(nhc.distance,2,true) }}&nbsp;KM</u></td>
                                </tr>
                            </table>
                        </div>

                    </div>





                </div>
                <div class="col-md-9 position-relative">
                    <div>

                    </div>

                    <div :id="mapId" class="map"></div>

                    <LRoutingMachine :mapObject="mapObject" :waypoints="waypoints" />
                </div>

            </div>
    </div>


  </div>
</template>

<script>
import LRoutingMachine from "@/Shared/LRoutingMachine.vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//*********************** */
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";



L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
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
    LRoutingMachine,
  },
  data() {
    return {
      mapId: "map",
      mapObject: null,
      zoom: 6,
      center: { lat: this.$props.lat_from, lng: this.$props.long_from },
    //   osmUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    //   osmUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   waypoints,
      osmUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      from: { lat: this.$props.lat_from, lng: this.$props.long_from },
      to: { lat: this.$props.lat_to, lng: this.$props.long_to },
      searchFrom: "",
      searchTo: "",
      showSuggestions: null,
      suggestions: [],
      waypoints: [],
    };
  },
  watch: {
    from(newFrom) {
      this.updateWaypoints();
    },
    to(newTo) {
      this.updateWaypoints();
    },
  },
  mounted() {
    this.mapObject = L.map(this.mapId, {
      zoom: this.zoom,
      center: this.center,
    });

    L.tileLayer(this.osmUrl, {
      attribution: this.attribution,
    }).addTo(this.mapObject);

    // Add click event listener
    // this.mapObject.on("click", this.handleMapClick);

    // Restore values from localStorage
    const storedFrom = localStorage.getItem("searchFrom");
    const storedTo = localStorage.getItem("searchTo");

    if (storedFrom) {
      this.searchFrom = storedFrom;
      this.from = JSON.parse(localStorage.getItem("fromCoord"));
    }
    if (storedTo) {
      this.searchTo = storedTo;
      this.to = JSON.parse(localStorage.getItem("toCoord"));
    }

    // Add markers for the initial "from" and "to" locations

    // Calculate the center as the average of from and to coordinates
    if (this.from.lat && this.to.lat) {
      this.center = {
        lat: (this.from.lat + this.to.lat) / 2,
        lng: (this.from.lng + this.to.lng) / 2,
      };
    }

    this.updateWaypoints();

    // this.$nextTick(() => {
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
    searchLocation(type) {
        const query = type === "from" ? this.searchFrom : this.searchTo;

        if (!query) {
            this.suggestions = [];
            return;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            this.suggestions = data;
        });
    },
    selectLocation(location, type) {
      this.showSuggestions = null;

      if (type === "from") {
        this.from = { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        this.searchFrom = location.display_name;
      } else {
        this.to = { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        this.searchTo = location.display_name;
      }
    },
    handleMapClick(e) {
      const { lat, lng } = e.latlng;

      if (this.showSuggestions === "from") {
        this.from = { lat, lng };
        this.searchFrom = `lat: ${lat}, lng: ${lng}`;
        this.showSuggestions = null;
      } else if (this.showSuggestions === "to") {
        this.to = { lat, lng };
        this.searchTo = `lat: ${lat}, lng: ${lng}`;
        this.showSuggestions = null;
      }
    },
    updateWaypoints() {
        //   this.waypoints = [this.from, this.to].filter((point) => point.lat && point.lng);
        // alert("update way popints");
        this.waypoints = [
        { lat: this.lat_from, lng: this.long_from },
        { lat: this.lat_to, lng: this.long_to }
        ];
        // Clear old markers (optional)
        this.mapObject.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                this.mapObject.removeLayer(layer);
            }
        });

        // Re-add markers
        this.addMarker(this.from, "From Location");
        this.addMarker(this.to, "To Location");
    },
    reloadPage() {
      if (this.searchFrom && this.searchTo) {
        // Save values to localStorage
        localStorage.setItem("searchFrom", this.searchFrom);
        localStorage.setItem("searchTo", this.searchTo);
        localStorage.setItem("fromCoord", JSON.stringify(this.from));
        localStorage.setItem("toCoord", JSON.stringify(this.to));

        // Reload the page
        location.reload();
      } else {
        alert("Both 'From' and 'To' fields must be filled to reload the page.");
      }
    },
    addMarker(location, label) {
        L.marker([location.lat, location.lng])
        .addTo(this.mapObject)
        .bindPopup(`<b>${label}</b><br>Lat: ${location.lat}, Lng: ${location.lng}`)
        .openPopup();
    },
  },
};
</script>

<style>
html,
body,
#app {
  /* height: 100%;
  margin: 0; */
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
  /* position: absolute;
  width: 50%;
  height: 100%; */
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
