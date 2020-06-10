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
                    :options="doughnutOptions"
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

@Component({
    components: { BarChart, DoughnutChart, ChartWrapper },
})
export default class Statistics extends Vue {
    barOptions = {
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    fontSize: 5,
                },
            ],
        },
        title: {
            display: true,
            text: 'Number of items a tag is assigned to',
        },
    }

    doughnutOptions = {
        legend: {
            labels: {
                fontSize: 12,
            },
            position: 'right',
        },
        responsive: true,
        title: {
            display: true,
            text: 'Created items by item type',
        },
    }

    // Prepare sortable objects
    get tags() {
        const tagsFromStore = this.$store.state.tags
        return this.sortTagsDescending(tagsFromStore)
    }

    private sortTagsDescending(tags: Array<Tag>) {
        // copy, otherwise you'll end up modifying vuex state
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
        return Object.entries(itemTypeUses).map((entry) => {
            const key = parseInt(entry[0], 10)
            const itemName = ItemType[key].toLowerCase()
            const value = entry[1]
            return {
                name: itemName,
                color: this.stringToColor(itemName),
                uses: value,
            }
        })
    }

    // Uses string as seed to create color
    private stringToColor(string: string) {
        let hash = 0
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }
        let colour = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            colour += ('00' + value.toString(16)).substr(-2)
        }
        return colour
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
