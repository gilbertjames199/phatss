<template>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>{{ pageTitle }} Intervention</h3>
            <!-- {{ pageTitle }} -->
            <!-- <Link :href="`/appropriations/${pap1.id}`">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
            </svg>
            </Link> -->
            <Link @click="goBack" class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5.0-.708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                </svg>
            </Link>
        </div>


        <div class="col-md-8">
            <form @submit.prevent="submit()">
                <input type="hidden" required>

                <input type="hidden" v-model="form.idpaps" class="form-control" autocomplete="positionchrome-off">
                <label>Intervention</label>
                <input type="text" class="form-control" v-model="form.description" />
                <!-- <input type="hidden" v-model="form.idmfo" class="form-control" autocomplete="chrome-off"> -->
                <div class="fs-6 c-red-500" v-if="form.errors.description">{{ form.errors.description }}</div>


                <label>Type</label>
                <!-- {{  form.types }} -->
                <!-- <input type="text" class="form-control" v-model="form.type" /> -->
                <multiselect v-model="form.types" :options="intervention_types" mode="tags" :searchable="true" />
                <!-- <input type="hidden" v-model="form.idmfo" class="form-control" autocomplete="chrome-off"> -->
                <div class="fs-6 c-red-500" v-if="form.errors.types">{{ form.errors.types }}</div>
                <input type="hidden" v-model="form.id" class="form-control" autocomplete="chrome-off">
                <br><br><br><br><br><br><br><br><br>
                <button type="button" class="btn text-white btn-primary mt-3 text-white" @click="submit()"
                    :disabled="form.processing">
                    Save changes
                </button>

            </form>
        </div>
        <!-- {{ editData.type_tags}} -->
    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
// import Places from "@/Shared/PlacesShared";
// import { ModelSelect } from 'vue-search-select';
// import Select2 from 'vue-select2';
//import BootstrapModalNoJquery from './BootstrapModalNoJquery.vue';
// import PermissionsModal from './PermissionsModal.vue';
export default {
    props: {
        // paps_selected: Object,
        // opcr_targets: Object,
        // programs: Object,
        // ooes: Object,
        // opcr_list_id: String,
        type: Object,
        editData: Object
    },
    components: {
        // PermissionsModal
        //BootstrapModalNoJquery,
        // Select2,
        // ModelSelect,
        // Places: () => new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(Places)
        //     }, 2000)
        // })

    },
    data() {
        return {
            submitted: false,
            form: useForm({
                description: "",
                types: [],
                id: null
            }),
            intervention_types: [],
        };
    },

    mounted() {
        this.getInterventionsAll();
        if (this.editData !== undefined) {
            this.pageTitle = "Edit"
            this.form.description = this.editData.description
            // this.form.types = this.editData.types
            this.extractTypeIds(this.editData.type_tags)
            this.form.id = this.editData.id
        } else {
            this.pageTitle = "Create ";

            this.setCurrentYear()
        }

    },

    methods: {
        submit() {
            if (this.editData !== undefined) {
                    this.form.patch("/intervention/update", this.form);
            } else {
                // alert("Sample");
                var url = "/intervention/store"
                // alert('for store '+url);
                this.form.post(url);
            }
        },

        setCurrentYear() {

            var yr = new Date().getFullYear()
            this.form.year = parseFloat(yr) + 1;
        },

        getInterventionsAll() {
            this.intervention_types = [];
            this.type.forEach(i => {
                //alert(i.permission);
                this.intervention_types.push({
                    'id': i.id,
                    'value': i.id,
                    'label': i.type,
                });
            });
        },
        extractTypeIds(type_data) {
            // Clear existing IDs in form.types
            this.form.types = [];

            // Iterate through the data array and push type IDs to form.types
            type_data.forEach(item => {
                if (item.types && item.types.length > 0) {
                    item.types.forEach(type => {
                        this.form.types.push(type.id);
                    });
                }
            });
        },
        goBack() {
            // Use JavaScript's history API to navigate to the previous page
            if (window.history.length > 1) {
                window.history.back(); // Go to the previous page
            } else {
                this.$router ? this.$router.push('/') : window.location.href = '/'; // Default route or home page
            }
        }



    },

};
</script>
