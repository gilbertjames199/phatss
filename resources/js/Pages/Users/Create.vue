<template>

<div class="relative row gap-20 masonry pos-r">
    <div class="peers fxw-nw jc-sb ai-c">
        <h3>{{ pageTitle }} users</h3>
        <Link href="/users">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
            </svg>
        </Link>
    </div>
    <!--
    <div class="col-md-8">
        <button class="btn btn-secondary" @click="showModal" :disabled="submitted">Permissions</button>
    </div>
    -->
    <div class="col-md-8">
        <form @submit.prevent="submit()">
            <input type="hidden" required>
            <label for="">Names</label>
            <input type="text" v-model="form.name" class="form-control" autocomplete="chrome-off">
            <div class="fs-6 c-red-500" v-if="form.errors.name">{{ form.errors.name }}</div>
            <label for="">Email</label>
            <input type="text" v-model="form.email" class="form-control" autocomplete="chrome-off">
            <div class="fs-6 c-red-500" v-if="form.errors.email">{{ form.errors.email }}</div>
            <span v-if="editData===undefined">
                <label for="">Password</label>
                <input type="password" v-model="form.password" class="form-control" autocomplete="chrome-off">
                <div class="fs-6 c-red-500" v-if="form.errors.password">{{ form.errors.password }}</div>
            </span>
            <div class="parent">
                <div class="row">
                    <div class="col-md-6">

                    </div>
                </div>
                <bootstrap-modal-no-jquery v-if="displayModal" @close-modal-event="hideModal" :permissions="permissions"/>
            </div>
            <input type="hidden" v-model="form.id" class="form-control" autocomplete="chrome-off">

            <button type="button" class="btn btn-primary mt-3" @click="submit()" :disabled="form.processing">
                Save changes
            </button>
        </form>
    </div>
</div>

</template>
<script>
import { useForm } from "@inertiajs/inertia-vue3";
import BootstrapModalNoJquery from './BootstrapModalNoJquery.vue';

export default {
    props: {
        editData: Object,
        permissions: Object,
    },
    components: {
      BootstrapModalNoJquery,
    },
    data() {
        return {
            submitted: false,
            displayModal: false,
            exampleModalShowing: false,
            arr_length: 0,
            newData: [],
            form: useForm({
                name: "",
                email: "",
                password: "",
                id: null
            }),
            pageTitle: ""
        };
    },

    mounted() {
        if (this.editData !== undefined) {
            this.pageTitle = "Edit"
            this.form.name = this.editData.name
            this.form.email = this.editData.email
            this.form.id = this.editData.id
        } else {
            this.pageTitle = "Create"
        }

    },
    
    methods: {
        submit() {
            if (this.editData !== undefined) {
                this.form.patch("/users/" + this.form.id, this.form);
            } else {
                this.form.post("/users", this.form);
            }
        },

        canCreateCheck: function(value, event){
            if(event.target.checked){
                alert('is selected')
            }
        },
        
    },
};
</script>