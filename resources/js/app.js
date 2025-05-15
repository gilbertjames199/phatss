require('./bootstrap');

import { createApp, h, Vue } from 'vue'
import { createInertiaApp, Head, Link } from '@inertiajs/inertia-vue3'
import Layout from "./Shared/Layout"
import Notification from "./Shared/Notification"
import { InertiaProgress } from '@inertiajs/progress'

//Card modal
//.component('CardModal', CardModal)
import CardModal from "./Shared/CardModal"

// FileUpload
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

//VUe-select
//import Vue from 'vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
import VueSelect from 'vue-select';

//Bootstrap Vue
//import { BootstrapVue } from 'bootstrap-vue';
/*.use(BootstrapVue)
      .use(IconsPlugin) */

//Vue Multiselect 3
import Multiselect from '@vueform/multiselect';

//Vue google maps
// import VueGoogleMaps from '@fawmi/vue-google-maps'

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
);

createInertiaApp({
    resolve: async name => {
        let page = (await import(`./Pages/${name}`)).default;
        page.layout ??= Layout
        return page;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            // .use(VueGoogleMaps, {
            //     load: {
            //         key: 'YOUR_GOOGLE_MAPS_API_KEY',
            //         libraries: 'places', // This is required if you use the Autocomplete plugin
            //     },
            // })
            .component("multiselect", Multiselect)
            .component("Link", Link)
            .component("Head", Head)
            .component('CardModal', CardModal)
            .component("Notification", Notification)
            .component("FilePond", FilePond)
            .component("v-select", vSelect)
            .mixin({
                data() {
                    return {
                        municipalities_global: ['Compostela', 'Laak', 'Mabini', 'Maco', 'Maragusan', 'Mawab', 'Monkayo', 'Montevista', 'New Bataan', 'Nabunturan', 'Pantukan'],
                        mun_coordinates: {
                            "Compostela": [7.6660, 126.0847],
                            "Laak": [7.8771, 125.7844],
                            "Mabini": [7.2821, 125.8574],
                            "Maco": [7.3593, 125.8580],
                            "Maragusan": [7.3522, 126.1545],
                            "Mawab": [7.4969, 125.9588],
                            "Monkayo": [7.8514, 126.0458],
                            "Montevista": [7.7305, 125.9806],
                            "Nabunturan": [7.6038, 125.9632],
                            "New Bataan": [7.5547, 126.1404],
                            "Pantukan": [7.17728, 126.02043],
                        },
                        get api_source() {
                            // var lo = "192.168.6.23:8080/";
                            // var gl = "122.54.19.171:8080/";
                            // var nw = "122.54.19.172:8080/";
                            // var nw_loc = "192.168.6.48:8080/";
                            //var nw_temp = "120.72.21.122:8080/"
                            // var nw_oct = "paps.dvodeoro.ph:8080/"
                            var nw_nov = "192.168.80.89:5030/"
                            return nw_nov;
                        }

                    }
                },
                methods: {
                    format_number(number, num_decimals, include_comma) {
                        var numm = parseFloat(number);
                        return numm.toLocaleString('en-US', { useGrouping: include_comma, minimumFractionDigits: num_decimals, maximumFractionDigits: num_decimals });
                    },
                    getYearFromDate(dateStr) {
                        const date = new Date(dateStr);
                        return date.getFullYear();
                    },
                    getMonthFromDate(dateStr) {
                        const date = new Date(dateStr);
                        return date.toLocaleString('default', { month: 'long' });
                    },
                    getDayFromDate(dateStr) {
                        const date = new Date(dateStr);
                        return date.getDate();
                    },
                    goBack() {
                        window.history.back()
                    },
                    formatDateToStringMonth(dateString) {
                        console.log(dateString);
                        const options = { year: 'numeric', month: 'long', day: '2-digit' };
                        const date = new Date(dateString);
                        return date.toLocaleDateString('en-US', options);
                    }

                }
            })
            .mount(el)
    },
    title: title => 'PHATTS: ' + title
})

InertiaProgress.init({
    delay: 250,
    color: '#29d',
    includeCSS: true,
    showSpinner: false,
})
