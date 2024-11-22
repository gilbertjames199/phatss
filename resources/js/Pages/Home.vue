<template>
    <Head>
        <title>Home</title>
    </Head>
    <!-- <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Imports</h1> -->
    <!--<p style="text-align: justify;">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur.
    </p>-->
    <div class="row gap-20 masonry pos-r">
        <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Philippine Approach to Sustainable Sanitation -2023</h1>
        <div class="masonry-sizer col-md-6"></div>
        <div class="masonry-item w-100">
            <div class="row gap-20">
                <!-- TOTAL HOUSEHOLDS -->
                <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1ZM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V8Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"/>
                                            </svg>&nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Surveyed Households</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: red; font-weight: bold; text-align: center">{{ format_number(number_of_households,0,true) }}</h2>
                            <p style="text-align: center">{{ format_number(100*(with_toilets/190000),2,true) }}% of households in Davao de Oro have responded to the survey in 2023.</p>
                        </div>
                    </div>
                </div>
                <!-- WITH TOILETS -->
                <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                            </svg>
                                            &nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Households with Toilets</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: #d7db0d; font-weight: bold;  text-align: center">{{ format_number(with_toilets,0,true) }}</h2>

                            <p>Of the {{ format_number(number_of_households,0,true) }} respondents, {{ format_number(with_toilets,0,true) }}
                                ({{ format_number(100*(with_toilets/number_of_households),2,true) }}%) have toilets.<br>&nbsp;</p>
                        </div>

                    </div>
                </div>
                <!-- WITH FUNCTIONAL TOILETS -->
                <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
                                            </svg>&nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Number of Households with Functional Toilets</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: blue; font-weight: bold; text-align: center">{{ format_number(with_functional_toilet,0,true) }}</h2>
                            <p>Of the {{ format_number(number_of_households,0,true) }} respondents, {{ format_number(with_toilets,0,true) }}
                                ({{ format_number(100*(with_functional_toilet/number_of_households),2,true) }}%) have functional and well-maintained toilets.</p>
                        </div>

                    </div>
                </div>
                <!-- PRACTICE WASTE SEGREGATION AND/OR COMPOSTING -->
                <div class="col-md-3">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <h6 class="lh-1">
                                <table>
                                    <tr>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z"/>
                                            </svg>&nbsp;&nbsp;&nbsp;
                                        </td>
                                        <td><h5 href="/details/demographics" target="_blank">Practice Waste Segregation/Composting</h5></td>
                                    </tr>
                                </table>
                            </h6>
                            <hr>
                            <h2 style="color: #1e80d6; font-weight: bold; text-align: center">{{ format_number(_8_composting,0,true) }}</h2>
                            <p style="text-align:center">Of the {{ format_number(number_of_households,0,true) }} respondents, {{ format_number(_8_composting,0,true) }}
                                ({{ format_number(100*(_8_composting/number_of_households),2,true) }}%) practice segregation/composting.</p>
                        </div>

                    </div>
                </div>
                <!-- RISK ASSESSMENT -CHART -->
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            Risk Assessment Chart
                            <RiskAssessmentChart
                                :chartData="chartDataType"
                                :chartLabel="data_by_mun_label"
                                :plugins="chartOptionCom" >
                            </RiskAssessmentChart>
                        </div>
                    </div>
                </div>
                <!-- RISK ASSESSMENT -TABLE -->
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">
                            <table class="table table-sm table-bordered table-striped table-hover" >
                                <thead class="thead-dark">
                                    <tr >
                                        <th colspan="6" style="background-color: grey; color: white">
                                            <b>RISK LEVEL DISTRIBUTION BY MUNICIPALITY</b>
                                        </th>
                                    </tr>
                                    <tr style="background-color: #c1c9c4">
                                        <th>Municipality</th>
                                        <th>Open Defecation -G0</th>
                                        <th>Zero Open Defecation -G1</th>
                                        <th>Basic Sanitation G2</th>
                                        <th>Safely Managed G3</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="result in results">
                                        <td>{{ result.municipality }}</td>
                                        <td>{{ result.Open_Defecation_G0 }}</td>
                                        <td>{{ result.Zero_Open_Defecation_G1 }}</td>
                                        <td>{{ result.Basic_Sanitation_G2 }}</td>
                                        <td>{{ result.Safely_Managed_G3 }}</td>
                                        <td>{{ result.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>

                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <!-- <form @submit.prevent="submit">
                {{ import_selection }}
                <select v-model="import_selection" >
                    <option value="1">PHATTS</option>
                    <option value="2">Municipalities/Barangays/Puroks</option>
                    <option value="h">Households</option>
                    <option value="a">Schools</option>
                    <option value="b">Child Development Centers</option>
                    <option value="c">Health Facilities</option>
                    <option value="3">Export PhATSS</option>
                </select>
                <input type="file" @input="form.myfile = $event.target.files[0]" @change="onFileChanged()"/>
                <progress v-if="form.progress" class="form-control"  :value="form.progress.percentage" max="100">
                    {{ form.progress.percentage }}%
                </progress>
                <button type="submit" class="btn btn-primary btn-sm mL-2 text-white" >Submit</button>
            </form> -->
            <!-- {{ dt_g3 }}
            {{ total }} -->
        </div>

    </div>
</template>
<script>
import RiskAssessmentChart from '@/Shared/BarChart.vue';

import { ref } from 'vue';

const componentKey=ref(0);
export default {
    props: {
        with_toilets: Number,
        with_functional_toilet: Number,
        _8_composting: Number,
        dt_g0: Object,
        dt_g1: Object,
        dt_g2: Object,
        dt_g3: Object,
        total: Object,
        data_by_mun_label: Object,
        results: Object
    },
    components: {
        RiskAssessmentChart
    },
    data() {
        return{

        }
    },
    computed: {
        chartDataType(){
            return[
                {
                    label: 'G0',
                    backgroundColor: '#025da6',
                    data: this.dt_g0,
                },
                {
                    label: 'G1',
                    backgroundColor: '#2196f3',
                    data: this.dt_g1,
                },
                {
                    label: 'G2',
                    backgroundColor: '#f44336',
                    data: this.dt_g2
                },
                {
                    //#D4D468
                    label: 'G3',
                    backgroundColor: '#c8cf04',
                    data: this.dt_g3
                },
                // {
                //     label: 'Total Respondents',
                //     backgroundColor: '#8c9103',
                //     data: this.total,
                // },
            ]
        },
        chartOptionCom(){
            return {
                datalabels:{
                    color: 'white',
                    display: false,
                },
            };
        },
        number_of_households(){
            return this.total.reduce((sum, value) => sum + value, 0);
        }
    },
    methods: {


    }
};
</script>
<style>
            .row-centered {
                text-align:center;
            }
            .col-centered {
                display:inline-block;
                float:none;
                text-align:left;
                margin-right:-4px;
            }
            .pos{
                position: top;
                top: 240px;
            }
</style>
