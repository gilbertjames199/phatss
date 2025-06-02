<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Households</h3>
            <div class="peers">
                <div class="peer mR-10"><input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search..."></div>
                <!-- <button @click="exportHouseholds" class="btn btn-success">Export to Excel</button>
                  -->


                <div class="peer mR-10">

                     <!-- <Link :href="`/households/create`" class="btn btn-primary text-white">New Household</Link> -->
                     Results per page
                     <select v-model="count_per_page" @click="filterData">
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                        <option>300</option>
                        <option>500</option>
                     </select>
                </div>
                <div class="peer">
                    <!--<Link class="btn btn-primary btn-sm" href="/users/create">Add User</Link>-->
                    <button class="btn btn-primary btn-sm mL-2 text-white" @click="showFilter()">Filter</button>
                </div>
            </div>
        </div>
        <filtering v-if="filter" @closeFilter="filter=false">
            <!-- {{ auth.user }} -->
            <div v-if="auth.user.level==='Provincial'">
                Municipalities
                <select v-model="select_mun" class="form-control" @change="loadBarangays(select_mun)" v-if="auth.user.level==='Provincial'">
                    <option></option>
                    <option>Compostela</option>
                    <option>Laak</option>
                    <option>Mabini</option>
                    <option>Maco</option>
                    <option>Maragusan</option>
                    <option>Mawab</option>
                    <option>Monkayo</option>
                    <option>Montevista</option>
                    <option>Nabunturan</option>
                    <option>New Bataan</option>
                    <option>Pantukan</option>
                </select>
            </div>

            <div v-if="auth.user.level!=='Barangay'" >
                Barangay
                <select v-model="select_bar" class="form-control" @change="loadPuroks(select_bar, select_mun)">
                    <option selected="selected"></option>
                    <option v-for="all_barangay in all_barangays">
                        {{ all_barangay.barangay }}
                    </option>
                </select>
            </div>

            <div >
                Purok <span style="font-style: italic" v-if="auth.user.level==='Barangay'">({{ auth.user.barangay }})</span>
                <select v-model="select_pur" class="form-control" @change="filterData">
                    <option selected="selected"></option>
                    <option v-for="all_purok in all_puroks">
                        {{ all_purok.purok_sitio }}
                    </option>
                </select>
            </div>

            <b>Type: </b>
            <select class="form-control" v-model="relrisk" @change="filterData()">
                <option></option>
                <option>G0</option>
                <option>G1</option>
                <option>G2</option>
                <option>G3</option>
            </select>

            <b>Year:</b>
            <select class="form-control" v-model="year_survey" @change="filterData()">
                <option></option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
            </select>
            <button class="btn btn-sm btn-primary mT-5 text-white" @click="">Filter</button>&nbsp;
            <button class="btn btn-sm btn-danger mT-5 text-white" @click="clearFilter">Clear Filter</button>&nbsp;<br>
            <a class="btn btn-sm btn-success mT-5 text-white"
                :class="{ disabled: !select_bar }"
                :href="downloadLink"
                target="_blank"
                @click.prevent="!select_bar"
            >
                Download Households Excel
            </a>
            <!-- {{ downloadLink }} -->
        </filtering>
        <div class="masonry-sizer col-md-6"></div>
        <div class="masonry-item w-100">
            <div class="row gap-20"></div>
            <div class="bgc-white p-20 bd">
                <div class="table-responsive">
                    <!-- {{ data }} -->
                    <table class="table table-sm table-borderless table-striped table-hover">
                        <thead>
                            <tr class="bg-secondary text-white">
                                <th></th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Relative Risk Assessment</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dat in data.data">
                                <td></td>
                                <td>
                                    <span v-if="dat.LAST_NAME">{{ dat.LAST_NAME }}</span>
                                    <span v-if="dat.FIRST_NAME && dat.LAST_NAME">, </span>
                                    <span v-if="dat.FIRST_NAME">{{ dat.FIRST_NAME }}</span>
                                </td>
                                <td>
                                    <span v-if="dat.purok_sitio">Purok - {{ dat.purok_sitio }}</span>
                                    <span v-if="dat.barangay && dat.purok_sitio ">, </span>
                                    <span v-if="dat.barangay">{{ dat.barangay }}</span>
                                </td>
                                <td>{{ dat.relative_risk_assessment }}</td>
                                <td>{{ getYearFromDate(dat.date_survey) }}</td>
                                <td>
                                    <div class="dropdown dropstart">
                                        <button class="btn btn-secondary btn-sm action-btn" type="button"
                                            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path
                                                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <Link class="dropdown-item"
                                                    :href="`/households/${dat.id}/view/dataset`">
                                                View
                                                </Link>
                                            </li>
                                            <li>
                                                <Link class="dropdown-item"
                                                    :href="`/households/${dat.id}/edit`">
                                                Edit</Link>
                                            </li>
                                            <li>
                                                <Link class="text-danger dropdown-item" @click="deleteOutput(dat.id)">
                                                Delete
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- {{ data.page }} -->
                    <pagination :next="data.next_page_url" :prev="data.prev_page_url" />
                </div>
            </div>
        </div>
        <!-- {{ data.current_page }} -->
    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
