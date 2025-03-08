<template>
    <Head>
        <title>Home</title>
    </Head>
    <!-- <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Imports</h1> -->

    <div class="row gap-20 masonry pos-r">
        <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Sanitation Best Practices</h1>
        <div class="masonry-sizer col-md-6"></div>
        <div class="masonry-item w-100">
            <div class="row gap-20">

                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">

                            <video controls width="100%">

                            <source src="http://eservices.dvodeoro.ph:5000/pho_ddo" type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>

                            <h5>PHO DDO ZOD</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">

                            <video controls width="100%">
                            <source src="http://192.168.80.89:5000/mawab" type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>


                            <h5>Mawab Health and Sanitation Highlights</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 ">
                    <div class="layers bd bgc-white p-20">
                        <div class="layer w-100 mB-10">

                            <video controls width="100%">
                            <source src="http://192.168.80.89:5000/maragusan" type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>
                            <h5>Maragusan ZOD Accomplishment</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 ">
                <div class="layers bd bgc-white p-20">
                    <div class="layer w-100 mB-10">
                        <!-- https://youtu.be/XxzCsQMocY0 -->
                        <!-- <video controls width="100%">
                        <source src="http://192.168.80.89:5000/mawab" type="video/mp4" />
                        Your browser does not support the video tag.
                        </video> -->

                        <video controls width="100%">
                            <source src="http://192.168.80.89:5000/maco" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h5>Maco Environmental Summit</h5>
                    </div>
                </div>
            </div>

            </div>


        </div>

    </div>
</template>
<script>


import { ref } from 'vue';

const componentKey=ref(0);
const videoUrl = "/images/pho_ddo.mp4";

export default {
    props: {

    },
    components: {

    },
    data() {
        return{

        }
    },
    computed: {

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
