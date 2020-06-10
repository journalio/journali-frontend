<script lang="ts">
import { Bar, mixins } from 'vue-chartjs'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Vue from 'vue'
const { reactiveProp } = mixins

@Component({
    extends: Bar,
    mixins: [reactiveProp],
})
export default class BarChart extends Vue {
    @Prop(Object)
    chartData!: Record<string, unknown>

    @Prop(Object)
    options!: Record<string, unknown>

    // Keeps tools from whining when they can't find renderChart()
    renderChart!: (
        chartData: Record<string, unknown>,
        options: Record<string, unknown>,
    ) => void

    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>