import Filtering from "@/Shared/Filter";
import Pagination from "@/Shared/Pagination";
export default{
    props: {
        auth: Object,
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
            // http://eservices.dvodeoro.ph:8081/export-households
            baseLink: '/export-households',
            downloadLink: '',
            count_per_page: 10,
            bar: "",
            mun: "",
            pur: "",
            search: this.$props.filters.search,
            filter: false,
            select_mun: '',
            select_bar: '',
            select_pur: '',
            gender: '',
            all_barangays: [],
            all_puroks: [],
            my_level: '',
            relrisk: '',
            year_survey: '',

        }
    },
    mounted(){
        this.my_level = this.auth.user.level;
        if(this.auth.user.level==='Municipal'){
            if (!this.select_mun) {
                this.select_mun = this.auth.user.municipality;
                this.loadBarangays(this.select_mun);
            }
            this.downloadLink = this.baseLink + '?level='+this.my_level+'&mun=' + select_mun;
        }
        if(this.auth.user.level==='Barangay'){
            // this.select_mun=this.auth.user.municipality

            if (!this.select_bar) {
                this.select_bar = this.auth.user.barangay;
                this.loadPuroks(this.select_bar, this.select_mun);
            }
            this.downloadLink = this.baseLink + '?level='+this.my_level+'&bar=' + select_bar;
        }
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/households",
                { search: value,count_per_page: this.count_per_page,
                    pur: this.select_pur,
                    bar: this.select_bar,
                    mun: this.select_mun,
                    relrisk: this.relrisk
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
    },
    methods: {
        async clearFilter(){
            this.select_bar='';
            this.select_mun='';
            this.select_pur='';
            this.relrisk='';
            this.search='';
            this.filterData();
        },
        async filterData() {
            //alert(this.mfosel);
            this.$inertia.get(
                "/households",
                {
                    count_per_page: this.count_per_page,
                    pur: this.select_pur,
                    bar: this.select_bar,
                    mun: this.select_mun,
                    relrisk: this.relrisk,
                    year_survey: this.year_survey,
                    search: this.search,
                    page: this.data.current_page,
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
        deleteOutput(id) {
            let text = "WARNING!\nAre you sure you want to delete this survey?" + id;
            if (confirm(text) == true) {
                this.$inertia.delete("/households/" + id);
            }
        },
        async loadBarangays(select_mun){
            //alert("select_mun is :"+select_mun);
            this.all_barangays=[];
            this.all_puroks=[];
            if(select_mun===""){

            }else{
                axios.post("/users/get-barangays",{mun: select_mun}).then((response)=>{
                    this.all_barangays = response.data.data
                });
                this.downloadLink = this.baseLink + '?level='+this.my_level+'&mun=' + select_mun;
            }
            this.filterData();
        },

        async loadPuroks(select_bar, select_mun){
            this.all_puroks=[];
            if(select_bar!==""){
                axios.post("/users/get-puroks",{bar: select_bar, mun: select_mun}).then((response)=>{
                    this.all_puroks = response.data.data
                });
                this.downloadLink = this.baseLink + '?level='+this.my_level+'&mun=' + select_mun+'&bar=' + select_bar;
            }
            this.filterData();
        },
        exportHouseholds() {
            // Build the URL with query params (if any)
            const level = 'Municipal'; // Example, change based on your state or data
            const mun_us = 'Nabunturan';    // Example, set accordingly

            // You can dynamically set these variables (mun_us, bar_us, etc.) based on user input
            const url = `/export-households?level=${level}&mun_us=${mun_us}`;

            // Trigger the export by opening the URL in a new tab (this will initiate the stream download)
            window.open(url, '_blank');
        }


    }
}
</script>
