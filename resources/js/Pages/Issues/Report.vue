<template>
  <div class="relative row gap-20 masonry pos-r">
    <div class="peers fxw-nw jc-sb ai-c">
      <h3>{{ title }} Sanitation Issue</h3>
      <Link href="/issue">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
          <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"/>
        </svg>
      </Link>
    </div>

    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submit()">
          <label for="issue">Issue Description</label>
          <textarea v-model="form.issue" class="form-control" required></textarea>
          <div class="fs-6 c-red-500" v-if="form.errors.issue">{{ form.errors.issue }}</div>

          <label for="municipality">Municipality</label>
          <select class="form-control" @change="filterBarangay()" v-model="form.municipality" required>
            <option></option>
            <option v-for="mun in municipalities_global" :key="mun">{{ mun }}</option>
          </select>
          <div class="fs-6 c-red-500" v-if="form.errors.municipality">{{ form.errors.municipality }}</div>

          <label for="barangay">Barangay</label>
          <select class="form-control" v-model="form.barangay" required>
            <option></option>
            <option v-for="bar in my_barangays" :key="bar">{{ bar }}</option>
          </select>
          <div class="fs-6 c-red-500" v-if="form.errors.barangay">{{ form.errors.barangay }}</div>

          <label for="barangay">Type</label>
          <select class="form-control" v-model="form.type" required>
            <option></option>
            <option>Emergency and Disaster-Related Sanitation  Issue</option>
            <option>Hygiene and Personal Sanitation  Issue</option>
            <option>Industrial and Environmental Sanitation Issue</option>
            <option>Solid Waste Management Issue</option>
            <option>Toilet and Human Waste Management Issue</option>
            <option>Vector-Borne Sanitation Issue</option>
            <option>Water Sanitation Issue</option>
          </select>
          <div class="fs-6 c-red-500" v-if="form.errors.type">{{ form.errors.type }}</div>
          <!-- <label>Location</label> -->
          <div class="location-inputs">
            <label>Latitude</label>
            <input type="text" v-model="form.Latitude" class="form-control" placeholder="Latitude" required readonly>
            <div class="fs-6 c-red-500" v-if="form.errors.Latitude">{{ form.errors.Latitude }}</div>
            <label>Longitude</label>
            <input type="text" v-model="form.Longitude" class="form-control" placeholder="Longitude" required readonly>
            <div class="fs-6 c-red-500" v-if="form.errors.Longitude">{{ form.errors.Longitude }}</div>
          </div>
          <!-- <button type="button" class="btn btn-secondary mt-2" @click="getMyLocation">Use My Location</button> -->

          <button type="submit" class="btn btn-primary mt-3 text-white" :disabled="form.processing">Submit Report</button>
        </form>
      </div>

      <div class="col-md-7 position-relative">
        <div class="position-relative">
          <input type="text" v-model="searchQuery" @input="searchLocation" placeholder="Search location..." class="form-control mb-2 position-relative" style="z-index: 1050;">
          <ul v-if="suggestions.length" class="list-group position-absolute bg-white w-100 shadow p-2" style="max-height: 200px; overflow-y: auto; z-index: 1050;">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectLocation(suggestion)" class="list-group-item list-group-item-action">{{ suggestion.display_name }}</li>
          </ul>
        </div>
        <div id="map" style="height: 400px; position: relative; z-index: 1;"></div>
      </div>
    </div>
  </div>
  <!-- {{ editData }} -->
</template>

<script>
import { useForm } from "@inertiajs/inertia-vue3";
import L from "leaflet";
import "leaflet-control-geocoder";

export default {
  props: {
    editData: Object,
    barangays: Object,
    // municipalities_global: Array
  },
  data() {
    return {
      form: useForm({
        id: "",
        issue: "",
        municipality: "",
        type: "",
        barangay: "",
        Latitude: "",
        Longitude: ""
      }),
      displayed_coordinates: "",
      title: "",
      my_barangays: [],
      searchQuery: "",
      suggestions: []
    };
  },
  mounted() {
    // this.getMyLocation();
    if(this.editData!==undefined){
        this.title="Edit Reported"
        this.form.id =this.editData.id
        this.form.issue = this.editData.issue
        this.form.municipality = this.editData.municipality
        this.form.barangay = this.editData.barangay
        this.filterBarangay()
        this.form.type = this.editData.type
        this.form.Latitude = this.editData.Latitude
        this.form.Longitude = this.editData.Longitude
        this.initMap(this.form.Latitude, this.form.Longitude);
    }else{
        this.title="Report"
        this.initMap(7.575589251826168, 125.99270958172241);
    }

  },
  methods: {
    submit() {
        if(this.editData!==undefined){
            this.form.patch("/issue/update");
        }else{
            this.form.post("store");
        }

    },
    filterBarangay() {
      this.my_barangays = this.barangays.filter(i => i.municipality === this.form.municipality).map(i => i.barangay);
    },
    getMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.form.Latitude = position.coords.latitude;
          this.form.Longitude = position.coords.longitude;
          this.updateMap(position.coords.latitude, position.coords.longitude);
        }, error => {
          alert("Geolocation failed: " + error.message);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    searchLocation() {
        if (!this.searchQuery) {
            this.suggestions = [];
            return;
        }

        const url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.2070cb3dbf9066600306adad278707a2&q=${this.searchQuery}&format=json`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
            this.suggestions = data;
        });
    },
    selectLocation(location) {
      this.form.Latitude = location.lat;
      this.form.Longitude = location.lon;
      this.updateMap(location.lat, location.lon);
      this.suggestions = [];
      this.searchQuery = location.display_name;
    },
    initMap(lat,lng) {
      this.map = L.map("map").setView([lat, lng], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.map.on("click", (event) => {
        const { lat, lng } = event.latlng;
        this.form.Latitude = lat;
        this.form.Longitude = lng;
        this.updateMap(lat, lng);
      });
    },
    updateMap(lat, lng) {
      this.map.setView([lat, lng], 15);
      if (!this.marker) {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      } else {
        this.marker.setLatLng([lat, lng]);
      }
    }
  }
};
</script>
