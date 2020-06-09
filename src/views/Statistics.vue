<template>
    <div class="bg-white w-full h-full">
        <div class="flex justify-center">
            <chart-wrapper class="w-1/2 m-4 overflow-auto">
                <h1 class="text-xl">Most used tags</h1>
                <bar-chart
                    v-if="tags.length > 0"
                    :chart-data="barData"
                    :options="barOptions"
                />
            </chart-wrapper>
        </div>
        <div class="flex justify-center">
            <chart-wrapper class="w-1/2 m-4 overflow-auto">
                <h1 class="text-xl">Items by type</h1>
                <doughnut-chart
                    v-if="itemCategories.length > 0"
                    :chart-data="doughnutData"
                />
            </chart-wrapper>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChartWrapper from '@/components/charts/ChartWrapper.vue'
import BarChart from '@/components/charts/BarChart.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import { Item, Tag } from '@/models/entities'
import { ItemType } from '@/models/types'
// import TagsClient from '@/lib/http/TagsClient'

// const tagsClient = new TagsClient()

@Component({
    components: { BarChart, DoughnutChart, ChartWrapper },
})
export default class Statistics extends Vue {
    barOptions = {
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

    // Prepare sortable objects
    get tags() {
        const tagsFromStore = this.$store.state.tags
        return this.sortDescending(tagsFromStore)
    }

    sortDescending(tags: Array<Tag>) {
        const tagsCopy = [...tags]
        return tagsCopy.sort((a: Tag, b: Tag) => {
            if (a.items.length < b.items.length) {
                return 1
            }
            if (a.items.length > b.items.length) {
                return -1
            }
            return 0
        })
    }

    get barData() {
        return {
            labels: this.tags.map((tag: Tag) => tag.name),
            datasets: [
                {
                    data: this.tags.map((tag: Tag) => tag.items.length),
                    backgroundColor: this.tags.map((tag: Tag) => tag.color),
                    barPercentage: 0.5,
                    barThickness: 10,
                },
            ],
        }
    }

    get itemCategories() {
        const itemTypeUses = {
            [ItemType.PAGE]: 0,
            [ItemType.TODO]: 0,
            [ItemType.TODO_ITEM]: 0,
            [ItemType.TEXT_FIELD]: 0,
        }
        this.$store.state.items.forEach((item: Item) => {
            itemTypeUses[item.item_type]++
        })

        // TODO: map key to ItemType
        return Object.entries(itemTypeUses).map((key, value) => {
            return { name: key, color: '#6757f2', uses: value }
        })
    }

    get doughnutData() {
        return {
            labels: this.itemCategories.map((category) => category.name),
            datasets: [
                {
                    data: this.itemCategories.map((category) => category.uses),
                    backgroundColor: this.itemCategories.map(
                        (category) => category.color,
                    ),
                    barPercentage: 0.5,
                    barThickness: 10,
                },
            ],
        }
    }
}
</script>
