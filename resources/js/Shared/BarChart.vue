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
    Plugin
} from 'chart.js'
//import ChartDataLabels from 'chartjs-plugin-datalabels'; , ChartDataLabels
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
        chartData: {
            type: Array,
            default: () => []
        },
        chartLabel: {
            type: Array,
            default: () => []
        }
    },


    setup(props) {
        var vm = this
        const chartData = {
            labels: props.chartLabel,
            datasets: props.chartData
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: props.plugins,
            scales: {
                yAxis: {
                    min: 0, // minimum value
                    beginAtZero: true
                },
                xAxis: {
                    grid:{
                        display:false
                    },
                }
            }
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
            })
    }
})

</script>


