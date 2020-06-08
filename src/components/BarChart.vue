<script lang="ts">
import { Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { Bar } from 'vue-chartjs'

export default class BarChart extends mixins(Bar) {
    @Prop(Object) readonly data: Record<string, unknown>
    @Prop(Object) readonly options: Record<string, unknown>

    mounted() {
        this.renderChart(this.data, this.options)
    }
}
</script>
