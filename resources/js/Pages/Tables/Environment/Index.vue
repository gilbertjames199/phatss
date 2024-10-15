<template>
    <Head>
        <title>Environment</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span>
                    <!-- -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                        <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                    </svg>
                </span>
                Environment</h3>
            <div class="peers">
                <div class="peer mR-10">
                    <input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
                <div class="peer">
                    <!--<Link class="btn btn-primary btn-sm" href="/users/create">Add User</Link>-->
                    <button class="btn btn-primary btn-sm mL-2 text-white" @click="showFilter()">Filter</button>
                </div>
            </div>
        </div>

        <filtering v-if="filter" @closeFilter="filter=false">
            <div v-if="auth.user.level==='provincial'">
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
            <div v-if="auth.user.level!=='barangay'" >
                Barangay
                <select v-model="select_bar" class="form-control" @change="loadPuroks(select_bar, select_mun)">
                    <option selected="selected"></option>
                    <option v-for="all_barangay in all_barangays">
                        {{ all_barangay.barangay }}
                    </option>
                </select>
            </div>
            <div >
                Purok <span style="font-style: italic" v-if="auth.user.level==='barangay'">({{ auth.user.barangay }})</span>
                <select v-model="select_pur" class="form-control" @change="filterByPurok(select_pur)">
                    <option selected="selected"></option>
                    <option v-for="all_purok in all_puroks">
                        {{ all_purok.purok_sitio }}
                    </option>
                </select>
            </div>
            <button class="btn btn-sm btn-primary mT-5 text-white" @click="">Filter</button>
        </filtering>

        <div class="col-12">
            <div class="bgc-white p-20 bd">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Ethnicity</th>
                            <th scope="col">Address</th>
                            <th scope="col">Key Area</th>
                            <th scope="col">Hours Available</th>
                            <th scope="col">4K's Registered</th>
                            <th scope="col" v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" style="text-align: right" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(person_info, index) in person_infos.data" :key="index">
                            <tr>
                                <td>{{ person_info.lastname }}, {{ person_info.firstname }}</td>
                                <td>{{ getAge(person_info.month_day_year)}}</td>
                                <td>{{ person_info.gender }}</td>
                                <td>{{ person_info.ethnicity_blood }}</td>
                                <td>
                                    <span v-if="person_info.purok_sitio">Purok {{ person_info.purok_sitio }},</span>
                                    {{ person_info.barangay }}
                                </td>
                                <td>
                                    <div v-if="clicked!==person_info.id || contentVisible===false || contentType!=='key'" @click="showRow(person_info.id,'key')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                    </div>
                                    <div v-if="clicked===person_info.id && contentVisible===true && contentType==='key'" @click="showRow(person_info.id,'key')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="clicked!==person_info.id || contentVisible===false || contentType!=='time'" @click="showRow(person_info.id,'time')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                    </div>
                                    <div v-if="clicked===person_info.id && contentVisible===true && contentType==='time'" @click="showRow(person_info.id,'time')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </div>
                                </td>
                                <td>4K's Registered</td>
                                <!--dropdown actions-->
                                <td v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" >
                                    <div class="dropdown dropstart" >
                                        <button class="btn btn-secondary btn-sm action-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton1">
                                            <li v-if="can.createUser"><Link class="dropdown-item" >Edit</Link></li>
                                            <li v-if="can.editUser"><hr class="dropdown-divider action-divider"></li>
                                            <li v-if="can.deleteUser"><Link class="text-danger dropdown-item" >Delete</Link></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="clicked===person_info.id && contentVisible===true && contentType==='key'" >
                                <td></td>
                                <td colspan="8">
                                    <span style="font-weight: bold">Key Area</span>
                                    <li v-if="person_info.vol.where_volunteer_environment==='1'">Environment</li>
                                    <li v-if="person_info.vol.where_volunteer_build==='1'">House Build/School Build</li>
                                    <li v-if="person_info.vol.where_volunteer_disaster==='1'">Disaster Response</li>
                                    <li v-if="person_info.vol.where_volunteer_bayanihan==='1'">Bayanihan Programs</li>
                                    <li v-if="person_info.vol.where_volunteer_sports==='1'">Sports</li>
                                    <li v-if="person_info.vol.where_volunteer_events==='1'">Events</li>
                                    <li v-if="person_info.vol.where_volunteer_bayanihan_karunungan==='1'">Bayanihan  para sa Karunungan</li>
                                </td>
                            </tr>
                            <tr v-if="clicked===person_info.id && contentVisible===true && contentType==='time'" >
                                <td></td>
                                <td colspan="8">
                                    <span style="font-weight: bold">Hours Available</span>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekday_morning==='1'">Weekday morning</li>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekday_afternoon==='1'">Weekday afternoon</li>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekday_evening==='1'">Weekday evening</li>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekend_morning==='1'">Weekday morning</li>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekend_afternoon==='1'">Weekday afternoon</li>
                                    <li v-if="person_info.vol.time_avail_vlntr_weekend_evening==='1'">Weekday evening</li>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <pagination :next="person_infos.next_page_url" :prev="person_infos.prev_page_url" />
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <p >
                            {{ person_infos.from }} to {{ person_infos.to }} of
                            {{ person_infos.total }} entries
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Filtering from "@/Shared/Filter";
import Pagination from "@/Shared/Pagination";

