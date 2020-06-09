<template>
    <bar-chart :chart-data="data" :options="data" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BarChart from '@/components/BarChart.vue'

@Component({
    components: { BarChart },
})
export default class Statistics extends Vue {
    data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                barPercentage: 0.5,
                barThickness: 6,
            },
        ],
    }
    options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }
}
</script>
