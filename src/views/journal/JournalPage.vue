<template>
    <div class="w-full h-full rounded p-4 relative">
        <item-wrapper
            v-for="item of items"
            :key="item.id"
            :item="item"
            :type="componentName[item.item_type]"
        ></item-wrapper>
    </div>
</template>

<script lang="ts">
import ItemWrapper from '@/components/ItemWrapper.vue'
import { Item, Page } from '@/models/entities'
import { Renderable } from '@/models/traits'
import { ItemType } from '@/models/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

type RenderableItemType = ItemType.TODO & ItemType.TEXT_FIELD

@Component({
    components: { ItemWrapper },
})
export default class JournalPage extends Vue {
    @Prop(Array) readonly items!: Item[]
    @Prop(Object) readonly page!: Page

    readonly componentName: Record<RenderableItemType, Renderable> = {
        [ItemType.TODO]: 'Todo',
        [ItemType.TEXT_FIELD]: 'TextField', // TODO: Implement
    }
}
</script>