export default {
    components: { Pagination, Filtering },
    props: {
        auth: Object,
        person_infos: Object,
        filters: Object,
        reports: Object,
        can: Object,
    },
    data() {
        return {
            prev: true,
            can_edit: false,
            can_create: false,
            can_delete: false,
            search: this.$props.filters.search,
            confirm: false,
            filter: false,
            select_mun: '',
            select_bar: '',
            select_pur: '',
            all_barangays: [],
            all_puroks: [],
            my_level: '',
            contentVisible: false, 
            clicked: -1,
            contentType: '',
        };
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/environment/volunteers",
                { search: value },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
    },
    mounted() {
        this.mountedLogic();
    },
    methods: {
        getAge(dateString) 
        {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            return age;
        },
        showFilter() {
            this.filter = !this.filter
        },
        
        verifyPreviledge(can_create,can_edit,can_delete){
            if(can_create){
                this.prev = true;
            }else if(can_edit){
                this.prev = true;
            }else if(can_delete){
                this.prev = true;
            }else{
                this.prev = false;
            }
            if(this.prev){
                return true;
            }else{
                return false;
            }
        },

        async loadBarangays(select_mun){
            this.all_barangays=[];
            this.all_puroks=[];
             if(select_mun===""){
                
            }else{
                axios.post("/users/get-barangays",{mun: select_mun}).then((response)=>{
                    this.all_barangays = response.data.data
                });
            }
            this.filterByMunicipality(select_mun);
        },

        async loadPuroks(select_bar, select_mun){
            this.all_puroks=[];
            if(select_bar!==""){
                axios.post("/users/get-puroks",{bar: select_bar, mun: select_mun}).then((response)=>{
                    this.all_puroks = response.data.data
                });
            }
            this.filterByBarangay(select_bar);
        },

        async filterByMunicipality(select_mun){
            this.$inertia.get(
                "/environment/volunteers",
                { mun: select_mun },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        },

        async filterByBarangay(select_bar, select_mun){
            this.$inertia.get(
                "/environment/volunteers",
                { 
                  mun: this.select_mun,
                  bar: select_bar
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        },

        async filterByPurok(select_pur){
            this.$inertia.get(
                "/environment/volunteers",
                { 
                  bar: this.select_bar,
                  pur: select_pur
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        },

        async mountedLogic(){
            this.my_level = this.auth.user.level;
            this.select_mun =this.auth.user.municipality;
            this.select_bar = this.auth.user.barangay;
            if(this.my_level ==="municipal"){
                this.loadBarangays(this.select_mun);
            }else if(this.my_level === "barangay"){
                this.loadPuroks(this.select_bar);
            }
        },
        showRow(data, tpp) { 
            this.clicked=data;
            this.contentType=tpp;
            //alert("tpp: "+tpp);
     		this.contentVisible = !this.contentVisible;
        },
    },
};
</script>
