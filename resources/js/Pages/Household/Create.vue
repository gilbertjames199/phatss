<template>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <div class="col-md-12">
                <!-- {{ pageTitle }}  -->
                <h2 class="text-secondary">Edit Household</h2>
                <hr>
            </div>
        </div>
        <!-- {{ all_barangays }} -->
        <!-- {{ all_barangays }} -->
        <!-- {{ form._uuid }} -->
        <form @submit.prevent="SubmitEvent()">
            <div class="peers fxw-nw jc-sb">

                <div class="col-md-5">
                    <h4>INFORMATION</h4>
                    <div class="col-md-11">
                        <hr>
                    </div>

                    <div class="col-md-11">
                        <label for="" style="font-weight: bold">ADDRESS</label>
                        <br />
                        <label for="">District</label>
                        <select v-model="form.district" class="form-control"
                            @change="loadMunicipalities(form.district)">
                            <option>District 1</option>
                            <option>District 2</option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.district">{{ form.errors.district }}</div>


                        <label for="">Municipality</label>
                        <select v-model="form.municipality" class="form-control"
                            @change="loadBarangays(form.municipality)">
                            <option></option>
                            <option v-for="mun in municipalities">
                                {{ mun }}
                            </option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.municipality">{{ form.errors.municipality }}</div>

                        <label for="">Barangay</label> {{  form.barangay }}
                        <select v-model="form.barangay" class="form-control"
                            @change="loadPuroks(this.form.barangay, this.form.municipality)">
                            <option></option>
                            <!-- :value="bar.code" -->
                            <option v-for="bar in all_barangays" >
                                {{ bar.barangay }}
                            </option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.barangay">{{ form.errors.barangay }}</div>

                        <label for="">Purok/Sitio</label>
                        <select v-model="form.purok_sitio" class="form-control">
                            <option></option>
                            <option v-for="pur in all_puroks">
                                {{ pur.purok_sitio }}
                            </option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.purok_sitio">{{ form.errors.purok_sitio }}</div>

                        <label for="">Street</label>
                        <input type="text" v-model="form.street" class="form-control" autocomplete="chrome-off">

                        <label for="">House Number</label>
                        <input type="text" v-model="form.house_number" class="form-control"
                            autocomplete="chrome-off">

                        <label for="">Unit Number</label>
                        <input type="text" v-model="form.unit_number" class="form-control"
                            autocomplete="chrome-off">
                        <hr style="border-top: 1px solid black" />
                    </div>
                    <!-- <div class="col-md-11">
                        <label for="">First Name</label>
                        <input type="text" v-model="form.FIRST_NAME" class="form-control" autocomplete="chrome-off">

                        <label for="">Middle Name</label>
                        <input type="text" v-model="form.MIDDLENAME" class="form-control" autocomplete="chrome-off">
                        <hr />
                        <label for="">Suffix: &nbsp;&nbsp;</label>
                        <select v-model="form.SUFFIX">
                            <option>Sr.</option>
                            <option>Jr.</option>
                            <option>II</option>
                            <option>III</option>
                            <option>IV</option>
                            <option>N/A</option>
                        </select>
                        <hr />
                    </div> -->
                    <div class="col-md-11">
                        <label for="" style="font-weight: bold">HOUSEHOLD HEAD</label><br />
                        <label for="">Last Name</label>
                        <input type="text" v-model="form.LAST_NAME" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.LAST_NAME">{{ form.errors.LAST_NAME }}</div>

                        <label for="">First Name</label>
                        <input type="text" v-model="form.FIRST_NAME" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.FIRST_NAME">{{ form.errors.FIRST_NAME }}</div>

                        <label for="">Middle Name</label>
                        <input type="text" v-model="form.MIDDLENAME" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.MIDDLENAME">{{ form.errors.MIDDLENAME }}</div>
                        <hr />
                        <label for="">Suffix: &nbsp;&nbsp;</label>
                        <select v-model="form.SUFFIX">
                            <option>Sr.</option>
                            <option>Jr.</option>
                            <option>II</option>
                            <option>III</option>
                            <option>IV</option>
                            <option>N/A</option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.SUFFIX">{{ form.errors.SUFFIX }}</div>
                        <hr />
                    </div>
                    <div class="col-md-11">
                        <label for="" style="font-weight: bold">PERSON INTERVIEWED</label><br />
                        <label for="">Last Name</label>
                        <input type="text" v-model="form.LAST_NAME2" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.LAST_NAME2">{{ form.errors.LAST_NAME2 }}</div>

                        <label for="">First Name</label>
                        <input type="text" v-model="form.FIRST_NAME2" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.FIRST_NAME2">{{ form.errors.FIRST_NAME2 }}</div>

                        <label for="">Middle Name</label>
                        <input type="text" v-model="form.MIDDLENAME2" class="form-control" autocomplete="chrome-off">
                        <div class="fs-6 c-red-500" v-if="form.errors.MIDDLENAME2">{{ form.errors.MIDDLENAME2 }}</div>
                        <hr />
                        <label for="">Suffix: &nbsp;&nbsp;</label>
                        <select v-model="form.SUFFIX2">
                            <option>Sr.</option>
                            <option>Jr.</option>
                            <option>II</option>
                            <option>III</option>
                            <option>IV</option>
                            <option>N/A</option>
                        </select>
                        <div class="fs-6 c-red-500" v-if="form.errors.SUFFIX2">{{ form.errors.SUFFIX2 }}</div>
                        <hr />
                    </div>
                </div>
                <div class="col-md-7">
                    <h4>QUESTIONS</h4>
                    <div class="col-md-11">
                        <hr>
                    </div>
                    <!-- <div class="col-md-7 "> -->
                    <label for="" style="font-weight: bold">1. Is there a toilet?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._1_has_toilet" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._1_has_toilet" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._1_has_toilet">This field is required</div>

                    <label for="" style="font-weight: bold">2. Is it being used?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._2_toilet_used" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._2_toilet_used" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._2_toilet_used">This field is required</div>

                    <label for="" style="font-weight: bold">3. Is the toilet functional and well maintained?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._3_toilet_functional" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._3_toilet_functional" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._3_toilet_functional">This field is required</div>

                    <label for="" style="font-weight: bold">4. Is there soap and water at or near the toilet?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._4_soap" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._4_soap" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._4_soap">This field is required</div>

                    <label for="" style="font-weight: bold">5. Are children, elderly, and PWDs' feces and diaper properly disposed.
                        (Y/N/NA if there are no children, elderly and PWD members in the household)</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._5_children" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._5_children" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._5_children">This field is required</div>

                    <label for="" style="font-weight: bold">6. Are there no more feces found in open spaces in the community?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._6_spaces" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._6_spaces" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._6_spaces">{{ form.errors._6_spaces }}</div>

                    <label for="" style="font-weight: bold">7. Are there no feces, sanitary napkins, diapers and solid waste found in open spaces in the community? (Y/N)</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._7_feces" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._7_feces" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._7_feces">{{ form.errors._7_feces }}</div>

                    <label for="" style="font-weight: bold">8. Does the household practice waste segregation and/or composting? G2</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._8_composting" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._8_composting" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._8_composting">{{ form.errors._8_composting }}</div>

                    <label for="" style="font-weight: bold">9. Does the household dispose their garbage properly? G2</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._9_dispose" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._9_dispose" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._9_dispose">{{ form.errors._9_dispose }}</div>

                    <label for="" style="font-weight: bold">10. Have you ever emptied your septic tank or pit? (Y/N) G3</label><br />
                    <!-- {{ form._10_emptied }} -->
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._10_emptied" @change="no_10_set_affected"/>
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._10_emptied" @change="no_10_set_affected"/>
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._10_emptied">{{ form.errors._10_emptied }}</div>

                    <div v-if="this.form._10_emptied=='Yes'">
                        <label for="" style="font-weight: bold">11. If yes in Q#10, what did you do with the collected excreta/fecal sludge? G3</label><br />
                        <div>
                            <input type="text" v-model="form._11_do_sludge" class="form-control" autocomplete="chrome-off">
                        </div>
                    </div>
                    <div v-if="this.form._10_emptied=='No'">
                        <label for="" style="font-weight: bold">12. If no in Q#10, what do you plan to do once the pit/septic tank is full? G3</label><br />
                        <div>
                            <input type="text" v-model="form._12_do_tank" class="form-control" autocomplete="chrome-off">
                        </div>
                    </div>

                    <label for="" style="font-weight: bold">13. Is there a Municipal Sewerage Treatment Facility?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._13_sewer" />
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._13_sewer" />
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._13_sewer">{{ form.errors._13_sewer }}</div>

                        <label for="" style="font-weight: bold">14. Check the toilet type that applies</label><br />
                    <div>
                        <input type="checkbox" name="_14_check_flush_pour_to_sewer"
                                v-model="form._14_check_flush_pour_to_sewer" :true-value="1" :false-value="0"
                                :checked="form._14_check_flush_pour_to_sewer == 1" />
                            &nbsp;<label for="_14_check_flush_pour_to_sewer"> Flush/pour flush to sewer</label>&nbsp;
                            <br />

                        <input type="checkbox" name="_14_check_flush_pour_to_septic_tank"
                                v-model="form._14_check_flush_pour_to_septic_tank" :true-value="1" :false-value="0"
                                :checked="form._14_check_flush_pour_to_septic_tank == 1" />
                            &nbsp;<label for="_14_check_flush_pour_to_septic_tank"> Flush/pour flush to septic tank</label>&nbsp;
                            <br />

                        <input type="checkbox" name="_14_check_flush_pour_to_pit"
                                v-model="form._14_check_flush_pour_to_pit" :true-value="1" :false-value="0"
                                :checked="form._14_check_flush_pour_to_pit == 1" />
                            &nbsp;<label for="_14_check_flush_pour_to_pit"> Flush/pour flush to pit</label>&nbsp;
                            <br />

                        <input type="checkbox"
                                v-model="form._14_check_ventilated_imrpoved_pit_Latrine" :true-value="1" :false-value="0"
                                :checked="form._14_check_ventilated_imrpoved_pit_Latrine == 1" />
                            &nbsp; Ventilated improved pit latrine (with vent, lid, floor, slab)&nbsp;
                            <br />
                        <input type="checkbox"
                                v-model="form._14_check_pit_latrine" :true-value="1" :false-value="0"
                                :checked="form._14_check_pit_latrine == 1" />
                            &nbsp; Pit latrine (with lid, floor, slab)&nbsp;
                            <br />
                    </div>
                    <label for="" style="font-weight: bold">15. Does the household use a shared toilet? (G1)</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._15_household" @change="no_15_set_affected"/>
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._15_household" @change="no_15_set_affected"/>
                        &nbsp;<label for="No">No</label>
                        <div class="fs-6 c-red-500" v-if="form.errors._15_household">{{ form.errors._15_household }}</div>
                    </div>
                    <div v-if="this.form._15_household=='Yes'">
                        <label for="" style="font-weight: bold">15.1 If Yes, how many people use the toilet?</label><br />
                        <div>
                            <input type="number" v-model="form._15_1_people" class="form-control" autocomplete="chrome-off">
                        </div>
                    </div>
                    <label for="" style="font-weight: bold">16. Does the household use a communal/public toilet (G1)</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._16_household"/>
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._16_household"/>
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._16_household">{{ form.errors._16_household }}</div>

                    <label for="" style="font-weight: bold">17. Is the household using their own toilet?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._17_using" @change="no_17_set_affected"/>
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._17_using" @change="no_17_set_affected"/>
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._17_using">{{ form.errors._17_using }}</div>

                    <div v-if="this.form._17_using=='No'">
                        <label for="" style="font-weight: bold">18. If the household is not using their own toilet, state the reason, and take a photo of the house and its immediate surroundings.</label><br />
                        <div>
                            <input type="text" v-model="form._18_If_the_household_mediate_surroundings" class="form-control" autocomplete="chrome-off">
                        </div>
                    </div>
                    <label for="" style="font-weight: bold">19. Visit the Materials Recovery Facility (MRF) in the barangay. Is the MRF Functional?</label><br />
                    <div>
                        <input type="radio" value="Yes" id="Yes" v-model="form._19_materials"/>
                        &nbsp;<label for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" value="No" id="No" v-model="form._19_materials"/>
                        &nbsp;<label for="No">No</label>
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors._19_materials">{{ form.errors._19_materials }}</div>

                    <label for="" style="font-weight: bold">Name of MRF</label><br />
                    <div>
                        <input type="text" v-model="form.Name_of_MRF" class="form-control" autocomplete="chrome-off">
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors.Name_of_MRF">{{ form.errors.Name_of_MRF }}</div>

                    <label for="" style="font-weight: bold">Location:</label><br />
                    <div>
                        <input type="text" v-model="form.location_mrf" class="form-control" autocomplete="chrome-off">
                    </div>
                    <div class="fs-6 c-red-500" v-if="form.errors.location_mrf">{{ form.errors.location_mrf }}</div>
                    <!-- </div> -->
                </div>
            </div>
            <button type="button" class="btn btn-primary mt-3 text-white" @click="submit()"
                :disabled="form.processing">
                Save changes
            </button>
        </form>

    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
