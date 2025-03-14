<template>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h1>Nearest Response Center </h1>
            <Link href="/issue">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"/>
                </svg> -->
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

                </div>

            </div>
    </div>


  </div>
</template>

<script>

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

    };
  },
  watch: {

  },
  mounted() {

  },
  methods: {





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
</style>

