<template>
    <Head>
        <title>Home</title>
    </Head>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>VIEW HOUSEHOLD INFORMATION</h3>
            <Link href="/households">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
            </svg>
            </Link>
        </div>
    </div>
    <div class="peers fxw-nw jc-sb">

<div class="col-md-5">

    <div class="col-md-11">
        <hr />
        <label for=""><b>DATE OF SURVEY: </b>{{ formatDateToStringMonth(data.date_survey) }}</label><br />
        <!-- {{ form.date_survey }} --{{ editData.date_survey }} --{{ historical_date_classifier }} -->
        <!-- <input type="date" class="form-control" v-model="data.date_survey" readonly/> -->

        <label for="" style="font-weight: bold">ADDRESS:</label>
        <u>
            <span v-if="data.unit_number">{{ data.unit_number }}, </span>
            <span v-if="data.house_number">{{ data.house_number }}, </span>
            <span v-if="data.street">{{ data.street }}, </span>
            {{ data.barangay }}
        </u><br />

    </div>

    <div class="col-md-11">
        <label for="" style="font-weight: bold">HOUSEHOLD HEAD: &nbsp;</label>
        <u>
            <span v-if="data.LAST_NAME">{{ data.LAST_NAME }}, </span>
            <span v-if="data.FIRST_NAME">{{ data.FIRST_NAME }}&nbsp;</span>
            <span v-if="data.MIDDLENAME">{{ data.MIDDLENAME }}&nbsp;</span>
            <span v-if="data.SUFFIX && data.SUFFIX!=='N/A'">{{ data.SUFFIX }} </span>
        </u>
        <br />

    </div>
    <div class="col-md-11">
        <label for="" style="font-weight: bold">PERSON INTERVIEWED: &nbsp;</label>

        <u>
            <span v-if="data.LAST_NAME">{{ data.LAST_NAME2 }}, </span>
            <span v-if="data.FIRST_NAME">{{ data.FIRST_NAME2 }}&nbsp;</span>
            <span v-if="data.MIDDLENAME">{{ data.MIDDLENAME2 }}&nbsp;</span>
            <span v-if="data.SUFFIX2 && data.SUFFIX2!=='N/A'">{{ data.SUFFIX2 }} </span>
        </u>
        <br />
        <label for="" style="font-weight: bold">RISK ASSESSMENT:&nbsp;</label>
        <u>{{ data.relative_risk_assessment }}</u><br />
        <hr />
    </div>

    <h4>QUESTIONS</h4>
    <div class="col-md-11">
        <hr>
    </div>
    <!-- <div class="col-md-7 "> -->
    <label for="" style="font-weight: bold">1. Is there a toilet?</label>
    &nbsp;{{ data._2_toilet_used }}
    <br />



    <label for="" style="font-weight: bold">2. Is it being used?</label>
    &nbsp;{{ data._2_toilet_used }}
    <br />


    <label for="" style="font-weight: bold">3. Is the toilet functional and well maintained?</label>
    &nbsp;{{ data._3_toilet_functional }}<br />


    <label for="" style="font-weight: bold">4. Is there soap and water at or near the toilet?</label>
    &nbsp;{{ data._4_soap }}<br />


    <label for="" style="font-weight: bold">5. Are children, elderly, and PWDs' feces and diaper properly disposed.
        (Y/N/NA if there are no children, elderly and PWD members in the household)</label>
        &nbsp;{{ data._5_children }}<br />


    <label for="" style="font-weight: bold">6. Are there no more feces found in open spaces in the community?</label>
    &nbsp;{{ data._6_spaces }}<br />



    <label for="" style="font-weight: bold">7. Are there no feces, sanitary napkins, diapers and solid waste found in open spaces in the community? (Y/N)</label>
    &nbsp;{{ data._7_feces }}<br />


    <label for="" style="font-weight: bold">8. Does the household practice waste segregation and/or composting? G2</label>
    &nbsp;{{ data._8_composting }}<br />


    <label for="" style="font-weight: bold">9. Does the household dispose their garbage properly? G2</label>
    &nbsp;{{ data._9_dispose }}<br />


    <label for="" style="font-weight: bold">10. Have you ever emptied your septic tank or pit? (Y/N) G3</label><br />
    &nbsp;{{ data._10_emptied }}<br />


    <div v-if="this.data._10_emptied=='Yes'">
        <label for="" style="font-weight: bold">11. If yes in Q#10, what did you do with the collected excreta/fecal sludge? G3</label><br />
        &nbsp;{{ data._11_do_sludge }}<br />

    </div>
    <div v-if="this.data._10_emptied=='No'">
        <label for="" style="font-weight: bold">12. If no in Q#10, what do you plan to do once the pit/septic tank is full? G3</label>
        &nbsp;{{ data._12_do_tank }}<br />

    </div>

    <label for="" style="font-weight: bold">13. Is there a Municipal Sewerage Treatment Facility?</label>
    &nbsp;{{ data._13_sewer }}<br />

    <label for="" style="font-weight: bold">14. Check the toilet type that applies</label><br />
    <div>
        <input type="checkbox" name="_14_check_flush_pour_to_sewer"
                v-model="data._14_check_flush_pour_to_sewer" :true-value="1" :false-value="0"
                :checked="data._14_check_flush_pour_to_sewer == 1" />
            &nbsp;<label for="_14_check_flush_pour_to_sewer"> Flush/pour flush to sewer</label>&nbsp;
            <br />

        <input type="checkbox" name="_14_check_flush_pour_to_septic_tank"
                v-model="data._14_check_flush_pour_to_septic_tank" :true-value="1" :false-value="0"
                :checked="data._14_check_flush_pour_to_septic_tank == 1" />
            &nbsp;<label for="_14_check_flush_pour_to_septic_tank"> Flush/pour flush to septic tank</label>&nbsp;
            <br />

        <input type="checkbox" name="_14_check_flush_pour_to_pit"
                v-model="data._14_check_flush_pour_to_pit" :true-value="1" :false-value="0"
                :checked="data._14_check_flush_pour_to_pit == 1" />
            &nbsp;<label for="_14_check_flush_pour_to_pit"> Flush/pour flush to pit</label>&nbsp;
            <br />

        <input type="checkbox"
                v-model="data._14_check_ventilated_imrpoved_pit_Latrine" :true-value="1" :false-value="0"
                :checked="data._14_check_ventilated_imrpoved_pit_Latrine == 1" />
            &nbsp; Ventilated improved pit latrine (with vent, lid, floor, slab)&nbsp;
            <br />
        <input type="checkbox"
                v-model="data._14_check_pit_latrine" :true-value="1" :false-value="0"
                :checked="data._14_check_pit_latrine == 1" />
            &nbsp; Pit latrine (with lid, floor, slab)&nbsp;
            <br />
    </div>
    <label for="" style="font-weight: bold">15. Does the household use a shared toilet? (G1)</label>
    &nbsp;{{ data.no_15_set_affected }}<br />

    <div v-if="this.data._15_household=='Yes'">
        <label for="" style="font-weight: bold">15.1 If Yes, how many people use the toilet?</label>&nbsp;{{ data._15_household }}<br />

    </div>
    <label for="" style="font-weight: bold">16. Does the household use a communal/public toilet (G1)</label>
    &nbsp;{{ data._16_household }}<br />


    <label for="" style="font-weight: bold">17. Is the household using their own toilet?</label>
    &nbsp;{{ data._17_using }}<br />

    <div v-if="this.data._17_using=='No'">
        <label for="" style="font-weight: bold">18. If the household is not using their own toilet, state the reason, and take a photo of the house and its immediate surroundings.</label>
        &nbsp;{{ data._18_If_the_household_mediate_surroundings }}<br />
    </div>
    <label for="" style="font-weight: bold">19. Visit the Materials Recovery Facility (MRF) in the barangay. Is the MRF Functional?</label>
    &nbsp;{{ data._19_materials }}<br />


    <label for="" style="font-weight: bold">Name of MRF:</label>
    &nbsp;{{ data.Name_of_MRF }}<br />


    <label for="" style="font-weight: bold">Location:</label>
    &nbsp;{{ data.location_mrf }}<br />
    <!-- </div> -->
</div>
</div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
import Filtering from "@/Shared/Filter";
import Pagination from "@/Shared/Pagination";
export default {
    props: {
        auth: Object,
        data: Object,
        filters: Object,
    },
    components:{
        Pagination, Filtering
    },
    computed: {

    },
    data() {
        return{


        }
    },
    mounted(){

    },
    watch: {

    },
    methods: {



    }
}
</script>
