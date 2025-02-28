<template>
    <div class="relative row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>{{ pageTitle }} Supplies</h3>
            <Link href="/supplies">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
            </svg>
            </Link>
        </div>


        <div class="col-md-8">
            <form @submit.prevent="submit()">
                <input type="hidden" required>
                <label for="">ITEM</label>
                <input type="text" v-model="form.item" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.item">{{ form.errors.item }}</div>
                <label for="">DESCRIPTION</label>
                <input type="text" v-model="form.description" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.description">{{ form.errors.description }}</div>
                <label for="">TYPE</label>
                <!-- <input type="text" v-model="form.type" class="form-control" autocomplete="chrome-off"> -->
                 <select v-model="type_selected" class="form-select">
                    <option></option>
                    <option>Water Storage</option>
                    <option>Hygiene Supplies</option>
                    <option>Water Treatment</option>
                    <option>Water Testing</option>
                    <option>Others, please specify</option>
                 </select>
                 <div v-if="type_selected==='Others, please specify'">
                    Specify Type:
                    <input type="text" v-model="form.type" class="form-control" autocomplete="chrome-off">
                 </div>
                <div class="fs-6 c-red-500" v-if="form.errors.type">{{ form.errors.type }}</div>


                <label for="">QUANTITY</label>
                <input type="number" v-model="form.quantity" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.quantity">{{ form.errors.quantity }}</div>

                <label for="">UNIT</label>
                <select v-model="qunit_selected" class="form-select">
                    <option></option>
                    <option v-for="unit in qunit_array" :value="unit.value">
                        {{ unit.label }}
                    </option>
                    <option>Others, please specify</option>
                </select>
                <div v-if="qunit_selected==='Others, please specify'">
                    Specify unit:
                    <input type="text" v-model="form.quantity_unit" class="form-control" autocomplete="chrome-off">
                </div>
                <div class="fs-6 c-red-500" v-if="form.errors.quantity_unit">{{ form.errors.quantity_unit }}</div>
                <input type="hidden" v-model="form.id" class="form-control" autocomplete="chrome-off">

                <button type="button" class="btn btn-primary mt-3 text-white" @click="submit()" :disabled="form.processing">
                    Save changes
                </button>
            </form>
        </div>
        <!-- {{ type_array }} -->
        {{ editData }}
    </div>
</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
//import Places from "@/Shared/PlacesShared";

export default {
    props: {
        editData: Object
    },

    data() {
        return {
            submitted: false,
            form: useForm({
                description: "",
                item: "",
                quantity: "",
                quantity_unit: "",
                type: "",
                id: null
            }),
            qunit_array: [
                {value:"unit/s",label: "Unit/s"},
                {value:"pc/s", label: "piece/s"},
                {value:"drum/s", label: "drum/s"},
                {value:"gal/s", label: "gallon/s"},
                {value:"L",label: "liter/s"},
                {value:"m",label: "meter/s"},
                {value:"cm",label: "centimeter/s"},
                { value: "pcs", label: "Pieces" },
                { value: "doz", label: "Dozens" },
                { value: "pk", label: "Packs" },
                { value: "box", label: "Box/es" },
                { value: "kg", label: "Kilogram/s" },
                { value: "g", label: "Gram/s" },
                { value: "lb", label: "Pound/s" },
                { value: "oz", label: "Ounce/s" },
                { value: "ml", label: "Milliliter/s" },
                { value: "set", label: "Set/s" },
                { value: "pair", label: "Pair/s" },
                { value: "roll", label: "Roll/s" },
                { value: "bndl", label: "Bundle/s" },
                { value: "bag", label: "Bag/s" },
                { value: "tube", label: "Tube/s" },
                { value: "tray", label: "Tray/s" },
                { value: "crate", label: "Crate/s" },
                { value: "carton", label: "Carton/s" }
            ],
            type_array: [
                "Water Storage",
                "Hygiene Supplies",
                "Water Treatment",
                "Water Testing",
            ],
            qunit_selected: '',
            type_selected: '',
            pageTitle: ""
        };
    },

    mounted() {

        if (this.editData !== undefined) {
            this.pageTitle = "Edit"
            this.form.description = this.editData.description
            this.form.item = this.editData.item
            this.form.quantity = this.editData.quantity
            this.form.quantity_unit = this.editData.quantity_unit
            const unitExists = this.qunit_array.some(unit => unit.value === this.editData.quantity_unit);
            this.qunit_selected = unitExists ? this.editData.quantity_unit : 'Others, please specify';
            this.form.type = this.editData.type
            const typeExists = this.type_array.some(typer => typer === this.editData.type);
            this.type_selected = typeExists ? this.editData.type : 'Others, please specify';

            this.form.id = this.editData.id
        } else {
            this.pageTitle = "Create"
        }

    },

    methods: {
        submit() {
            if(this.type_selected!=='Others, please specify'){
                this.form.type=this.type_selected
            }
            if(this.qunit_selected!=='Others, please specify'){
                this.form.quantity_unit=this.qunit_selected
            }
            if (this.editData !== undefined) {
                this.form.patch("/supplies/update/" + this.form.id, this.form);
            } else {

                this.form.post("/supplies/store");
            }
        },
    },
};
</script>
