<template>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>{{ pageTitle }} Clinical Records</h3>
            <Link href="/ImplementingTeam">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
            </svg>
            </Link>
        </div>

        <!-- <div class="col-md-8">
            <button class="btn btn-secondary" @click="showModal" :disabled="submitted">Permissions</button>
        </div> -->

        <div class="col-md-8">
            <form @submit.prevent="submit()">
                <input type="hidden" required>

                <h5>Type of Visit</h5>
                <!-- <div class="peers">
                    <div>
                        <input
                            type="checkbox"
                            v-model="form.ptcr.new_patient"
                            :true-value="1"
                            :false-value="0"
                            class="form-check-input"
                            >&nbsp;
                            <label for="">New Patient </label>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>
                        <input
                            type="checkbox"
                            v-model="form.ptcr.old_patient"
                            :true-value="1"
                            :false-value="0"
                            class="form-check-input"
                            >&nbsp;
                            <label for="">Old Patient </label>

                    </div>
                </div> -->
                <div class="peers">
                    <div class="peer mt-2">
                        <input
                            type="radio"
                            v-model="form.ptcr.type_of_visit"
                            :value="1"
                            class="form-check-input"
                            id="new_patient"
                        >&nbsp;
                        <label for="new_patient">New Patient </label>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="peer mt-2">
                        <input
                            type="radio"
                            v-model="form.ptcr.type_of_visit"
                            :value="0"
                            class="form-check-input"
                            id="old_patient"
                        >&nbsp;
                        <label for="old_patient">Old Patient</label>
                    </div>
                </div>
                <!-- {{ form.ptcr.type_of_visit }} -->
                <div v-if="form.ptcr.type_of_visit==1">

                </div>
                <label for="">FIRST NAME</label>
                <input type="text" v-model="form.ptr.first_name" class="form-control" autocomplete="chrome-off" :disabled="form.ptcr.type_of_visit == 0">

                <label for="">MIDDLE NAME</label>
                <input type="text" v-model="form.ptr.middle_name" class="form-control" autocomplete="chrome-off" :disabled="form.ptcr.type_of_visit == 0">

                <label for="">LAST NAME</label>
                <input type="text" v-model="form.ptr.last_name" class="form-control" autocomplete="chrome-off" :disabled="form.ptcr.type_of_visit == 0">

                <label for="">ADDRESS</label>
                <hr>

                <label for="">Municipality</label>
                <select v-model="form.ptr.municipality" class="form-control"
                    @change="loadBarangays(form.ptr.municipality)">
                    <option></option>
                    <option v-for="mun in municipalities">
                        {{ mun }}
                    </option>
                </select>
                <!-- <div class="fs-6 c-red-500" v-if="form.errors.municipality">{{ form.errors.municipality }}</div> -->

                <label for="">Barangay</label> {{  form.barangay }}
                <select v-model="form.ptr.barangay" class="form-control"
                    @change="loadPuroks(this.form.ptr.barangay, this.form.ptr.municipality)">
                    <option></option>
                    <!-- :value="bar.code" -->
                    <option v-for="bar in all_barangays" >
                        {{ bar.barangay }}
                    </option>
                </select>
                <!-- <div class="fs-6 c-red-500" v-if="form.errors.barangay">{{ form.errors.barangay }}</div> -->

                <label for="">Purok/Sitio</label>
                <select v-model="form.ptr.purok_sitio" class="form-control">
                    <option></option>
                    <option v-for="pur in all_puroks">
                        {{ pur.purok_sitio }}
                    </option>
                </select>

                <label for="">HOUSE NUMBER/ STREET</label>
                <input type="text" v-model="form.ptr.address_house_number_street" class="form-control" autocomplete="chrome-off" :disabled="form.ptcr.type_of_visit == 0">

                <!-- <div class="fs-6 c-red-500" v-if="form.errors.purok_sitio">{{ form.errors.purok_sitio }}</div> -->
                <!-- <div class="fs-6 c-red-500" v-if="form.errors.ptr.first_name">{{ form.errors.position }}</div> -->

                <label for="">POSITION</label>
                <input type="text" v-model="form.position" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.position">{{ form.errors.position }}</div>

                <label for="">COMPETENCY</label>
                <input type="text" v-model="form.competency" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.competency">{{ form.errorscompetency }}</div>

                <label for="">ROLE</label>
                <input type="text" v-model="form.role" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.role">{{ form.errors.role }}</div>

                <label for="">OFFICE</label>
                <!--<input type="text" v-model="form.FFUNCCOD" class="form-control" autocomplete="chrome-off">-->
                <select class="form-control" v-model="form.FFUNCCOD">
                    <option v-for="functional in functions" :value="functional.FFUNCCOD">
                        {{ functional.FFUNCTION }}
                    </option>
                </select>

                <input type="hidden" v-model="form.id" class="form-control" autocomplete="chrome-off">

                <button type="button" class="btn btn-primary mt-3 text-white" @click="submit()" :disabled="form.processing">
                    Save changes
                </button>
            </form>
        </div>


    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
