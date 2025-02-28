<template>
  <div class="relative row gap-20 masonry pos-r">
    <div class="peers fxw-nw jc-sb ai-c">
      <h3>{{ pageTitle }} Issue</h3>
      <Link href="/reports">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
          <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
        </svg>
      </Link>
    </div>
    <div class="row">
        <div class="col-md-5">
            <form @submit.prevent="submit()">
                <label for="issue">Issue Description</label>
                <textarea v-model="form.issue" class="form-control" required></textarea>
                <div class="fs-6 c-red-500" v-if="form.errors.issue">{{ form.errors.issue }}</div>

                <label for="municipality">Municipality</label>
                <select class="form-control" @change="filterBarangay()" v-model="form.municipality" required>
                <option></option>
                <option v-for="mun in municipalities_global" :key="mun">{{ mun }}</option>
                </select>
                <!-- {{ municipalities_global }} -->
                <label for="barangay">Barangay</label>
                <select class="form-control" v-model="form.barangay" required>
                <option></option>
                <option v-for="bar in my_barangays" :key="bar">{{ bar }}</option>
                </select>

                <label>Location</label>
                <div class="location-inputs">
                <input type="text" v-model="form.latitude" class="form-control" placeholder="Latitude" readonly>
                <input type="text" v-model="form.longitude" class="form-control" placeholder="Longitude" readonly>
                </div>
                <button type="button" class="btn btn-secondary mt-2" @click="getMyLocation">Use My Location</button>
                <button type="button" class="btn btn-secondary mt-2" @click="openMap">Select on Map</button>

                <button type="submit" class="btn btn-primary mt-3" :disabled="form.processing">Submit Report</button>
            </form>
        </div>
        <div class="col-md-4">
            <!-- <input type="text" v-model="searchQuery" @input="searchLocation" placeholder="Search location..." class="form-control mb-2"> -->
            <ul v-if="suggestions.length" class="list-group position-absolute bg-white w-100">
                <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectLocation(suggestion)" class="list-group-item list-group-item-action">
                    {{ suggestion.display_name }}</li>
            </ul>
            <div id="map" style="height: 400px;"></div>
        </div>
    </div>

  </div>
</template>

<script>
import { useForm } from "@inertiajs/inertia-vue3";
import MapModal from "@/Shared/ModalDynamicTitle";
import L from "leaflet";
import "leaflet-control-geocoder";


export default {
  props: {
    barangays: Object,
    // municipalities_global: Array/
  },
  data() {
    return {
      form: useForm({
        issue: "",
        municipality: "",
        barangay: "",
        latitude: "",
        longitude: ""
      }),
      my_barangays: [],
      searchQuery: "",
      suggestions: []
    };
  },
  components: {
    MapModal
  },
  mounted() {
    this.initMap();
  },
  methods: {
    submit() {
      this.form.post("/reports");
    },
    filterBarangay() {
      this.my_barangays = this.barangays.filter(i => i.municipality === this.form.municipality).map(i => i.barangay);
    },
    searchLocation() {
      if (!this.searchQuery) {
        this.suggestions = [];
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.suggestions = data;
        });
    },
    getMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.form.latitude = position.coords.latitude;
          this.form.longitude = position.coords.longitude;
        }, error => {
          alert("Geolocation failed: " + error.message);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    // openMap() {
    //   // Open a Leaflet.js modal for selecting location
    //   alert("Implement Leaflet map modal for selecting location.");
    // },
    initMap() {
      this.map = L.map("map").setView([12.8797, 121.7740], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
      this.marker = L.marker([12.8797, 121.7740]).addTo(this.map);

      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
      }).on('markgeocode', (e) => {
        const latlng = e.geocode.center;
        this.form.latitude = latlng.lat;
        this.form.longitude = latlng.lng;
        this.updateMap(latlng.lat, latlng.lng);
      }).addTo(this.map);
    },
    updateMap(lat, lng) {
      this.map.setView([lat, lng], 15);
      this.marker.setLatLng([lat, lng]);
    }
  }
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
