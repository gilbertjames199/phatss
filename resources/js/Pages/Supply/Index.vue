<template>
    <Head>
        <title>Supply</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Supplies</h3>
            <Link href="/supplies/create" class="btn btn-primary text-white">Add Supply</Link>
        </div>
        <div class="bgc-white p-20 bd">
            <table class="table table-sm table-borderless table-striped table-hover">
                <thead>
                    <tr class="bg-secondary text-white">
                        <th></th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dat in data.data">
                        <td></td>
                        <td>{{ dat.item }}</td>
                        <td>{{ dat.quantity }} {{ dat.quantity_unit }}</td>
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
                                        <Link class="dropdown-item"
                                            :href="`/supplies/edit/${dat.id}`">
                                        Edit</Link>
                                    </li>
                                    <li>
                                        <Link class="text-danger dropdown-item" @click="deleteSupply(dat.id)">
                                        Delete
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <!-- <tr >
                        <td></td>
                        <td>Jerry Cans</td>
                        <td>700 units</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Hygeine Kits</td>
                        <td>700 pcs</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Chlorine</td>
                        <td>3 drums</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Colilert</td>
                        <td>1500 pcs</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Collapsible</td>
                        <td>40 pcs</td>
                    </tr> -->


                </tbody>
            </table>
            <pagination :next="data.next_page_url" :prev="data.prev_page_url" />
            <!-- {{ data }} -->
        </div>
    </div>
</template>

<script>
import Pagination from "@/Shared/Pagination";
import Filtering from "@/Shared/Filter";

export default {
    props: {
        data: Object
    },
    components:{
        Pagination, Filtering
    },
    watch: {
        search: _.debounce(function (value) {
            this.$inertia.get(
                "/supplies",
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
        deleteSupply(id) {
            let text = "WARNING!\nAre you sure you want to delete this supply?" + id;
            if (confirm(text) == true) {
                this.$inertia.delete("/supplies/" + id);
            }
        },
    }
}
</script>
