<template>
    <Head>
        <title>Crime Victims</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span class="icon-holder">
                                    <svg version="1.1" id="Capa_1" width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 476.243 476.243" style="enable-background:new 0 0 476.243 476.243;" xml:space="preserve">
                                        <g>
                                            <path fill="currentColor" d="M69.684,384.436l116.312-116.312c11.096-11.096,14.282-26.938,9.933-40.952l36.01-36.01
                                                c10.762,8.763,21.923,15.769,32.896,20.882c0.837-2.495,2.13-4.788,4.016-6.674l60.306-60.306c1.87-1.87,4.178-3.138,6.706-3.942
                                                c-7.381-15.867-18.696-32.173-33.555-47.032c-15.152-15.152-31.807-26.654-47.975-34.018c-0.845,2.341-2.065,4.511-3.853,6.308
                                                l-60.306,60.306c-1.78,1.78-3.902,3.081-6.267,3.95c5.145,11.266,12.331,22.752,21.338,33.823l-36.01,36.01
                                                c-14.014-4.349-29.856-1.162-40.952,9.933L11.955,326.715c-15.94,15.94-15.94,41.781,0,57.721
                                                C27.895,400.376,53.744,400.376,69.684,384.436z"/>
                                            <path fill="currentColor"  d="M274.589,211.127c-1.122,1.122-1.837,2.544-2.276,4.121c-1.496,5.414,0.91,12.9,6.576,18.566
                                                c4.438,4.43,10.128,7.08,15.233,7.08c2.138,0,5.162-0.48,7.454-2.772l18.647-18.647l23.012-23.012l18.647-18.647
                                                c2.284-2.284,3.211-5.779,2.593-9.836c-0.683-4.519-3.138-9.08-6.901-12.843c-4.438-4.43-10.128-7.08-15.225-7.08
                                                c-0.984,0-2.162,0.13-3.365,0.463c-1.414,0.39-2.861,1.073-4.097,2.317L274.589,211.127z"/>
                                            <path fill="currentColor"  d="M176.949,123.728c1.105,0,2.455-0.146,3.82-0.593c1.26-0.415,2.536-1.081,3.642-2.187l60.306-60.306
                                                c1.008-1.008,1.658-2.284,2.113-3.666c1.772-5.438-0.585-13.185-6.422-19.013c-4.438-4.43-10.128-7.08-15.225-7.08
                                                c-2.138,0-5.162,0.48-7.454,2.772l-20.549,20.549l-19.216,19.208l-20.549,20.549c-4.975,4.983-3.008,15.371,4.308,22.687
                                                C166.162,121.078,171.852,123.728,176.949,123.728z"/>
                                            <path fill="currentColor"  d="M300.438,387.313c9.892-0.975,20.5-1.252,31.579-1.252c4.723,0,9.559,0.033,14.485,0.073
                                                c10.209,0.081,21.004,0.081,31.214,0c4.926-0.041,9.762-0.073,14.485-0.073c11.079,0,21.687,0.276,31.579,1.252v-23.589H300.438
                                                V387.313z"/>
                                            <path fill="currentColor" d="M392.202,394.19c-4.698,0-9.51,0.033-14.42,0.073c-10.258,0.073-21.086,0.073-31.336,0
                                                c-4.91-0.041-9.722-0.073-14.42-0.073c-11.502,0-22.053,0.228-31.579,1.13c-31.417,2.967-51.129,13.567-52.47,50.04h228.267
                                                c-1.341-36.473-21.053-47.064-52.47-50.039C414.255,394.418,403.695,394.19,392.202,394.19z"/>
                                        </g>
                                    </svg>
                                </span>
                Crime Victims
            </h3>
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
                            <th scope="col">Victim of Crime/RA 9262</th>
                            <th scope="col">Type of Crime</th>
                            <th scope="col">Case Assistance</th>
                            <th scope="col" v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" style="text-align: right" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person_info, index) in person_infos.data" :key="index">
                            <td>{{ person_info.lastname }}, {{ person_info.firstname }}</td>
                            <td>{{ getAge(person_info.month_day_year)}}</td>
                            <td>{{ person_info.gender }}</td>
                            <td>{{ person_info.ethnicity_blood }}</td>
                            <td>
                                <span v-if="person_info.purok_sitio">Purok {{ person_info.purok_sitio }},</span>
                                {{ person_info.barangay }}
                            </td>
                            <td>
                                <span v-if="person_info.gender==='Female'">
                                    <span v-if="person_info.mental_health.vawc_victim === 'Yes'">
                                        <div v-if="person_info.mental_health.victim_of_abuse_physical === '1'">All types of physical abuse </div>
                                        <div v-if="person_info.mental_health.victim_of_physical_injury === '1'">Physical Injury </div>
                                        <div v-if="person_info.mental_health.victim_of_economic_abuse === '1'">Economic Abuse </div>
                                        <div v-if="person_info.mental_health.victim_of_sexual_abuse === '1'">Rape and other type of sexual abuse </div>
                                        <div v-if="person_info.mental_health.victim_of_psychological === '1'">All types of Psychological Abuse </div>
                                        <div v-if="person_info.mental_health.victim_of_emotional === '1'">Emotional Abuse </div>
                                    </span>
                                </span>
                            </td>
                            <td>{{ person_info.crim.crime_victim }}</td>
                            <td>{{ person_info.crim.assistance_received }}</td>
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
        };
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/peace_and_security/crime_victims",
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
                "/peace_and_security/crime_victims",
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
                "/peace_and_security/crime_victims",
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
                "/peace_and_security/crime_victims",
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
        }
    },
};
</script>
