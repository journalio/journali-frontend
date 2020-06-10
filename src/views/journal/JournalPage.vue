<template>
    <div
        ref="container"
        class="w-full h-full rounded p-4 relative journal-background"
        @mousemove="handleDrag"
        @mouseleave="dragData = null"
    >
        <div class="flex flex-row-reverse">
            <tag-list
                :tags="tags"
                class="tag-list"
                @create:tag="$emit('create:tag', $event)"
                @delete:tag="$emit('delete:tag', $event)"
            />
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
import ItemWrapper from '@/components/ItemWrapper.vue'
import TagList from '@/components/TagList.vue'
import { clamp } from '@/lib/utils'
import { Item, Renderable, Tag } from '@/models/entities'
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
    @Prop(Array) readonly tags!: Tag[]
    @Ref('container') readonly container!: HTMLDivElement

    dragData: DragData | null = null

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
        const coord_x = clamp(
            0,
            offset.width,
            clientX - offset.x - this.dragData.offsetX,
        )
        const coord_y = clamp(
            0,
            offset.height,
            clientY - offset.y - this.dragData.offsetY,
        )
        this.$store.dispatch('updateItem', {
            ...this.dragData.item,
            coord_x,
            coord_y,
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
    @apply bg-white shadow-md;
    /* TODO: replace by variable, no magic numbers plz */
    max-width: 15rem;
}
</style>