// import Places from "@/Shared/PlacesShared";
// import { ModelSelect, MultiSelect } from 'vue-search-select';
export default {
    props: {
        data: Object,
        editData: Object,
        _uuid: Object
        // emp_code: Object,
        // sectors: Object,
        // sem: Object,
        // session: Object,
    },
    data() {
        return {
            form: useForm({
                id: null,
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
                LAST_NAME: "",
                FIRST_NAME: "",
                MIDDLENAME: "",
                SUFFIX: "",
                LAST_NAME2: "",
                FIRST_NAME2: "",
                MIDDLENAME2: "",
                SUFFIX2: "",
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
                _14_check_flush_pour_to_sewer: "",
                _14_check_flush_pour_to_septic_tank: "",
                _14_check_flush_pour_to_pit: "",
                _14_check_ventilated_imrpoved_pit_Latrine: "",
                _14_check_pit_latrine: "",
                _15_household: "",
                _15_1_people: "",
                _16_household: "",
                _17_using: "",
                _18_If_the_household_mediate_surroundings: "",
                Take_a_photo_for_question_18: "",
                Take_a_photo_for_question_18_url: "",
                _19_materials: "",
                Name_of_MRF: "",
                location_mrf: "",
                risk_level: "",
                risk_level_value: "",
                relative_risk_assessment: "",
                Relative_risk_is_re_tive_risk_assessment: "",
                _id: "",
                _uuid: "",
                _submission_time: "",
                _validation_status: "",
                _notes: "",
                _status: "",
                _submitted_by: "",
                __version__: "",
                _tags: "",
                _index: "",
            }),
            pageTitle: "",
            stat_accomp: "",
            municipalities: [],
            all_barangays: [],
            all_puroks: [],
            created_at: "",
            updated_at: "",

        };
    },
    mounted(){
        if(this.editData!==undefined){
            this.pageTitle="Edit";
            this.form.id = this.editData.id;
            this.form.date_survey=this.editData.date_survey;
            this.form.time_started=this.editData.time_started;
            this.form.ENUMERATOR=this.editData.ENUMERATOR;
            this.form.district=this.editData.district;
            this.loadMunicipalities(this.form.district)
            this.form.municipality=this.editData.municipality;

            // alert(this.form.municipality);
            this.loadBarangays(this.form.municipality);
            this.form.barangay = this.editData.barangay;
            setTimeout(() => {
                this.loadPuroks(this.editData.barangay, this.editData.municipality);
                this.form.purok_sitio=this.editData.purok_sitio;
            },2000)


            this.form.street=this.editData.street;
            this.form.housenumber=this.editData.housenumber;
            this.form.unitnumber=this.editData.unitnumber;
            this.form.Location=this.editData.Location;
            this.form._Location_latitude=this.editData._Location_latitude;
            this.form._Location_longitude=this.editData._Location_longitude;
            this.form._Location_altitude=this.editData._Location_altitude;
            this.form._Location_precision=this.editData._Location_precision;
            this.form.LAST_NAME=this.editData.LAST_NAME;
            this.form.FIRST_NAME=this.editData.FIRST_NAME;
            this.form.MIDDLENAME=this.editData.MIDDLENAME;
            this.form.SUFFIX=this.editData.SUFFIX;
            this.form.LAST_NAME2=this.editData.LAST_NAME2;
            this.form.FIRST_NAME2=this.editData.FIRST_NAME2;
            this.form.MIDDLENAME2=this.editData.MIDDLENAME2;
            this.form.SUFFIX2=this.editData.SUFFIX2;
            this.form._1_has_toilet=this.editData._1_has_toilet;
            this.form._2_toilet_used=this.editData._2_toilet_used;
            this.form._3_toilet_functional=this.editData._3_toilet_functional;
            this.form._4_soap=this.editData._4_soap;
            this.form._5_children=this.editData._5_children;
            this.form._6_spaces=this.editData._6_spaces;
            this.form._7_feces=this.editData._7_feces;
            this.form._8_composting=this.editData._8_composting;
            this.form._9_dispose=this.editData._9_dispose;
            this.form._10_emptied=this.editData._10_emptied;
            this.form._11_do_sludge=this.editData._11_do_sludge;
            this.form._12_do_tank=this.editData._12_do_tank;
            this.form._13_sewer=this.editData._13_sewer;
            this.form._14_check=this.editData._14_check;
            this.form._14_check_flush_pour_to_sewer=this.editData._14_check_flush_pour_to_sewer;
            this.form._14_check_flush_pour_to_septic_tank=this.editData._14_check_flush_pour_to_septic_tank;
            this.form._14_check_flush_pour_to_pit=this.editData._14_check_flush_pour_to_pit;
            this.form._14_check_ventilated_imrpoved_pit_Latrine=this.editData._14_check_ventilated_imrpoved_pit_Latrine;
            this.form._14_check_pit_latrine=this.editData._14_check_pit_latrine;
            this.form._15_household=this.editData._15_household;
            this.form._15_1_people=this.editData._15_1_people;
            this.form._16_household=this.editData._16_household;
            this.form._17_using=this.editData._17_using;
            this.form._18_If_the_household_mediate_surroundings=this.editData._18_If_the_household_mediate_surroundings;
            this.form.Take_a_photo_for_question_18=this.editData.Take_a_photo_for_question_18;
            this.form.Take_a_photo_for_question_18_url=this.editData.Take_a_photo_for_question_18_url;
            this.form._19_materials=this.editData._19_materials;
            this.form.Name_of_MRF=this.editData.Name_of_MRF;
            this.form.location_mrf=this.editData.location_mrf;
            this.form.risk_level=this.editData.risk_level;
            this.form.risk_level_value=this.editData.risk_level_value;
            this.form.relative_risk_assessment=this.editData.relative_risk_assessment;
            this.form.Relative_risk_is_re_tive_risk_assessment=this.editData.Relative_risk_is_re_tive_risk_assessment;
            this.form._id=this.editData._id;
            this.form._uuid=this.editData._uuid;
            this.form._submission_time=this.editData._submission_time;
            this.form._validation_status=this.editData._validation_status;
            this.form._notes=this.editData._notes;
            this.form._status=this.editData._status;
            this.form._submitted_by=this.editData._submitted_by;
            this.form.__version__=this.editData.__version__;
            this.form._tags=this.editData._tags;
            this.form._index=this.editData._index;
            // alert("form set")
        }else{
            const now = new Date();
            this.pageTitle="Create";
            this.form.ENUMERATOR="System";
            this.form.date_survey= now.getFullYear() + '-' +
                        String(now.getMonth() + 1).padStart(2, '0') + '-' +
                        String(now.getDate()).padStart(2, '0');
            this.form.time_started= String(now.getHours()).padStart(2, '0') + ':' +
                         String(now.getMinutes()).padStart(2, '0') + ':' +
                         String(now.getSeconds()).padStart(2, '0');
            this.form.created_at = this.form.date_survey + ' ' + this.form.time_started;
            this.form.updated_at = this.form.date_survey + ' ' + this.form.time_started;
            this.form._uuid=this._uuid;
        }
    },
    methods: {
        submit() {
            this.calculateRiskLevel();
            if (this.editData !== undefined) {
                // alert(this.form.y01);
                this.form.patch("/households/" + this.form.id + "/update", this.form);
            } else {
                this.form.post("/households/store", this.form);
            }
        },
        no_10_set_affected(){
            if(this.form._10_emptied=='Yes'){
                this.form._12_do_tank="";
            }else if(this.form._10_emptied=='No'){
                this.form._11_do_sludge="";
            }else{

            }
        },
        no_15_set_affected(){
            if(this.form._15_household=='No'){
                this.form._15_1_people="";
            }else{

            }
        },
        no_17_set_affected(){
            if(this.form._17_using=='Yes'){
                this.form._18_If_the_household_mediate_surroundings="";
            }
        },
        loadMunicipalities(district) {
            if (district === 'District 1') {
                this.municipalities = ['Compostela',
                    'Maragusan',
                    'Monkayo',
                    'Montevista',
                    'New Bataan'
                ]
            } else {
                this.municipalities = ['Laak',
                    'New Bataan',
                    'Mabini',
                    'Maco',
                    'Mawab',
                    'Nabunturan',
                    'Pantukan'
                ]
            }
            this.all_barangays = [];
            this.all_puroks = [];
        },
        async loadBarangays(select_mun) {
            // alert("select_mun is :"+select_mun);
            this.all_barangays = [];
            this.all_puroks = [];
            this.select_bar = '';
            this.select_pur = '';
            if (select_mun === "") {

            } else {
                await axios.get("/places/"+select_mun+"/barangays", { mun: select_mun }).then((response) => {
                    this.all_barangays = response.data.data
                });
            }
            // alert(select_mun)
            this.all_puroks = [];
        },
        async loadPuroks(select_bar, select_mun) {
            this.all_puroks = [];
            this.select_pur = '';
            var bar_code=this.getSelectedBarangayCode(select_bar)
            // alert(bar_code);
            if (select_bar !== "") {
                axios.get("/places/barangay/"+bar_code+"/purok-sitio", { bar: bar_code, mun: select_mun }).then((response) => {
                    this.all_puroks = response.data.data
                });
            }

        },
        getSelectedBarangayCode(barangayName) {
            // console.log("getBarangayCode: "+barangayName);
            if (!this.all_barangays) {
                alert("all barangays is null")
                return null;
            }else{

                const foundBarangay = this.all_barangays.find(
                    // (b) => b.barangay === barangay
                    (b) => b.barangay.trim().toLowerCase() === barangayName.trim().toLowerCase()
                );

                return foundBarangay ? foundBarangay.code : null;
                // return barangay ? barangay.code : null;
            }

        },
        calculateRiskLevel() {
            // Initialize riskLevel
            let riskLevel = 0;

            // Increment riskLevel by 1 if any of the fields is 'Yes'
            riskLevel += this.form._1_has_toilet === "Yes" ? 1 : 0;
            riskLevel += this.form._2_toilet_used === "Yes" ? 1 : 0;
            riskLevel += this.form._3_toilet_functional === "Yes" ? 1 : 0;
            riskLevel += this.form._4_soap === "Yes" ? 1 : 0;
            riskLevel += this.form._5_children === "Yes" ? 1 : 0;
            riskLevel += this.form._6_spaces === "Yes" ? 1 : 0;
            riskLevel += this.form._7_feces === "Yes" ? 1 : 0;
            riskLevel += this.form._8_composting === "Yes" ? 1 : 0;
            riskLevel += this.form._9_dispose === "Yes" ? 1 : 0;
            riskLevel += this.form._10_emptied === "Yes" ? 1 : 0;
            riskLevel += this.form._13_sewer === "Yes" ? 1 : 0;
            riskLevel += this.form._15_household === "Yes" ? 1 : 0;
            riskLevel += this.form._16_household === "Yes" ? 1 : 0;
            riskLevel += this.form._17_using === "Yes" ? 1 : 0;
            riskLevel += this.form._19_materials === "Yes" ? 1 : 0;

            // Update risk_level and risk_level_value in form
            this.form.risk_level = riskLevel;
            // this.form.risk_level_value = riskLevel;
            // alert(this.form.risk_level+ '   this.form._6_spaces: '+this.form._6_spaces);
            // Calculate risk assessment based on risk_level and other conditions
            let riskAssessment = '';
            if (this.form._6_spaces === 'No' && this.form._7_feces === 'No') {
                riskAssessment = 'Open Defecation G0';
            } else if (riskLevel < 8) {
                riskAssessment = 'Open Defecation G0';
            } else if (riskLevel < 11) {
                riskAssessment = 'Zero Open Defecation G1';
            } else if (riskLevel < 13) {
                riskAssessment = 'Basic Sanitation G2';
            } else {
                riskAssessment = 'Safely Managed G3';
            }

            // Update relative_risk_assessment in form
            this.form.relative_risk_assessment = riskAssessment;
        }
    }
}
</script>
