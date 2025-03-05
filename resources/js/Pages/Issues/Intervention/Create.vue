<template>
  <div class="relative row gap-20 masonry pos-r">
    <div class="peers fxw-nw jc-sb ai-c">
      <h3>{{ title }} Intervention</h3>
      <Link href="/issue">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
          <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"/>
        </svg>
      </Link>
    </div>
    <!-- {{ issue }} -->
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submit()">
          <label for="barangay">Issue</label>
          <input type="text" :value="issue.issue" class="form-control" readonly>
          <label for="barangay">Location</label>
          <input type="text" :value="issue.barangay" class="form-control" readonly>
          <label for="barangay">Intervention</label>
          <select class="form-control" v-model="form.intervention_id" required>
            <option></option>
            <option v-for="intervention in interventions" :value="intervention.id">{{ intervention.description }}</option>
          </select>
          <div class="fs-6 c-red-500" v-if="form.errors.intervention_id">{{ form.errors.intervention_id }}</div>


          <!-- <button type="button" class="btn btn-secondary mt-2" @click="getMyLocation">Use My Location</button> -->

          <button type="submit" class="btn btn-primary mt-3 text-white"  :disabled="form.processing">
            Save
          </button>
        </form>
      </div>

      <div class="col-md-7 position-relative">
        <div class="position-relative">
          <!-- <input type="text" v-model="searchQuery" @input="searchLocation" placeholder="Search location..." class="form-control mb-2 position-relative" style="z-index: 1050;"> -->
          <ul v-if="suggestions.length" class="list-group position-absolute bg-white w-100 shadow p-2" style="max-height: 200px; overflow-y: auto; z-index: 1050;">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectLocation(suggestion)" class="list-group-item list-group-item-action">{{ suggestion.display_name }}</li>
          </ul>
        </div>
        <div id="map" style="height: 400px; position: relative; z-index: 1;"></div>
      </div>
    </div>
  </div>
  <!-- {{ issue }} -->
  <!-- {{ interventions }} -->
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
    issue: Object,
    interventions: Object
    // municipalities_global: Array
  },
  data() {
    return {
      form: useForm({
        id: "",
        issue_id: "",
        intervention_id: "",
        // status: "",
        // acted_by: "",
        // Latitude: "",
        // Longitude: ""
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
        this.title="Edit"
        this.form.intervention_id =this.editData.intervention_id
        this.form.issue_id = this.editData.issue_id
        this.form.id =this.editData.id
        this.initMap(this.issue.Latitude, this.issue.Longitude);
    }else{
        this.title="Add"
        this.form.issue_id =this.issue.id
        this.initMap(this.issue.Latitude, this.issue.Longitude);
    }

  },
  methods: {
    submit() {
        if(this.editData!==undefined){
            this.form.patch("/issue-intervention/update");
        }else{
            this.form.post("/issue-intervention/store");
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
    //   this.map.on("click", (event) => {
    //     const { lat, lng } = event.latlng;
    //     this.form.Latitude = lat;
    //     this.form.Longitude = lng;
    //     // this.updateMap(lat, lng);
    //   });
    },

  }
};
</script>
