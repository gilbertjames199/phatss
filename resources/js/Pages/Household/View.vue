<template>

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
