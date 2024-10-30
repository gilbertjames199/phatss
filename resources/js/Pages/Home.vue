<template>
    <Head>
        <title>Home</title>
    </Head>
    <h1 style="color: #26394a; font-weight: bold; font-family: verdana;">Imports</h1>
    <!--<p style="text-align: justify;">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur.
    </p>-->
    <div class="row gap-20 masonry pos-r">
        <div class="masonry-sizer col-md-6"></div>
        <div class="masonry-item w-100">
            <div class="row gap-20"></div>
            <form @submit.prevent="submit">
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
                <!-- <button type="submit" class="btn btn-primary btn-sm mL-2 text-white" >Submit</button> -->
            </form>
        </div>

    </div>
</template>
<script>

export default {
    props: {

    },
    data() {
        return{
            form: this.$inertia.form({
                myfile: null,
                name: null,
                avatar: null,
                type: true,
            }),
            set_type: false,
            my_status: '0',
            my_id: 0,
            my_date: null,
            import_selection: "1"
        }
    },
    components: {

    },
    methods: {
        onFileChanged() {
            this.form.myfile = this.$refs.myFile.files[0];
            console.log(this.form.myfile)
        },
        submit() {
            if(!this.form.myfile){
                alert("No file chosen!");
            }else{
                if(this.import_selection=="1"){
                    //alert("1");
                    this.form.post('/import/phatts')
                }else if(this.import_selection=="2"){
                    alert("import file data")
                    this.form.post('/import/file/data')
                }else if(this.import_selection=="h"){
                    alert("import household data")
                    this.form.post('/import/house/hold/data/import/h')
                }else if(this.import_selection=="a"){
                    alert("import school data")
                    this.form.post('/import/schools/ddo/data/import/sc/hool')
                }else if(this.import_selection=="b"){
                    alert("import cdc data")
                    this.form.post('/import/child/development/center/data/import/child/care')

                }else if(this.import_selection=="c"){
                    alert("import health facilities data")
                    this.form.post('/import/health/care/center/data/import/health/care/centers/hospitals')
                }else{
                    this.form.post('/import/export/excel/phatts')
                }
            }

        },

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
