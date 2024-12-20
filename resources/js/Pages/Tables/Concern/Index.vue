<template>
    <Head>
        <title>Issue/Concern/Need</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span class="icon-holder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cone-striped" viewBox="0 0 16 16">
                        <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/>
                    </svg>
                </span>
                Issue/Concern/Need</h3>
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
                            <th scope="col">Issue, Concern & Need</th>
                            <th scope="col" v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" style="text-align: right" >Action</th>
                            
                        </tr>
                    </thead>
                    <tbody >
                        <!--
                        <tr v-for="(person_info, index) in person_infos.data" :key="index">
                            <td>{{ person_info.lastname }}, {{ person_info.firstname }} </td>
                            <td>{{ getAge(person_info.month_day_year)}}</td>
                            <td>{{ person_info.gender }}</td>
                            <td>{{ person_info.ethnicity_blood }}</td>
                            <td>
                                <span v-if="person_info.purok_sitio">Purok {{ person_info.purok_sitio }},</span>
                                {{ person_info.barangay }}
                            </td>
                            <td>
                                <div v-if="person_info.concerns.concern_electricity==='1'">Electricity</div>
                                <div v-if="person_info.concerns.concern_water==='1'">Water System Facility</div>
                                <div v-if="person_info.concerns.concern_housing==='1'">Housing Facility/Project</div>
                                <div v-if="person_info.concerns.concern_livelihood_proj==='1'">Livelihood Project</div>
                                <div v-if="person_info.concerns.concern_livelihood_training==='1'">Livelihood Training</div>
                                <div v-if="person_info.concerns.concern_farm_input==='1'">Farm inputs (seeds, fertilizers, pesticides)</div>
                                <div v-if="person_info.concerns.concern_access_microcredit==='1'">Access to micro credit facility</div>
                                <div v-if="person_info.concerns.concern_access_educ==='1'">Improved access to educationj</div>
                                <div v-if="person_info.concerns.concern_health==='1'">Improved access to health and nutrition services</div>
                                <div v-if="person_info.concerns.concern_agri_facilities==='1'">Improved access to agricultural facilities (irrigation, farm, equipment, etc.)</div>
                                <div v-if="person_info.concerns.concern_employment==='1'">Employment opportunities</div>
                                <div v-if="person_info.concerns.concern_flooding==='1'">Flooding/ community drainage/canal</div>
                                <div v-if="person_info.concerns.concern_poor_road_maintenance==='1'">Poor road maintenance</div>
                                <div v-if="person_info.concerns.concern_access_teenage==='1'">Access to teenage/ adolescent</div>
                                <div v-if="person_info.concerns.concern_access_scholarship==='1'">Access to educational & skills training scholarship</div>
                                <div v-if="person_info.concerns.concern_others==='1'">Others</div>
                            </td>
                            <td v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" >
                                <div class="dropdown dropstart" >
                                    <button class="btn btn-secondary btn-sm action-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                        </svg>
                                    </button>
                                    <ul class="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton1">
                                        <li v-if="can.editUser"><Link class="dropdown-item" >Edit</Link></li>
                                        <li v-if="can.editUser"><hr class="dropdown-divider action-divider"></li>
                                        <li v-if="can.deleteUser"><Link class="text-danger dropdown-item" >Delete</Link></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        -->
                        <template v-for="(person_info, index) in person_infos.data" :key="index">
                            <tr >
                                <td>{{ person_info.lastname }}, {{ person_info.firstname }} </td>
                                <td>{{ getAge(person_info.month_day_year)}}</td>
                                <td>{{ person_info.gender }}</td>
                                <td>{{ person_info.ethnicity_blood }}</td>
                                <td>
                                    <span v-if="person_info.purok_sitio">Purok {{ person_info.purok_sitio }},</span>
                                    {{ person_info.barangay }}
                                </td>
                                <td>
                                    <div v-if="clicked!==person_info.id || contentVisible===false" @click="showRow(person_info.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                    </div>
                                    <div v-if="clicked===person_info.id && contentVisible===true" @click="showRow(person_info.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8a8a88" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </div>
                                </td>
                                <td v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" >
                                    <div class="dropdown dropstart" >
                                        <button class="btn btn-secondary btn-sm action-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu action-dropdown" aria-labelledby="dropdownMenuButton1">
                                            <li v-if="can.editUser"><Link class="dropdown-item" >Edit</Link></li>
                                            <li v-if="can.editUser"><hr class="dropdown-divider action-divider"></li>
                                            <li v-if="can.deleteUser"><Link class="text-danger dropdown-item" >Delete</Link></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="clicked===person_info.id && contentVisible===true" >
                                <td :colspan="7" class="table-active">
                                        <span style="font-weight: bold">Concerns</span>
                                        <li v-if="person_info.concerns.concern_electricity==='1'">Electricity</li>
                                        <li v-if="person_info.concerns.concern_water==='1'">Water System Facility</li>
                                        <li v-if="person_info.concerns.concern_housing==='1'">Housing Facility/Project</li>
                                        <li v-if="person_info.concerns.concern_livelihood_proj==='1'">Livelihood Project</li>
                                        <li v-if="person_info.concerns.concern_livelihood_training==='1'">Livelihood Training</li>
                                        <li v-if="person_info.concerns.concern_farm_input==='1'">Farm inputs (seeds, fertilizers, pesticides)</li>
                                        <li v-if="person_info.concerns.concern_access_microcredit==='1'">Access to micro credit facility</li>
                                        <li v-if="person_info.concerns.concern_access_educ==='1'">Improved access to education</li>
                                        <li v-if="person_info.concerns.concern_health==='1'">Improved access to health and nutrition services</li>
                                        <li v-if="person_info.concerns.concern_agri_facilities==='1'">Improved access to agricultural facilities (irrigation, farm, equipment, etc.)</li>
                                        <li v-if="person_info.concerns.concern_employment==='1'">Employment opportunities</li>
                                        <li v-if="person_info.concerns.concern_flooding==='1'">Flooding/ community drainage/canal</li>
                                        <li v-if="person_info.concerns.concern_poor_road_maintenance==='1'">Poor road maintenance</li>
                                        <li v-if="person_info.concerns.concern_access_teenage==='1'">Access to teenage/ adolescent</li>
                                        <li v-if="person_info.concerns.concern_access_scholarship==='1'">Access to educational & skills training scholarship</li>
                                        <li v-if="person_info.concerns.concern_others==='1'">Others</li>
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
            opened: [],
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
        };
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/concern/need",
                { search: value },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
    },
    beforeMount(){
        this.addToJSON();
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
                "/concern/need",
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
                "/concern/need",
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
                "/concern/need",
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

        toggle(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)
            }
        },

        addToJSON(){
           /*for(var i=0; i<this.person_infos.count; i++){
               //this.person_infos.contentVisible=false;
           }
           var myPerson =this.person_infos;
           for(var person_info in this.myPerson){
               myPerson.contentVisible=false;
           }
           this.person_info =[];*/
           /*var myPerson =this.person_infos;
           for(var tr in myPerson){
               myPerson.contentVisible=false;
           }
           this.person_info =[];*/
           
        },
        
        showRow(data) { 
            this.clicked=data;
            
     		this.contentVisible = !this.contentVisible;
        },
        
    },
};
</script>
