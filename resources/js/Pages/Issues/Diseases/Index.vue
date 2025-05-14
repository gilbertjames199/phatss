<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Sanitation Issues</h3>
            <div class="peers">
                <div class="peer mR-10"><input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search..."></div>
                <div class="peer mR-10">

                     <Link :href="`/issue/report`" class="btn btn-primary text-white">Report Issues</Link>
                     Results per page
                     <select v-model="count_per_page" @click="filterData">
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                        <option>300</option>
                        <option>500</option>
                     </select>
                </div>
            </div>
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
                                <th>Issue</th>
                                <th>Location</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dat,index) in data">
                                <td></td>
                                <td>
                                    {{ dat.issue }}
                                </td>
                                <td>
                                    <span v-if="dat.barangay">{{ dat.barangay }}</span>
                                </td>
                                <td>
                                    <!-- {{ number_of_patients[index] }} {{ dat.id }} -->
                                    <input type="number" v-model="number_of_patients[index]" class="form-control form-control-sm" placeholder="0.00"
                                    @change="saveQuantity(dat.id,index)"/>
                                </td>
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
                                                <Link class="dropdown-item" :href="`issue/view/${dat.id}`">View nearest response center</Link>
                                            </li>
                                            <li>
                                                <Link class="dropdown-item" :href="`issue-intervention/view/${dat.id}`">View Interventions</Link>
                                            </li>
                                            <li>
                                                <Link class="dropdown-item"
                                                    :href="`/issue/${dat.id}/lfdsf/23/4afoaip/edit`">
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
        num_patients: Array
    },
    components:{
        Pagination, Filtering
    },
    computed: {

    },
    mounted() {
        this.number_of_patients = this.num_patients;
    },
    data() {
        return{
            count_per_page: 10,
            number_of_patients: [],
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
                this.$inertia.delete("/issue/" + id);
            }
        },
        saveQuantity(id, index){
            axios.post(`/issue/diseases/update_quantity/${id}`, {
                number_of_patients: this.number_of_patients[index]
            })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error("Error updating:", error.response?.data || error);
            });
        }
    }
}
</script>
