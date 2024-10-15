<template>
    <Head>
        <title>Women Given Birth</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 1092.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M5305 12794 c-551 -59 -1036 -401 -1270 -896 -189 -401 -202 -845
                            -36 -1268 139 -355 443 -678 788 -836 440 -201 906 -201 1346 0 344 157 650
                            481 788 836 120 306 147 623 79 931 -134 611 -623 1089 -1237 1209 -105 21
                            -362 34 -458 24z"/>
                            <path d="M2425 8993 c-337 -20 -510 -78 -651 -218 -47 -47 -81 -91 -102 -135
                            -30 -63 -109 -307 -159 -495 -13 -49 -73 -259 -133 -465 -165 -570 -446 -1537
                            -670 -2310 -111 -382 -237 -816 -280 -965 -43 -148 -133 -459 -200 -690 -67
                            -231 -144 -496 -171 -590 -56 -192 -69 -291 -50 -401 43 -245 212 -444 445
                            -521 71 -24 97 -27 211 -27 156 -1 239 19 379 92 123 62 236 174 289 282 25
                            51 111 334 273 895 131 451 398 1374 594 2050 l357 1230 242 3 c201 2 241 0
                            241 -12 0 -7 -196 -1048 -435 -2312 -240 -1265 -523 -2762 -630 -3329 -107
                            -567 -197 -1040 -200 -1052 l-5 -23 3655 0 3655 0 -5 23 c-3 12 -36 189 -75
                            392 -38 204 -319 1689 -624 3302 -306 1612 -558 2949 -562 2971 l-6 41 273 3
                            c151 2 275 3 277 2 2 -1 66 -219 797 -2738 287 -990 415 -1417 438 -1460 49
                            -94 172 -210 282 -268 138 -72 224 -93 380 -93 120 0 137 3 216 31 173 62 296
                            170 375 329 57 116 78 211 71 330 -5 78 -27 165 -167 645 -89 305 -251 866
                            -361 1245 -110 380 -236 812 -279 960 -43 149 -174 599 -290 1000 -117 402
                            -286 984 -376 1295 -104 360 -176 590 -198 635 -82 166 -243 265 -504 309
                            -269 46 -293 46 -3367 44 -1595 -1 -2922 -3 -2950 -5z m3420 -3152 c506 -87
                            929 -306 1291 -666 388 -387 629 -891 685 -1433 17 -164 7 -486 -20 -637 -74
                            -415 -237 -779 -492 -1095 -89 -110 -263 -285 -364 -365 -346 -275 -752 -446
                            -1195 -506 -122 -17 -458 -17 -580 0 -621 83 -1174 392 -1558 870 -256 318
                            -419 681 -493 1096 -27 151 -37 473 -20 637 56 544 296 1044 686 1433 400 400
                            860 617 1455 689 19 2 136 3 260 1 171 -2 254 -8 345 -24z"/>
                            <path d="M6385 5054 c-11 -2 -40 -10 -65 -16 -193 -47 -362 -228 -405 -433
                            -27 -130 -11 -248 51 -374 89 -181 300 -311 504 -311 140 0 297 67 400 169
                            186 187 220 465 85 697 -62 107 -195 210 -322 250 -49 15 -211 27 -248 18z"/>
                            <path d="M5004 4461 c-133 -61 -165 -291 -67 -485 40 -78 100 -151 277 -335
                            89 -93 180 -195 201 -226 112 -170 103 -305 -31 -445 -31 -33 -60 -60 -63 -60
                            -4 0 -26 29 -49 64 -53 80 -151 172 -227 213 -263 139 -626 46 -930 -238 -83
                            -79 -149 -166 -192 -255 -78 -164 -43 -282 97 -329 100 -33 179 -3 350 135 63
                            51 133 101 155 111 125 57 204 -3 370 -281 115 -192 185 -274 273 -319 64 -33
                            238 -71 347 -77 233 -13 408 72 559 273 83 111 161 262 276 538 97 230 153
                            347 219 453 77 124 79 227 5 333 -57 83 -224 177 -456 258 -65 23 -171 59
                            -235 82 -274 96 -320 132 -423 329 -85 164 -147 229 -244 259 -84 26 -158 26
                            -212 2z"/>
                        </g>
                    </svg>
                </span>
                Women Given Birth</h3>
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
                            <th scope="col">PhilHealth Member</th>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Smoker</th>
                            <th scope="col">Contraceptive Method Used</th>
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
                            <td >{{ person_info.ins.philhealth }}</td>
                            <td >{{ person_info.health.blood_type }}</td>
                            <td >{{ person_info.health.is_smoker }}</td>
                            <td >
                                <span v-if="person_info.sexual_health.contraceptive_used===''">None</span>
                                <span v-else>{{ person_info.sexual_health.contraceptive_used }}</span>
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
                "/health/women",
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
                "/health/women",
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
                "/health/women",
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
                "/health/women",
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
