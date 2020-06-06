<template>
    <div v-if="item.due_date" class="text-xs text-gray-700">
        Due: {{ formattedDueDate }}
    </div>
</template>

<script lang="ts">
import { AnyDomainItem } from '@/models/types'
import formatDistance from 'date-fns/formatDistance'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ItemFooter extends Vue {
    @Prop(Object) readonly item!: AnyDomainItem

    protected get formattedDueDate() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return formatDistance(this.item.due_date!, new Date())
    }
}
</script>