//import Places from "@/Shared/PlacesShared";
//import BootstrapModalNoJquery from './BootstrapModalNoJquery.vue';

export default {
    props: {
        editData: Object,
        sectors: Object,
        functions: Object,
    },
    components: {
        //BootstrapModalNoJquery,

        Places: () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(Places)
            }, 2000)
        })

    },
    data() {
        return {
            submitted: false,
            form: useForm({
                ptr: {
                    first_name: "",
                    middle_name: "",
                    last_name: "",
                    address_province: "",
                    address_municipality: "",
                    address_barangay: "",
                    address_purok_sitio: "",
                    address_house_number_street: "",
                    birthdate: "",
                    sex: "",
                    occupation: "",
                    birth_place_province: "",
                    birth_place_municipality: "",
                    birth_place_barangay: "",
                    birth_place_purok_sitio: "",
                    birth_place_house_number_street: "",
                    civil_status: "",
                    spouse_first: "",
                    spouse_middle: "",
                    spouse_last: "",
                    mother_first: "",
                    mother_middle: "",
                    mother_last: "",
                    father_first: "",
                    father_middle: "",
                    father_last: "",
                    phil_health_member: "",
                    phil_health_no: "",
                    Religion: "",
                    Nationality: "",
                    spouse_occ: "",
                    tel_no: "",
                    insurance: "",
                },
                ptcr: {
                    patient_id: "",
                    type_of_visit: 1,
                    blood_pressure: "",
                    temperature: "",
                    pulse_cardiac_rate: "",
                    respiratory_rate: "",
                    height: "",
                    weight: "",
                    ob_gyn_lmp: "",
                    ob_gyn_edc: "",
                    ob_gyn_aog: "",
                    allergies: 0,
                    allergies_foods: "",
                    allergies_drugs: "",
                    allergies_others: "",
                    allergies_others_specification: "",
                    covid_vaccinated: 0,
                    chief_complaints: "",
                    smoker: 0,
                    smoker_type_e_cigarrette: 0,
                    smoker_type_cigarrette: 0,
                    smoker_type_cigars: 0,
                    smoker_type_pipes: 0,
                    smoker_others_specify: 0,
                    smoker_others_specification: 0,
                    smoker_quitter: 0,
                    doctor_order_subjective: "",
                    doctor_order_objective: "",
                    doctor_order_assessment: "",
                    doctor_order_plan: "",
                }
            }),
            mun: this.$props.p_mun,
            bar: this.$props.p_bar,
            pageTitle: ""
        };
    },

    mounted() {

        if (this.editData !== undefined) {
            if (this.bari) {
                this.bar = this.bari
            }
            this.pageTitle = "Edit"
            this.form.name = this.editData.name
            this.form.position = this.editData.position
            this.form.competency = this.editData.competency
            this.form.role = this.editData.role
            this.form.id = this.editData.id
            this.form.FFUNCCOD = this.editData.FFUNCCOD
        } else {
            this.pageTitle = "Create"
        }

    },

    methods: {
        submit() {
            this.form.target_qty = parseFloat(this.form.target_qty1) + parseFloat(this.form.target_qty2) + parseFloat(this.form.target_qty3) + parseFloat(this.form.target_qty4);
            //alert(this.form.target_qty);
            if (this.editData !== undefined) {
                this.form.patch("/ImplementingTeam/" + this.form.id, this.form);
            } else {
                this.form.post("/ImplementingTeam");
            }
        },
        filter_me(type){
            // alert(this.mun)
            if(type==='mun'){
                // alert(type);
                this.bar="";
                this.pur="";
            }
            if(type==='bar'){
                this.pur="";
            }
            this.$inertia.get(
                    "/patient-records/create",
                    {
                        mun: this.mun,
                        bar: this.bar,
                        pur: this.pur,
                        relrisk: this.relrisk,
                        my_filter: this.my_filter
                        // division: this.division_selected
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        replace: true,
                        onSuccess: () => {
                            window.location.reload();
                        },
                    }
                );
        },
    },
};
</script>
