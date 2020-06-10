<template>
    <div
        :style="{ left: `${item.coord_x}px`, top: `${item.coord_y}px` }"
        class="item-wrapper p-4 relative"
        @mouseenter="hovering = true"
        @mousedown.stop.prevent="startDragging"
        @mouseup.stop.prevent="stopDragging"
        @mouseleave="hovering = false"
    >
        <item-header
            :tags="tags"
            :visible="hovering || tagsShowing"
            @delete="deleteItem"
            @show:tags="tagsShowing = $event"
            @toggle:edit-mode="editMode = !editMode"
            @create:tag="handleCreateTag"
            @delete:tag="handleDeleteTag"
        />
        <div v-if="editMode">
            <component
                :is="`${type}Editor`"
                v-model="editableItem"
                @submit="updateItem($event)"
            />

            <text-input
                v-model="editableItemDueDate"
                type="datetime-local"
                label="Due date"
            />
        </div>
        <div v-else>
            <component :is="type" v-bind="editableItem" />
        </div>
        <item-footer :item="editableItem" class="mt-2" />
    </div>
</template>

<script lang="ts">
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import ItemFooter from '@/components/ItemFooter.vue'
import ItemHeader from '@/components/ItemHeader.vue'
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import TagList from '@/components/TagList.vue'
import TextInput from '@/components/TextInput.vue'
import { isElementContainedByElementType } from '@/lib/utils'
import { Renderable, Tag } from '@/models/entities'
import { AnyDomainItem } from '@/models/types'
import format from 'date-fns/format'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

// Cancel event when target is an interactive element
const INTERACTIVE_ELEMENTS = ['input', 'select', 'textarea', 'button']

@Component({
    components: {
        ItemHeader,
        ItemFooter,
        TextInput,
        TagList,
        Todo,
        TextField,
        TodoEditor,
        TextFieldEditor,
    },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: AnyDomainItem & Renderable

    private editMode = false
    private hovering = false
    private tagsShowing = false

    // copy item object because Vue doesn't allow changing properties
    editableItem: AnyDomainItem = { ...this.item }

    get tags() {
        return this.$store.getters.getTagsByItem(
            this.item.id,
            this.item.item_type,
        )
    }

    // keep editableItem up to date
    @Watch('item', { deep: true })
    onItemChanged() {
        this.editableItem = { ...this.item } as AnyDomainItem
    }

    @Emit('drag-stop')
    stopDragging() {
        return null
    }

    @Emit('drag-start')
    startDragging(event: MouseEvent & { target?: HTMLElement }) {
        const { offsetX, offsetY } = event
        if (
            isElementContainedByElementType(INTERACTIVE_ELEMENTS, event.target)
        ) {
            event.target.focus()
            return null
        }
        return {
            item: this.editableItem,
            offsetX,
            offsetY,
        }
    }

    protected updateItem() {
        this.$store.dispatch('updateItem', this.editableItem)
        this.editMode = false
    }

    protected deleteItem() {
        this.$store.dispatch('deleteItem', this.item)
    }

    protected get editableItemDueDate(): string | undefined {
        const date = this.editableItem.due_date
        return date ? format(date, "yyyy-MM-dd'T'HH:mm") : undefined
    }

    protected set editableItemDueDate(event: string | undefined) {
        this.editableItem.due_date = event ? new Date(event) : null
    }

    protected handleCreateTag(tagName: string) {
        this.$store.dispatch('createTag', {
            tag_name: tagName,
            item_id: this.item.id,
            item_type: this.item.item_type,
        })
    }

    protected handleDeleteTag(tag: Tag) {
        this.$store.dispatch('deleteTag', {
            tag,
            item: this.item,
        })
    }
}
</script>

<style scoped>
.item-wrapper {
    @apply rounded bg-white absolute shadow select-none;
    min-width: 16rem;
}

.visible {
    @apply opacity-100;
}
</style>
