<template>
    <Head>
        <title>Muslim</title>
    </Head>

    <div class="row gap-10 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>
                <!--
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cloud-moon-fill" viewBox="0 0 16 16">
                        <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
                        <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z"/>
                    </svg>
                </span>-->
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve"
                    width="40" height="40" fill="currentColor" >
                    <g>
                        <polygon fill="currentColor" points="1150,493.668 1021.589,525.542 942.902,419.178 933.535,551.153 808.061,593.122 930.683,642.812 
                            931.824,775.114 1016.975,673.85 1143.153,713.648 1073.158,601.372 	"/>
                        <path fill="currentColor" d="M828.822,792.126c-4.276-2.886-10.062-2.034-13.296,2.005C756.2,868.021,667.952,910.4,573.405,910.4
                            c-171.155,0-310.4-139.245-310.4-310.4s139.245-310.4,310.4-310.4c94.543,0,182.79,42.378,242.116,116.264
                            c3.244,4.048,9.026,4.895,13.296,2.005c4.276-2.9,5.612-8.595,3.07-13.088c-74.118-131.183-213.596-212.676-363.992-212.676
                            C237.468,182.105,50,369.573,50,600s187.468,417.895,417.895,417.895c150.401,0,289.879-81.493,363.997-212.681
                            C834.434,800.721,833.097,795.026,828.822,792.126z"/>
                    </g>
                </svg>
                Muslim
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
    </div>

    <filtering v-if="filter" @closeFilter="filter=false">
        <label>Sample Inputs</label>
        <input type="text" class="form-control">
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
                            <th scope="col">Religion</th>
                            <th scope="col" v-if="verifyPreviledge(can.createUser, can.editUser,can.deleteUser)" style="text-align: right" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person_info, index) in person_infos.data" :key="index">
                            <td>{{ person_info.lastname }}, {{ person_info.firstname }}</td>
                            <td>{{ getAge(person_info.month_day_year)}}</td>
                            <td>{{ person_info.gender }}</td>
                            <td>
                                <span v-if="person_info.ethnicity_blood!=='Others, specify'">
                                    {{ person_info.ethnicity_blood }}</span>
                                <span v-if="person_info.ethnicity_blood==='Others, specify'">
                                    {{ person_info.specify_other_ethnicity }}
                                </span>
                            </td>
                            <td>
                                <span v-if="person_info.purok_sitio">Purok {{ person_info.purok_sitio }},</span>
                                {{ person_info.barangay }}
                            </td>
                            <td>{{ person_info.religion }}</td>
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
</template>

<script>
import Filtering from "@/Shared/Filter";
import Pagination from "@/Shared/Pagination";

export default {
    components: { Pagination, Filtering },
    props: {
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
            filter: false
        };
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/social/muslim",
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
        }
    },
};
</script>
