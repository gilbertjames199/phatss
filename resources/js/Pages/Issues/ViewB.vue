<template>
    <h1>Route Optimization</h1>
  <div id="app">
    <!--********************************************-->
    <div>
      <!-- searchFrom:  {{ searchFrom }}
      searchTo: {{ searchTo }} -->
      <label for="from">From:</label>
      <input
        type="text"
        id="from"
        v-model="searchFrom"
        @input="searchLocation('from')"
        @focus="showSuggestions = 'from'"
        placeholder="Search or click on map"
      />
      <ul v-if="showSuggestions === 'from'" class="suggestions">
        <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectLocation(suggestion, 'from')">
          {{ suggestion.display_name }}
        </li>
      </ul>

      <label for="to">To:</label>
      <input
        type="text"
        id="to"
        v-model="searchTo"
        @input="searchLocation('to')"
        @focus="showSuggestions = 'to'"
        placeholder="Search or click on map"
      />
      <ul v-if="showSuggestions === 'to'" class="suggestions">
        <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectLocation(suggestion, 'to')">
          {{ suggestion.display_name }}
        </li>
      </ul>
    </div>
    <button @click="reloadPage" class="reload-button">Reload Page</button>

    <!--********************************************-->
    <div :id="mapId" class="map"></div>
    <LRoutingMachine :mapObject="mapObject" :waypoints="waypoints" />
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

const waypoints = [
  { lat: 7.57608, lng: 125.992595 },
  { lat: 7.60332, lng: 125.96808 },
];

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
      center: { lat: 7.60332, lng: 125.992595 },
      osmUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    //   waypoints,
      from: { lat: null, lng: null },
      to: { lat: null, lng: null },
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
    this.mapObject.on("click", this.handleMapClick);

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

    // Calculate the center as the average of from and to coordinates
    if (this.from.lat && this.to.lat) {
      this.center = {
        lat: (this.from.lat + this.to.lat) / 2,
        lng: (this.from.lng + this.to.lng) / 2,
      };
    }
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
      this.waypoints = [this.from, this.to].filter((point) => point.lat && point.lng);
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
</style>
