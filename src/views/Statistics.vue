<template>
    <div class="bg-white w-full h-full">
        <section class="px-8 py-4">
            <h1 class="text-xl">General</h1>
            <p>Total made items: {{ items.length }}</p>
        </section>
        <section class="px-8 py-4">
            <h1 class="text-xl">Most used tags</h1>
            <chart-wrapper
                class="chart-container sm:w-full lg:w-2/3 xl:w-1/2 overflow-hidden"
            >
                <bar-chart
                    v-if="tags.length > 0"
                    :chart-data="barData"
                    :options="barOptions"
                />
            </chart-wrapper>
        </section>
        <section class="px-8 py-4">
            <h1 class="text-xl">Items by type</h1>
            <chart-wrapper
                class="chart-container sm:w-full lg:w-2/3 xl:w-1/2 overflow-hidden"
            >
                <doughnut-chart
                    v-if="itemCategories.length > 0"
                    :chart-data="doughnutData"
                />
            </chart-wrapper>
        </section>
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
        maintainAspectRatio: false,
        responsive: true,
    }

    // mounted() {
    //     console.log('mounted!')
    //     this.tags.forEach(async (tag: Tag) => {
    //         const tagToStore = this.assignRandomItems(tag)
    //         tagsClient.assignItems(tagToStore, tagToStore.items)
    //     })
    // }

    // assignRandomItems(tag: Tag) {
    //     this.items.forEach((item: Item) => {
    //         if (Math.random() > 0.5) {
    //             return
    //         }
    //         const itemKey = { id: item.id, item_type: item.item_type }
    //         tag.items.push(itemKey)
    //     })
    //     return tag
    // }

    // Prepare sortable objects
    get tags() {
        const tagsFromStore = this.$store.state.tags
        return this.sortDescending(tagsFromStore)
    }

    sortDescending(tags: Array<Tag>) {
        // copy, otherwise you'll end up modifying vuex state stuff
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

    get items() {
        return this.$store.state.items
    }

    get itemCategories() {
        const itemTypeUses = {
            [ItemType.PAGE]: 0,
            [ItemType.TODO]: 0,
            [ItemType.TODO_ITEM]: 0,
            [ItemType.TEXT_FIELD]: 0,
        }
        this.items.forEach((item: Item) => {
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

<style scoped>
.chart-container {
    @apply relative m-auto;
}
</style>
