<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Issue Interventions</h3>
            <div class="peers">
                <div class="peer mR-10"><input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search..."></div>
                <div class="peer mR-10">
                     <Link :href="`/issue-intervention/create/${issue.id}/123jk423`" class="btn btn-primary text-white">Add Interventions</Link>
                     Results per page
                     <select v-model="count_per_page" @click="filterData">
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                        <option>300</option>
                        <option>500</option>
                     </select>
                </div>
                <div class="peer mR-10">
                    <Link href="/issue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5.5 0 0 0-.708 0Z"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
        <div>
            <table>
                <tr>
                    <th>ISSUE: </th>
                    <td><u>{{ issue.issue }} &nbsp;</u></td>
                    <th>LOCATION:</th>
                    <td>{{ issue.barangay }}</td>
                </tr>
                <tr>
                    <th>TYPE: </th>
                    <td><u>{{ issue.type }}</u></td>
                </tr>
            </table>
            <!-- {{ issue }} -->
        </div>
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

                                <th>Intervention</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dat in data.data">
                                <td></td>

                                <td>
                                    <span >{{ dat.intervention.description }}</span>
                                </td>
                                <td>{{ setStatus(dat.status) }}</td>
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
                                            <!-- <li>
                                                <Link class="dropdown-item" :href="`issue/view/${dat.id}`">View nearest response center</Link>
                                            </li>
                                            <li>
                                                <Link class="dropdown-item" :href="`issue-intervention/view/${dat.id}`">View Interventions</Link>
                                            </li> -->
                                            <li>
                                                <Link class="dropdown-item"
                                                    :href="`/issue-intervention/${dat.id}/mgdsg/23/4agobip/edit`">
                                                Edit</Link>
                                            </li>
                                            <li>
                                                <Link class="text-danger dropdown-item" @click="deleteIssue(dat.id)">
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
        data: Object,
        filters: Object,
        issue: Object
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
                this.$inertia.delete("/issue-intervention/" + id);
            }
        },
        setStatus(stat_num){
            switch(stat_num){
                case "0":
                    // alert("0")
                    return "Added";
                case "1":
                    return "On-going";
                case "2":
                    return "Intervention Completed";
                default:
                    return "Unknown status"
            }
        }
    }
}
</script>
