<template>
    <Head>
        <title>Home</title>
    </Head>

    <div class="row gap-20 masonry pos-r">

        <div class="masonry-item w-100">
            <div class="row gap-20">
                <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Sanitation Management System</h1>
                <div class="peers fxw-nw jc-sb ai-c">
                 <h2>
                            <span v-if="auth.user.level==='Barangay'">Barangay {{ auth.user.barangay }}</span>
                            <span v-if="auth.user.level==='Municipal'">Municipality of {{ auth.user.municipality }}</span>
                            <span v-if="auth.user.level==='Provincial'">Province of Davao de Oro</span>
                        </h2>
                    <div class="peers">
                        <div class="peer">

                        </div>
                        <div class="peer">
                            <button class="btn btn-primary btn-sm mL-2 text-white" @click="showFilter()">Filter</button>
                        </div>
                    </div>
            </div>
                <!-- TOTAL HOUSEHOLDS -->
                <div class="col-md-4">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr >

                                        <td><h5 href="/details/demographics" target="_blank">Number of Surveyed Households</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: red; font-weight: bold; text-align: center">{{ format_number(number_of_households,0,true) }}</h2>
                        </div>
                    </div>
                </div>

                <!-- RISK ASSESSMENT -CHART -->
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            Risk Assessment Chart
                            <RiskAssessmentChart
                                :chartData="chartDataType"
                                :chartLabel="data_by_mun_label"
                                :plugins="chartOptionCom" >
                            </RiskAssessmentChart>
                        </div>
                    </div>
                </div>
                <!-- RISK ASSESSMENT -TABLE -->
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <table class="table table-sm table-bordered table-striped table-hover" >
                                <thead class="thead-dark">
                                    <tr >
                                        <th colspan="6" style="background-color: grey; color: white">
                                            <b>RISK LEVEL DISTRIBUTION BY
                                                <span v-if="auth.user.level==='Barangay'">PUROK/SITIO</span>
                                                <span v-if="auth.user.level==='Municipal'">BARANGAY</span>
                                                <span v-if="auth.user.level==='Provincial'">MUNICIPALITY</span>
                                            </b>
                                        </th>
                                    </tr>
                                    <tr style="background-color: #c1c9c4">
                                        <th>Municipality</th>
                                        <th>Open Defecation -G0</th>
                                        <th>Zero Open Defecation -G1</th>
                                        <th>Basic Sanitation G2</th>
                                        <th>Safely Managed G3</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="result in results">
                                        <td>{{ result.municipality }}</td>
                                        <td>{{ result.Open_Defecation_G0 }}</td>
                                        <td>{{ result.Zero_Open_Defecation_G1 }}</td>
                                        <td>{{ result.Basic_Sanitation_G2 }}</td>
                                        <td>{{ result.Safely_Managed_G3 }}</td>
                                        <td>{{ result.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>

                            </p>
                        </div>

                    </div>

                </div>


                <filtering v-if="filter" @closeFilter="filter=false" title="HEATMAP FILTERS">
                    <h4>FILTERS<br></h4>
                    <b>Year:</b>
                    <select class="form-control" v-model="year" @change="filter_me('year')">
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                    </select>
                    <hr>
                    <b>Municipality:</b> &nbsp;
                    <select class="form-control" v-model="mun" @change="filter_me('mun')">
                        <option></option>
                        <option v-for="municipality in municipalities">
                            {{ municipality }}
                        </option>
                    </select>

                    &nbsp;
                    <b>Barangays: </b>
                    <select class="form-control"  v-model="bar" @change="filter_me('bar')">
                        <option></option>
                        <option v-for="barangay in barangays">
                            {{ barangay }}
                        </option>
                    </select>
                    &nbsp;
                    <b>Puroks: </b>
                    <select class="form-control"  v-model="pur" @change="filter_me('pur')">
                        <option></option>
                        <option v-for="purok in puroks">
                            {{ purok }}
                        </option>
                    </select>
                    &nbsp;



                </filtering>
            </div>


        </div>

    </div>
</template>
<script>
import RiskAssessmentChart from '@/Shared/BarChart.vue';
import Filtering from "@/Shared/FilterT";
import { ref } from 'vue';

const componentKey=ref(0);
const videoUrl = "/images/pho_ddo.mp4"; // Relative path to the video

export default {
    props: {
        auth: Object,
        with_toilets: Number,
        with_functional_toilet: Number,
        _8_composting: Number,
        dt_g0: Object,
        dt_g1: Object,
        dt_g2: Object,
        dt_g3: Object,
        total: Object,
        data_by_mun_label: Object,
        results: Object,
        barangays: Object,
        municipalities: Object,
        puroks: Object,
    },
    components: {
        RiskAssessmentChart, Filtering
    },
    data() {
        return{
            mun: "",
            bar: "",
            year: "",
            purok: "",
            filter: false,
        }
    },
    computed: {
        chartDataType(){
            return[
                {
                    label: 'G0',
                    backgroundColor: '#025da6',
                    data: this.dt_g0,
                },
                {
                    label: 'G1',
                    backgroundColor: '#2196f3',
                    data: this.dt_g1,
                },
                {
                    label: 'G2',
                    backgroundColor: '#f44336',
                    data: this.dt_g2
                },
                {
                    //#D4D468
                    label: 'G3',
                    backgroundColor: '#c8cf04',
                    data: this.dt_g3
                },
                // {
                //     label: 'Total Respondents',
                //     backgroundColor: '#8c9103',
                //     data: this.total,
                // },
            ]
        },
        chartOptionCom(){
            return {
                datalabels:{
                    color: 'white',
                    display: false,
                },
            };
        },
        number_of_households(){
            return this.total.reduce((sum, value) => sum + value, 0);
        },

    },
    methods: {

        async filter_me(type){
            // alert(this.mun)
            if(type==='mun'){
                // alert(type);
                this.bar="";
                this.pur="";
            }
            if(type==='bar'){
                this.pur="";
            }

            this.$inertia.get(
                    "/",
                    {
                        mun: this.mun,
                        bar: this.bar,
                        pur: this.pur,
                        year: this.year,

                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        replace: true,

                    }
                );
        },
        showFilter() {
            this.filter = !this.filter
        },
    }
};
</script>
<style>
            .row-centered {
                text-align:center;
            }
            .col-centered {
                display:inline-block;
                float:none;
                text-align:left;
                margin-right:-4px;
            }
            .pos{
                position: top;
                top: 240px;
            }
</style>
