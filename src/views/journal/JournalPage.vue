<template>
    <div
        ref="container"
        class="w-full h-full rounded p-4 relative journal-background"
        @mousemove="handleDrag"
        @mouseleave="dragData = null"
    >
        <div class="flex flex-row-reverse">
            <tag-list :tags="tags" class="tag-list" />
        </div>
        <item-wrapper
            v-for="item of renderableItems"
            :key="item.id"
            :item="item"
            :type="componentName[item.item_type]"
            :class="{ 'z-50': dragData && dragData.item.id === item.id }"
            @drag-start="dragData = $event"
            @drag-stop="dragData = null"
        ></item-wrapper>
    </div>
</template>

<script lang="ts">
import TagList from '@/components/TagList.vue'
import ItemWrapper from '@/components/ItemWrapper.vue'
import { Item, Renderable } from '@/models/entities'
import { ItemType } from '@/models/types'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

type RenderableItemType = ItemType.TODO & ItemType.TEXT_FIELD
type DragData = {
    item: Item
    offsetX: number
    offsetY: number
}

@Component({
    components: { TagList, ItemWrapper },
})
export default class JournalPage extends Vue {
    @Prop(Array) readonly items!: Item[]
    @Ref('container') readonly container!: HTMLDivElement

    dragData: DragData | null = null

    get tags() {
        // TODO: get item specific tags.
        return this.$store.state.tags
    }

    get renderableItems() {
        return this.items.filter(
            (item) => item.item_type === 200 || item.item_type === 300,
        )
    }

    handleDrag({ clientX, clientY }: MouseEvent) {
        if (!this.dragData) {
            return
        }
        const offset = this.container.getBoundingClientRect()
        this.$store.dispatch('updateItem', {
            ...this.dragData.item,
            coord_x: clientX - offset.x - this.dragData.offsetX,
            coord_y: clientY - offset.y - this.dragData.offsetY,
        })
    }

    readonly componentName: Record<RenderableItemType, Renderable> = {
        [ItemType.TODO]: 'Todo',
        [ItemType.TEXT_FIELD]: 'TextField', // TODO: Implement
    }
}
</script>

<style scoped>
.tag-list {
    @apply bg-white rounded shadow-md;
    /* TODO: replace by variable, no magic numbers plz */
    max-width: 15rem;
}
</style>
