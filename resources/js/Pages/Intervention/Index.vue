<template>
    <Head>
        <title>Interventions</title>
    </Head>
    <!-- <h1>Interventions</h1> -->
    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Interventions</h3>
            <div class="peers">
                <div class="peer mR-10">
                    <input v-model="search" type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
                <div class="peer">
                    <Link class="btn btn-primary btn-sm" :href="`/intervention/create`">Add Interventions
                    </Link>
                </div>
            </div>
        </div>
        <div class="masonry-item w-100">
            <div class="bgc-white p-20 bd">
                <div class="table-responsive">
                    <table class="table table-sm table-borderless table-striped table-hover">
                        <thead>
                            <tr class="bg-secondary text-white">
                                <th>Intervention</th>
                                <th>Classification</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dat in data.data">
                                <td>{{ dat.description }}</td>
                                <td>
                                    <span v-for="(type, innerIndex) in dat.type_tags" :key="innerIndex">
                                        <span v-for="type_inner in type.types">
                                            <span v-if="type_inner">
                                                {{ type_inner.type }}
                                                <span v-if="innerIndex !== dat.type_tags.length - 1">/</span>
                                            </span>
                                        </span>
                                    </span>
                                </td>
                                <td style="text-align: right">
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
                                            <li >
                                                <Link class="dropdown-item" :href="`/intervention/${dat.id}/edit`">Edit</Link>
                                            </li>
                                            <li>
                                                <Link class="text-danger dropdown-item"
                                                    @click="deleteIntervention(dat.id, dat.description)">
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
import Pagination from "@/Shared/Pagination";
import Filtering from "@/Shared/Filter";

export default{
    props: {
        data: Object,
        filters: Object,
    },
    components: {
        Pagination, Filtering
    },
    data(){
        return{
            search: this.$props.filters.search,
        }
    },

    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/intervention",
                { search: value },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
    },
    methods:{
        deleteIntervention(id, description){
            let text = "WARNING!\nAre you sure you want to delete the intervention " + description + " ? " ;
            if (confirm(text) == true) {
                this.$inertia.delete("/intervention/" + id);
            }
        }
    }
}
</script>
