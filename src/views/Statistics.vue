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
    // protected mounted() {
    //     const tags = this.tags
    //     tags.forEach((tag: Tag) => {
    //         tagsClient.assignItems(tag, tag.items)
    //     })
    // }

    // Prepare sortable objects
    get tags() {
        const tagsFromStore = this.$store.state.tags
        return this.sortDescending(tagsFromStore)
    }

    sortDescending(tags: Array<Tag>) {
        return tags.sort((a: Tag, b: Tag) => {
            if (a.items.length < b.items.length) {
                return 1
            }
            if (a.items.length > b.items.length) {
                return -1
            }
            return 0
        })
    }

    get chartData() {
        return {
            labels: this.tags.map((tag: Tag) => tag.name),
            datasets: [
                {
                    label: '# of usages',
                    data: this.tags.map((tag: Tag) => tag.items.length),
                    backgroundColor: this.tags.map((tag: Tag) => tag.color),
                    barPercentage: 0.5,
                    barThickness: 10,
                },
            ],
        }
    }
}
</script>
