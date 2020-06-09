<script lang="ts">
import { Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ChartJs from 'vue-chartjs'

const { reactiveProp } = ChartJs.mixins
const Bar = ChartJs.Bar

export default class BarChart extends mixins(Bar, reactiveProp) {
    @Prop(Object) readonly chartData!: Record<string, unknown>
    @Prop(Object) readonly options!: Record<string, unknown>

    protected mounted() {
        console.log('kek')
        this.renderChart(this.chartData, this.options)
    }
}
</script>
