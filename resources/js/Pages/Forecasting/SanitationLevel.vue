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
                <div class="peer mR-10">

                     Results per page
                     <select v-model="count_per_page" @click="filterData">
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                        <option>300</option>
                        <option>500</option>
                     </select>
                </div>
            </div>
        </div>
        <div class="peers">
            <div class="masonry-sizer col-md-6">
                <div class="bgc-white p-20 bd">
                    <div class="table-responsive" >
                        <!-- {{ data }} -->

                        <table class="table table-sm table-borderless table-striped table-hover" >
                            <thead v-if="view == 'mun'">
                                <tr>
                                    <th colspan="3"><h2>MUNICIPALITIES</h2></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Municipality</th>
                                    <th>Sanitation Status</th>
                                    <th>Relative Risk Assessment</th>
                                </tr>
                            </thead>
                            <tbody v-if="view == 'mun'">
                                <tr v-for="dat in data">
                                    <td>
                                        <a href="#" class="text-blue-600 hover:underline" @click.prevent="getHouseholdDataMunicipality(dat.municipality)">
                                            {{ dat.municipality }}
                                        </a>
                                    </td>
                                    <td>
                                        {{ dat.sanitation_status }}
                                    </td>
                                    <td>{{ dat.relative_risk_assessment }}</td>
                                </tr>
                            </tbody>
                            <thead v-if="view == 'bar'">
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
                            </tbody>
                        </table>
                        <pagination :next="data.next_page_url" :prev="data.prev_page_url" />
                    </div>
                    <!-- {{ all_barangays }} -->
                      <!-- {{ all_households }} -->
                </div>
            </div>
            <div class="masonry-sizer col-md-6" v-if="bar_filter || mun_filter">
                <div class="bgc-white p-20 bd">
                    <div class="table-responsive" >
                        <table class="table table-sm table-borderless table-striped table-hover" >
                            <thead >
                                <tr>
                                    <th colspan="3"><h2>HOUSEHOLDS</h2></th>
                                </tr>
                                <tr class="bg-secondary text-white">
                                    <th>Name</th>
                                    <th>Barangay</th>
                                    <th>Municipality</th>
                                    <th>Risk Assessment</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="dat in all_households.data">
                                    <td>
                                        {{ dat.FIRST_NAME }} {{ dat.MIDDLE_NAME }} {{ dat.LAST_NAME }}
                                    </td>
                                    <td>{{ dat.barangay }}</td>
                                    <td>{{ dat.municipality }}</td>
                                    <td>{{ dat.relative_risk_assessment }}</td>

                                </tr>
                            </tbody>
                            <!-- <pagination :next="all_households.next_page_url" :prev="all_households.prev_page_url" /> -->
                        </table>
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
            bar_filter: ""
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
        async getHouseholdDataMunicipality(mun){
            this.mun_filter = mun
            axios.get("/sanitation-assessment/mun/"+mun).then((response)=>{
                    this.all_households = response.data
            });
        },
        async getHouseholdDataBarangay(bar){
            this.bar_filter = bar
            axios.get("/sanitation-assessment/bar/"+bar).then((response)=>{
                    this.all_households = response.data
            });
        }
    }
}
</script>
