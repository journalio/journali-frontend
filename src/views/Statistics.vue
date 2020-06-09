<template>
    <div class="bg-white w-full h-full">
        <div class="flex justify-center">
            <chart-wrapper class="w-1/2 m-4 overflow-auto">
                <bar-chart
                    v-if="tags.length > 0"
                    :chart-data="chartData"
                    :options="options"
                />
            </chart-wrapper>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChartWrapper from '@/components/charts/ChartWrapper.vue'
import BarChart from '@/components/charts/BarChart.vue'
import { Tag } from '@/models/entities'
// import { ItemType } from '@/models/types'
// import TagsClient from '@/lib/http/TagsClient'

// const tagsClient = new TagsClient()

@Component({
    components: { BarChart, ChartWrapper },
})
export default class Statistics extends Vue {
    // protected created() {
    //     const tags = []
    //     tags.forEach((tag: Tag) => {
    //         tagsClient.assignItems(tag, tag.items)
    //     })
    // }

    get chartData() {
        const tagNames = this.tags.map((tag: Tag) => tag.name)

        return {
            labels: tagNames,
            datasets: [
                {
                    label: '# of Votes',
                    data: this.arrayOfInts(tagNames.length),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                    barPercentage: 0.5,
                    barThickness: 10,
                },
            ],
        }
    }
    options = {
        legend: {
            labels: {
                fontSize: 12,
            },
        },
        scales: {
            xAxes: [
                {
                    fontSize: 5,
                },
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
    }

    get tags() {
        return this.$store.state.tags
    }

    arrayOfInts(length: number) {
        const ints = []
        for (let step = length; step > 0; step--) {
            ints.push(Math.floor(Math.random() * (50 - 5 + 1)) + 5)
        }
        return ints
    }
}
</script>
