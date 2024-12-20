<template>
    <Head>
        <title>Unregistered Voters</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-fingerprint" viewBox="0 0 16 16">
                        <path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/>
                        <path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332c0 .409-.022.816-.066 1.221A.5.5 0 0 1 6 8.447c.04-.37.06-.742.06-1.115V7Zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8Zm-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329Z"/>
                        <path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334Zm.3 1.67a.5.5 0 0 1 .449.546 10.72 10.72 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.72 9.72 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/>
                        <path d="M3.902 4.222a4.996 4.996 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 3.996 3.996 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556Zm6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705ZM3.68 5.842a.5.5 0 0 1 .422.568c-.029.192-.044.39-.044.59 0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.531 6.531 0 0 0 3.058 7c0-.25.019-.496.054-.736a.5.5 0 0 1 .568-.422Zm8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.51 10.51 0 0 0 .584-2.678.5.5 0 0 1 .54-.456Z"/>
                        <path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865Zm-.89 1.257a.5.5 0 0 1 .04.706A5.478 5.478 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346Zm12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49Z"/>
                    </svg>
                </span>
                Unregistered Voters
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
                "/governance/unregisteredvoters",
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
            //alert("select_mun is :"+select_mun);
            this.all_barangays=[];
            this.all_puroks=[];
            if(select_mun===""){
                //alert("wala sulat");
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
                "/governance/unregisteredvoters",
                { mun: select_mun },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        },

        async filterByBarangay(select_bar, select_mun){
            if(select_bar===""){
                this.filterByMunicipality(this.select_mun)
            }else{
                this.$inertia.get(
                    "/governance/unregisteredvoters",
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
            }
            
        },

        async filterByPurok(select_pur){
            //alert("select bar: "+this.select_bar);
            this.$inertia.get(
                "/governance/unregisteredvoters",
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
            //alert("my level is " + this.my_level);
            if(this.my_level === "provincial"){
                
            }else if(this.my_level ==="municipal"){
                //alert("my level is " + this.my_level);
                this.loadBarangays(this.select_mun);
            }else if(this.my_level === "barangay"){
                //alert("my level is " + this.my_level);
                this.loadPuroks(this.select_bar);
            }
        },
    },
};
</script>
