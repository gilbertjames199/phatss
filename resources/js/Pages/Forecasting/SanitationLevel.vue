<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Sanitation Level</h3>
            <div class="peers">
                <!-- <div class="peer mR-10">
                    <input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search...">
                </div> -->
                <div class="peer mR-10">
                    View By
                    <select v-model="view" >
                        <option value="mun">Municipality</option>
                        <option value="bar">Barangay</option>
                    </select>
                </div>
                <div class="peer mR-10" v-if="view=='bar'">
                    Municipality
                    <select v-model="mun" @change="getBarangayData">
                        <option></option>
                        <option v-for="mun in municipalities_global" :key="mun">{{ mun }}</option>
                    </select>
                </div>
                <!-- <div class="peer mR-10">

                     Results per page
                     <select v-model="count_per_page" @click="filterData">
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                        <option>300</option>
                        <option>500</option>
                     </select>
                </div> -->
            </div>
        </div>
        <div class="peers">
            <div class="masonry-sizer col-md-2">
                <div class="bgc-white p-20 bd">
                    <div class="table-responsive" >
                        <!-- {{ data }} -->

                        <table class="table table-sm table-borderless table-striped table-hover" >
                            <thead >
                                <tr>
                                    <th colspan="3"><h5>MUNICIPALITIES</h5></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Municipality</th>
                                    <!-- <th>Sanitation Status</th>
                                    <th>Relative Risk Assessment</th> -->
                                </tr>
                            </thead>
                            <tbody v-if="view == 'mun'">
                                <tr v-for="dat in data">
                                    <td>
                                        <!-- getBarangayData -->
                                        <a href="#" class="text-blue-600 hover:underline" @click.prevent="getBarangayData2(dat.municipality)">
                                            {{ dat.municipality }}
                                        </a>
                                    </td>
                                    <!-- <td>
                                        {{ dat.sanitation_status }}
                                    </td>
                                    <td>{{ dat.relative_risk_assessment }}</td> -->
                                </tr>
                            </tbody>
                            <!-- <thead v-if="view == 'bar'">
                                <tr v-if="mun">
                                    <th colspan="3"><h2>MUNICIPALITY OF {{ mun.toUpperCase() }}</h2></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Barangays</th>
                                    <th>Relative Risk Assessment</th>
                                    <th>Sanitation Status</th>
                                </tr>
                            </thead>
                            <tbody v-if="view == 'bar'">
                                <tr v-for="dat in all_barangays">
                                    <td>
                                        <a href="#" class="text-blue-600 hover:underline" @click.prevent="getHouseholdDataBarangay(dat.barangay)">
                                            {{ dat.barangay }}
                                        </a>
                                    </td>

                                    <td>{{ dat.relative_risk_assessment }}</td>
                                    <td>
                                        {{ dat.sanitation_status }}
                                    </td>
                                </tr>
                            </tbody> -->
                        </table>
                        <!-- <pagination :next="data.next_page_url" :prev="data.prev_page_url" /> -->
                    </div>
                    <!-- {{ all_barangays }} -->
                      <!-- {{ all_households }} -->
                </div>
            </div>
            <div class="masonry-sizer col-md-4" v-if="mun">
                <div class="bgc-white p-20 bd">
                    <div class="table-responsive" >
                        <!-- {{ data }} -->

                        <table class="table table-sm table-borderless table-striped table-hover" >
                            <!-- <thead v-if="view == 'mun'">
                                <tr>
                                    <th colspan="3"><h2>BARANGAY</h2></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Municipality</th>
                                    <th>Sanitation Status</th>
                                    <th>Relative Risk Assessment</th>
                                </tr>
                            </thead> -->

                            <thead >
                                <tr >
                                    <th colspan="3"><h5>MUNICIPALITY OF {{ mun.toUpperCase() }}</h5></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Barangays</th>
                                    <th></th>
                                    <th>Sanitation Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dat in all_barangays">
                                    <td>
                                        <a href="#" class="text-blue-600 hover:underline" @click.prevent="getHouseholdDataBarangay(dat.barangay)">
                                            {{ dat.barangay }}
                                        </a>
                                    </td>

                                    <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-clipboard-check-fill"
                                            style="color: #04cc18;"
                                            viewBox="0 0 16 16"
                                            v-if="dat.sanitation_status==='No Risk'"
                                        >
                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-clipboard-check-fill"
                                            style="color: #dbff33;"
                                            viewBox="0 0 16 16"
                                            v-if="dat.sanitation_status==='Low Risk'"
                                        >
                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-x-circle-fill"
                                            style="color: #ffba33;"
                                            viewBox="0 0 16 16"
                                        v-if="dat.sanitation_status==='Medium Risk'">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-x-circle-fill"
                                            style="color: #d11e06;"
                                            viewBox="0 0 16 16"
                                        v-if="dat.sanitation_status==='High Risk'">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                    </td>
                                    <td>
                                        {{ dat.sanitation_status }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <pagination :next="data.next_page_url" :prev="data.prev_page_url" /> -->
                    </div>
                    <!-- {{ all_barangays }} -->
                      <!-- {{ all_households }} -->
                </div>
            </div>
            <div class="masonry-sizer col-md-6" v-if="bar_filter">
                <div class="bgc-white p-20 bd">
                    <div class="table-responsive" >
                        <!-- ✅ Search Input for Households -->

                        <table class="table table-sm table-borderless table-striped table-hover" >
                            <thead >
                                <tr>
                                    <th colspan="5">
                                        <div class="peers fxw-nw ai-c jc-sb">
                                            <div class="peer">
                                                <h5>HOUSEHOLDS</h5>
                                            </div>
                                            <div class="peer mL-10">
                                                <label>Risk Assessment: &nbsp;</label>
                                                <select v-model="household_level" @change="getHouseholdDataBarangay(this.bar_filter)">
                                                    <option>G3</option>
                                                    <option>G2</option>
                                                    <option>G1</option>
                                                    <option>G0</option>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div class="peer mL-10">
                                                <input
                                                    v-model="household_search"
                                                    @input="searchHouseholds"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Search households..."
                                                />
                                            </div>
                                        </div>
                                    <!-- <div class="col-md-5">
                                        <h2>HOUSEHOLDS</h2>
                                        <input
                                            v-model="household_search"
                                            @input="searchHouseholds"
                                            type="text"
                                            class="form-control"
                                            placeholder="Search households..."
                                        />
                                    </div> -->
                                </th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Name</th>
                                    <th>Barangay</th>
                                    <th colspan="2">Sanitation Status</th>
                                    <!-- <th>Risk Assessment</th> -->
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="dat in all_households.data">
                                    <td>
                                        {{ dat.LAST_NAME }}, {{ dat.FIRST_NAME }} {{ dat.MIDDLE_NAME }}
                                    </td>
                                    <td>{{ dat.barangay }}</td>
                                    <td>
                                        <span v-if="dat.relative_risk_assessment==3">No Risk</span>
                                        <span v-if="dat.relative_risk_assessment==2">Low Risk</span>
                                        <span v-if="dat.relative_risk_assessment==1">Medium Risk</span>
                                        <span v-if="dat.relative_risk_assessment==0">HIgh Risk</span>
                                    </td>
                                    <td>
                                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-calendar-check-fill"
                                            viewBox="0 0 16 16" style="color: #04cc18;">
                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg> -->

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-clipboard-check-fill"
                                            style="color: #04cc18;"
                                            viewBox="0 0 16 16"
                                            v-if="dat.relative_risk_assessment==3"
                                        >
                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-clipboard-check-fill"
                                            style="color: #dbff33;"
                                            viewBox="0 0 16 16"
                                            v-if="dat.relative_risk_assessment==2"
                                        >
                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-x-circle-fill"
                                            style="color: #ffba33;"
                                            viewBox="0 0 16 16"
                                        v-if="dat.relative_risk_assessment==1">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            class="bi bi-x-circle-fill"
                                            style="color: #d11e06;"
                                            viewBox="0 0 16 16"
                                        v-if="dat.relative_risk_assessment==0">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                    </td>
                                    <!-- <td>{{ dat.relative_risk_assessment }}</td> -->

                                </tr>
                            </tbody>
                            <!-- <pagination :next="all_households.next_page_url" :prev="all_households.prev_page_url" /> -->

                        </table>
                         <!-- {{ all_households }} -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
import Filtering from "@/Shared/Filter";
import Pagination from "@/Shared/Pagination";
export default{
    props: {
        data: Object,
        filters: Object,
    },
    components:{
        Pagination, Filtering
    },
    computed: {

    },
    data() {
        return{
            count_per_page: 10,
            bar: "",
            mun: "",
            pur: "",
            search: this.$props.filters.search,
            view: "mun",
            all_barangays: [],
            all_households: [],
            mun_filter: "",
            bar_filter: "",
            household_search: "",  // ✅ Household search query
            household_level: ""

        }
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/issue",
                { search: value },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
    },
    methods: {
        async filterData() {
            //alert(this.mfosel);
            this.$inertia.get(
                "/households",
                {
                    count_per_page: this.count_per_page,
                    pur: this.pur,
                    bar: this.bar,
                    mun: this.mun
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        },
        deleteIssue(id) {
            let text = "WARNING!\nAre you sure you want to delete this issue?" + id;
            if (confirm(text) == true) {
                this.$inertia.delete("/issue/" + id);
            }
        },
        async getBarangayData(){
            axios.get("/sanitation-assessment/"+this.mun).then((response)=>{
                    this.all_barangays = response.data
            });
        },
        async getBarangayData2(mun_param){
            this.mun=mun_param
            this.mun_filter=null
            this.bar_filter=null
            this.household_level=null
            this.all_households=[]
            this.all_barangays=[]
            // alert(this.mun)
            axios.get("/sanitation-assessment/"+this.mun).then((response)=>{
                    this.all_barangays = response.data
            });
        },
        async getHouseholdDataMunicipality(mun){
            this.mun_filter = mun
            axios.get("/sanitation-assessment/mun/"+mun, {
                params: {
                    search: this.household_search, // ✅ Include search query
                    count_per_page: this.count_per_page // ✅ Include pagination settings
                }
            }).then((response)=>{
                    this.all_households = response.data
            });
        },
        async getHouseholdDataBarangay(bar){
            this.bar_filter = bar
            axios.get("/sanitation-assessment/bar/"+bar, {
                params: {
                    search: this.household_search, // ✅ Include search query
                    count_per_page: this.count_per_page, // ✅ Include pagination settings
                    household_level: this.household_level // ✅ Include household level
                }
            }).then((response)=>{
                    this.all_households = response.data
            });
        },
        // ✅ New: Search Households
        async searchHouseholds() {
            // if (this.household_search.trim() === "") {
            // If search query is empty, reset to the original list
            if (this.bar_filter) {
                this.getHouseholdDataBarangay(this.bar_filter);
            }else if (this.mun_filter) {
                this.getHouseholdDataMunicipality(this.mun_filter);
            }
            // } else {
            //     axios.get("/sanitation-assessment/households", {
            //         params: {
            //             search: this.household_search,
            //             bar: this.bar_filter,
            //             mun: this.mun_filter
            //         }
            //     }).then((response) => {
            //         this.all_households = response.data;
            //     });
            // }
        }
    }
}
</script>
