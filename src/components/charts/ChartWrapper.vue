<template>
    <div class="relative">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BarChart from '@/components/charts/BarChart.vue'

@Component({
    components: { BarChart },
})
export default class ChartWrapper extends Vue {}
</script>
