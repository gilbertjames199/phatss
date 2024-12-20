<template>
    <Head>
        <title>Home</title>
    </Head>
    <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Route</h1>
  <div id="app">

    <div :id="mapId" class="map"></div>
    <LRoutingMachine :mapObject="mapObject" :waypoints="waypoints" />
  </div>
</template>

<script>
import LRoutingMachine from "@/Shared/LRoutingMachine.vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const waypoints = [
//   { lat: 7.57608, lng: 125.992595 },
  { lat: 7.60332, lng: 125.96808 },
  { lat: 7.09951, lng: 125.63049}
];

export default {
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
      waypoints,
    };
  },
  mounted() {
    this.mapObject = L.map(this.mapId, {
      zoom: this.zoom,
      center: this.center,
    });

    L.tileLayer(this.osmUrl, {
      attribution: this.attribution,
    }).addTo(this.mapObject);
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
</style>
