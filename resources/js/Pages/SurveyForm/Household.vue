<template>
    <!-- <h1>H1</h1> -->
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>{{ pageTitle }} Survey</h3>
            <button class="btn btn-danger text-white" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                    <path fill-rule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                </svg>
            </button>
        </div>
        <div class="col-md-8">
            <form @submit.prevent="submit()">

            </form>
        </div>
    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
// import { ModelSelect } from 'vue-search-select';

export default{
    props: {
        editData: Object,
        id: String,
        auth: Object
    },
    components: {
        // ModelSelect
    },
    data(){
        return{
            pageTitle: null,
            form: useForm({
                id: "",
                date_survey: "",
                time_started: "",
                ENUMERATOR: "",
                district: "",
                municipality: "",
                barangay: "",
                purok_sitio: "",
                street: "",
                housenumber: "",
                unitnumber: "",
                Location: "",
                _Location_latitude: "",
                _Location_longitude: "",
                _Location_altitude: "",
                _Location_precision: "",
                name_respondent: "",
                FIRST_NAME: "",
                mname: "",
                suffix: "",
                name_respondent_001: "",
                FIRST_NAME_001: "",
                mname_001: "",
                suffix_001: "",
                _1_has_toilet: "",
                _2_toilet_used: "",
                _3_toilet_functional: "",
                _4_soap: "",
                _5_children: "",
                _6_spaces: "",
                _7_feces: "",
                _8_composting: "",
                _9_dispose: "",
                _10_emptied: "",
                _11_do_sludge: "",
                _12_do_tank: "",
                _13_sewer: "",
                _14_check: "",
                _14_check_1: "",
                _14_check_2: "",
                _14_check_3: "",
                _14_check_4: "",
                _14_check_5: "",
                _15_household: "",
                _15_1_people: "",
                _16_household: "",
                _17_using: "",
                _18_If_the_household_mediate_surroundings: "",
                Take_a_photo_for_question_18: "",
                Take_a_photo_for_question_18_URL: "",
                _19_materials: "",
                Name_of_MRF: "",
                Location_001: "",
                risk_level: "",
                Risk_Level_is_risk_level: "",
                Relative_risk_is_re_tive_risk_assessment: "",
                _1_Number_of_function_for_children_to_use: "",
                _2_school_soap: "",
                _3_school_gender: "",
                Check_type_of_toilet_present: "",
                Check_type_of_toilet_present_1: "",
                Check_type_of_toilet_present_2: "",
                Check_type_of_toilet_present_3: "",
                Check_type_of_toilet_present_4: "",
                _4_school_compost: "",
                _5_school_segre: "",
                _1_cdc_toilet: "",
                _2_cdc_func: "",
                _3_cdc_safe: "",
                Check_type_of_toilet_present_001: "",
                Check_type_of_toilet_present_001_1: "",
                Check_type_of_toilet_present_001_2: "",
                Check_type_of_toilet_present_001_3: "",
                Check_type_of_toilet_present_001_4: "",
                Check_type_of_toilet_present_001_5: "",
                _4_cdc_soap: "",
                _5_cdc_waste: "",
                _6_cdc_garb: "",
                _C_1_toilet: "",
                _C_2_functional: "",
                _C_3_water: "",
                Check_type_of_toilet_present_002: "",
                Check_type_of_toilet_present_002_flush_sewer: "",
                Check_type_of_toilet_present_002_flush_septic: "",
                Check_type_of_toilet_present_002_flush_pit: "",
                Check_type_of_toilet_present_002_ventilated: "",
                Check_type_of_toilet_present_002_pit_lat: "",
                _C_4_segregation: "",
                _C_5_dispose: "",
                no_of_heads: "",
                name_enumerator: "",
                pupils: "",
                toilets: "",
                calc_ratio: "",
                _C_Average_Pupil_Fu_pils_is_calc_ratio: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
                district: "",
            })
        }
    },
    watch: {

    },
    computed: {

    },
    mounted(){
        if(this.editData !== undefined){
            this.pageTitle = "Edit"
        }else{
            this.pageTitle = "Create"
        }
    },
    methods: {
        submit(){
            if(this.editData !== undefined){
                this.form.patch("/survey/household/update/{id}")
            }else{
                this.form.post("/survey/store");
            }
        }
    }
}
</script>
