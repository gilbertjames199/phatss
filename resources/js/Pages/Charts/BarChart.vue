<template>

</template>

<script>
import { defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Plugin,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
    name: 'BarChart',
    components: {
        Bar
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },

        plugins: {
            type: Array,
            default: () => []
        },

        finalData: {
            type: Array,
            default : () => []
        },

        chartLabels: {
            type: Array,
            default: () => []
        },

        chartPlugins:{
            type: Object,
            default: () => {}
        }
    },

    setup(props) {
        const chartData = {
            labels: props.chartLabels,
            datasets: [
                {
                    //backgroundColor: ['#30345c' '#C0392B', '#7D3C98', '#3498DB', '#1ABC9C','#58D68D','#F4D03F','#F5B041','#DC7633', '#C0392B', '#7D3C98'],
                    backgroundColor: ['#2196f3'],
                    data: props.finalData
                }
            ]
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins:props.chartPlugins
        }

        return () =>
            h(Bar, {
                chartData,
                chartOptions,
                chartId: props.chartId,
                width: props.width,
                height: props.height,
                cssClasses: props.cssClasses,
                styles: props.styles,
                plugins: props.plugins,
            })
    },
    methods:{

    }
})

</script>
