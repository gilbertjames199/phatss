<template>
    <Head>
        <title>Persons with Disability</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 1020.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M3328 12785 c-664 -108 -1088 -776 -902 -1422 101 -350 391 -650 732
                            -757 296 -93 575 -72 847 64 226 113 392 278 505 505 82 165 110 276 117 465
                            4 123 2 161 -17 250 -92 451 -428 790 -875 885 -108 23 -298 28 -407 10z"/>
                            <path d="M3435 10334 c-11 -2 -45 -9 -75 -15 -194 -38 -383 -142 -534 -292
                            -199 -197 -307 -440 -322 -722 -5 -89 4 -266 66 -1330 6 -93 37 -638 70 -1210
                            48 -828 64 -1059 80 -1133 71 -335 297 -616 617 -767 77 -37 210 -79 308 -97
                            42 -8 628 -12 1955 -15 l1895 -4 131 -227 c1009 -1750 1375 -2380 1403 -2415
                            92 -111 233 -198 378 -232 102 -25 262 -17 360 18 334 116 510 486 395 830
                            -23 68 -221 416 -992 1748 -530 915 -980 1689 -1000 1719 -83 122 -225 224
                            -375 267 -56 17 -164 18 -1511 21 l-1451 2 -6 173 c-4 94 -10 286 -14 425 l-6
                            252 1044 0 c901 0 1053 2 1104 15 266 68 437 315 396 573 -28 185 -147 329
                            -334 405 -52 22 -54 22 -1162 27 l-1110 5 -8 105 c-35 487 -70 907 -78 965
                            -23 145 -92 317 -182 450 -99 146 -299 310 -461 378 -149 63 -227 79 -401 83
                            -88 1 -169 1 -180 -2z"/>
                            <path d="M1880 7729 c-527 -357 -957 -808 -1283 -1346 -564 -930 -737 -2072
                            -477 -3148 253 -1044 888 -1944 1790 -2540 1026 -677 2306 -870 3489 -528
                            1011 292 1897 976 2444 1887 108 181 240 444 232 464 -11 31 -580 1012 -586
                            1012 -4 0 -12 -28 -19 -62 -18 -95 -84 -308 -136 -443 -359 -924 -1102 -1640
                            -2034 -1960 -650 -222 -1370 -234 -2044 -34 -715 213 -1381 707 -1804 1339
                            -289 433 -462 892 -538 1430 -26 178 -26 683 -1 855 36 247 83 444 153 646
                            174 499 439 918 825 1300 l167 167 -29 498 c-16 275 -29 507 -29 517 0 9 -3
                            17 -7 17 -5 0 -55 -32 -113 -71z"/>
                        </g>
                    </svg>
                </span>
                Persons with Disability</h3>
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
                            <th scope="col">Disability</th>
                            <th scope="col">PWD ID</th>
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
                                <span v-if="person_info.health.disability_type==='Multiple Disabilities, specify ___'">
                                    {{ person_info.health.disability_multiple }}
                                </span>
                                <span v-else>{{ person_info.health.disability_type }}</span>
                            
                            </td>
                            <td>
                                {{ person_info.health.pwd_id }}
                            
                            </td>
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
                "/health/pwd",
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
                "/health/pwd",
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
                "/health/pwd",
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
                "/health/pwd",
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
