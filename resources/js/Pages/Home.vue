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
            <div class="col-md-12" v-if="bar || mun || year">
                <span >Filters:&nbsp;&nbsp;</span>
                <span>
                    <span v-if="year"
                    class="
                        d-ib
                        lh-0
                        va-m
                        fw-600
                        bdrs-10em
                        pX-15
                        pY-15
                        bgc-red-50
                        c-red-500
                    "
                    >{{ year }}</span
                >&nbsp;&nbsp;
                </span>
                <span>
                    <span v-if="mun"
                    class="
                        d-ib
                        lh-0
                        va-m
                        fw-600
                        bdrs-10em
                        pX-15
                        pY-15
                        bgc-yellow-50
                        c-black-500
                    "
                    >{{ mun }}</span
                >&nbsp;&nbsp;
                </span>
                <span v-if="bar"
                    class="
                        d-ib
                        lh-0
                        va-m
                        fw-600
                        bdrs-10em
                        pX-15
                        pY-15
                        bgc-green-50
                        c-green-500
                    "
                    >
                    {{ bar }}
                </span>&nbsp;&nbsp;
                    <!-- <button
                    class="
                        d-ib
                        lh-0
                        va-m
                        fw-600
                        bdrs-10em
                        pX-15
                        pY-15
                        bgc-red-500
                        c-red-50
                    " @click="clearFilter"
                    >X </button
                > -->

            </div>
                <!-- TOTAL HOUSEHOLDS -->
                <div class="col-md-4">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr >
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1ZM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V8Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"/>
                                            </svg>&nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Surveyed Households</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: red; font-weight: bold; text-align: center">{{ format_number(number_of_households,0,true) }}</h2>
                        </div>
                    </div>
                </div>
                <!-- WITH TOILETS -->
                <div class="col-md-4">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                            </svg>
                                            &nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Households with Toilets</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: #756e04; font-weight: bold;  text-align: center">{{ format_number(with_toilets,0,true) }}</h2>
                        </div>

                    </div>
                </div>
                <!-- WITH FUNCTIONAL TOILETS -->
                <div class="col-md-4">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
                                            </svg>&nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Households with Functional Toilets</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: #02ab75; font-weight: bold; text-align: center">{{ format_number(with_functional_toilet,0,true) }}</h2>

                        </div>

                    </div>
                </div>

                <!-- RISK ASSESSMENT -CHART -->
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            Risk Assessment Chart
                            <RiskAssessmentChart
                                :key="componentKey"
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
                                            <b> RISK LEVEL DISTRIBUTION BY LOCATION
                                                <!-- <span v-if="auth.user.level==='Barangay'">PUROK/SITIO</span>
                                                <span v-if="auth.user.level==='Municipal'">BARANGAY
                                                    <span v-if="bar!==''">PUROK/SITIO</span>
                                                    <span v-if="bar===''&&pur==='' ">BARANGAY</span>
                                                </span>
                                                <span v-if="auth.user.level==='Provincial'">
                                                    <span v-if="bar!==''">PUROK/SITIO</span>
                                                    <span v-if="mun!=='' && (pur===''&&pur===NULL)">BARANGAY</span>
                                                    <span v-if="mun==='' && bar===''&&pur==='' ">MUNICIPALITY</span>
                                                </span> -->
                                                 <!-- <span v-if="auth.user.level === 'Barangay'">PUROK/SITIO</span>
                                                <span v-else-if="auth.user.level === 'Municipal'">
                                                    <span v-if="bar">PUROK/SITIO</span>
                                                    <span v-else>BARANGAY</span>
                                                </span>
                                                <span v-else-if="auth.user.level === 'Provincial'">
                                                    <span v-if="bar">PUROK/SITIO</span>
                                                    <span v-else-if="mun && pur!==''">BARANGAY</span>
                                                    <span v-else>MUNICIPALITY</span>
                                                </span> -->
                                            </b>
                                        </th>
                                    </tr>
                                    <tr style="background-color: #c1c9c4">
                                        <th>
                                            <!-- <span v-if="auth.user.level==='Barangay'">PUROK/SITIO</span>
                                            <span v-if="auth.user.level==='Municipal'">BARANGAY
                                                <span v-if="bar!==''">PUROK/SITIO</span>
                                                <span v-if="bar===''&&pur==='' ">BARANGAY</span>
                                            </span>
                                            <span v-if="auth.user.level==='Provincial'">
                                                <span v-if="bar!==''">PUROK/SITIO</span>
                                                <span v-if="mun!==''">BARANGAY</span>
                                                <span v-if="mun==='' && bar===''&&pur==='' ">MUNICIPALITY</span>
                                            </span> -->
                                            Location
                                        </th>
                                        <th>Open Defecation -G0</th>
                                        <th>Zero Open Defecation -G1</th>
                                        <th>Basic Sanitation G2</th>
                                        <th>Safely Managed G3</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr v-for="result in results">
                                        <td>{{ result.municipality }}</td>
                                        <td>{{ result.Open_Defecation_G0 }}

                                        </td>
                                        <td>{{ result.Zero_Open_Defecation_G1 }}</td>
                                        <td>{{ result.Basic_Sanitation_G2 }}</td>
                                        <td>{{ result.Safely_Managed_G3 }}</td>
                                        <td>{{ result.total }}</td>
                                    </tr> -->
                                    <tr v-for="result in results" :key="result.municipality">
                                        <th>{{ result.municipality }}</th>
                                        <td>
                                            <a :href="generateUrl('G0', result.municipality)" target="_blank">
                                                {{ result.Open_Defecation_G0 }}
                                            </a>
                                        </td>
                                        <td>
                                            <a :href="generateUrl('G1', result.municipality)" target="_blank">
                                                {{ result.Zero_Open_Defecation_G1 }}
                                            </a>
                                        </td>
                                        <td>
                                            <a :href="generateUrl('G2', result.municipality)" target="_blank">
                                                {{ result.Basic_Sanitation_G2 }}
                                            </a>
                                        </td>
                                        <td>
                                            <a :href="generateUrl('G3', result.municipality)" target="_blank">
                                                {{ result.Safely_Managed_G3 }}
                                            </a>
                                        </td>
                                        <td>
                                            <a :href="generateUrl('ALL', result.municipality)" target="_blank">
                                                {{ result.total }}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>{{ totalG0 }}</td>
                                        <td>{{ totalG1 }}</td>
                                        <td>{{ totalG2 }}</td>
                                        <td>{{ totalG3 }}</td>
                                        <td>{{ totalOverall }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>

                            </p>
                        </div>

                    </div>

                </div>


                <filtering v-if="filter" @closeFilter="filter=false" title="DATA FILTERS">

                    <h4>FILTERS<br></h4>
                    <b>Year:</b>
                    <select class="form-control" v-model="year" @change="filter_me('year')">
                        <option></option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                    </select>
                    <!-- <hr> -->
                    <span v-if="auth.user.level==='Provincial'">
                        <b>Municipality:</b> &nbsp;
                        <select class="form-control" v-model="mun" @change="filter_me('mun')">
                            <option></option>
                            <option v-for="municipality in municipalities">
                                {{ municipality }}
                            </option>
                        </select>
                    </span>


                    &nbsp;
                    <span v-if="auth.user.level!=='Barangay'">
                        <b>Barangays: </b>
                        <select class="form-control"  v-model="bar" @change="filter_me('bar')">
                            <option></option>
                            <option v-for="barangay in barangays">
                                {{ barangay }}
                            </option>
                        </select>
                    </span>

                    &nbsp;
                    <!-- <b>Puroks: </b>
                    <select class="form-control"  v-model="pur" @change="filter_me('pur')">
                        <option></option>
                        <option v-for="purok in puroks">
                            {{ purok }}
                        </option>
                    </select> -->
                    &nbsp;
                    <hr>
                    <button class="btn btn-danger text-white" @click="clearFilter">Clear Filters</button>

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
            mun: '',
            bar: '',
            year: '',
            purok: '',
            filter: false,
        }
    },
    computed: {
        chartDataType(){
            return[
                {
                    label: 'G0',
                    backgroundColor: '#fc1303',
                    data: this.dt_g0,
                },
                {
                    label: 'G1',
                    backgroundColor: '#fc7600',
                    data: this.dt_g1,
                },
                {
                    label: 'G2',
                    backgroundColor: '#d1f505',
                    data: this.dt_g2
                },
                {
                    //#D4D468
                    label: 'G3',
                    backgroundColor: '#02ab75',
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
        totalG0() {
            return this.results.reduce((sum, r) => sum + parseFloat(r.Open_Defecation_G0 || 0), 0);
        },
        totalG1() {
            return this.results.reduce((sum, r) => sum + parseFloat(r.Zero_Open_Defecation_G1 || 0), 0);
        },
        totalG2() {
            return this.results.reduce((sum, r) => sum + parseFloat(r.Basic_Sanitation_G2 || 0), 0);
        },
        totalG3() {
            return this.results.reduce((sum, r) => sum + parseFloat(r.Safely_Managed_G3 || 0), 0);
        },
        totalOverall() {
            return this.results.reduce((sum, r) => sum + parseFloat(r.total || 0), 0);
        }

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
                        // division: this.division_selected
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        replace: true,
                        onSuccess: () => {
                            this.componentKey++; // Force re-render of chart
                        }
                        // onSuccess: () => {
                        //     window.location.reload();
                        // },
                    }
                );
        },
        showFilter() {
            this.filter = !this.filter
        },
        clearFilter(){
            this.bar="";
            this.mun="";
            this.pur="";
            this.year="";
            this.filter_me("clear");
        },
        generateUrl(riskLevel, municipality) {
            const bar = this.bar;
            const mun = this.mun;
            const year = this.year;

            const params = new URLSearchParams();

            if (bar) {
                params.append('pur', municipality);
                // params.append('mun', NULL);
            } else if (mun) {
                // params.append('bar', '');
                params.append('bar', municipality);
            } else {
                // fallback if neither bar nor mun is set
                // params.append('bar', NULL);
                params.append('mun', municipality);
            }

            params.append('relrisk', riskLevel);
            params.append('year_survey', year);

            // return `http://127.0.0.1:8000/households?${params.toString()}`;
            // Dynamic base URL using browser location
            const baseUrl = `${window.location.origin}/households`;

            return `${baseUrl}?${params.toString()}`;
        }
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
