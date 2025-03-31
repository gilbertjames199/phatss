<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Households</h3>
            <div class="peers">
                <div class="peer mR-10"><input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search..."></div>

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
                <select v-model="select_mun" class="form-control" @change="loadBarangays(select_mun)">
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
            <button class="btn btn-sm btn-primary mT-5 text-white" @click="">Filter</button>&nbsp;
            <button class="btn btn-sm btn-danger mT-5 text-white" @click="clearFilter">Clear Filter</button>
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
                    <pagination :next="data.next_page_url" :prev="data.prev_page_url" />
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

        }
    },
    mounted(){
        if(this.auth.user.level==='Municipal'){
            this.select_mun=this.auth.user.municipality
            this.loadBarangays(this.select_mun)
        }
        if(this.auth.user.level==='Barangay'){
            // this.select_mun=this.auth.user.municipality

            this.select_bar = this.auth.user.barangay
            this.loadPuroks(this.select_bar, this.select_mun)
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
                    search: this.search
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
            }
            this.filterData();
        },

        async loadPuroks(select_bar, select_mun){
            this.all_puroks=[];
            if(select_bar!==""){
                axios.post("/users/get-puroks",{bar: select_bar, mun: select_mun}).then((response)=>{
                    this.all_puroks = response.data.data
                });
            }
            this.filterData();
        },

    }
}
</script>
