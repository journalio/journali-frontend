<template>
    <div
        :style="{ left: `${item.coord_x}px`, top: `${item.coord_y}px` }"
        class="item-wrapper relative"
        @mousedown.stop.prevent="startDragging"
        @mouseup.stop.prevent="stopDragging"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
    >
        <div :class="{ visible: hovering || tagsShowing }" class="edit-bar">
            <button
                class="edit-icon"
                title="Toggle edit"
                @click.stop.prevent="editMode = !editMode"
            >
                <icon-edit class="fill-current"></icon-edit>
            </button>
            <tag-list :tags="tags" @tagsShowing="tagsShowing = $event" />
            <button
                class="trash-icon"
                title="Delete item"
                @click.stop.prevent="deleteItem()"
            >
                <icon-trash class="fill-current"></icon-trash>
            </button>
        </div>
        <div v-if="type && editMode" class="px-4 pb-4">
            <component
                :is="`${type}Editor`"
                v-model="editableItem"
                @submit="updateItem($event)"
            />
        </div>
        <div v-else class="px-4 pb-4">
            <component :is="type" v-bind="editableItem"></component>
        </div>
    </div>
</template>

<script lang="ts">
import IconEdit from '@/assets/icons/icon-edit.svg'
import IconTrash from '@/assets/icons/icon-trash.svg'
import TagList from '@/components/TagList.vue'
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

// Cancel event when target is an interactive element
const shouldCancel = (target?: HTMLElement) =>
    ['input', 'select', 'textarea', 'button'].includes(
        target?.tagName.toLowerCase() || '',
    )

@Component({
    components: {
        TagList,
        Todo,
        TextField,
        TodoEditor,
        TextFieldEditor,
        IconTrash,
        IconEdit,
    },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

    private editMode = false
    private hovering = false
    private tagsShowing = false

    // copy item object because Vue doesn't allow changing properties
    editableItem = Object.assign({}, this.item)

    get tags() {
        // TODO: get item specific tags.
        return this.$store.state.tags
    }

    // keep editableItem up to date
    @Watch('item', { deep: true })
    onItemChanged() {
        this.editableItem = Object.assign({}, this.item)
    }

    @Emit('drag-stop')
    stopDragging() {
        return null
    }

    @Emit('drag-start')
    startDragging(event: MouseEvent & { target?: HTMLElement }) {
        const { offsetX, offsetY } = event
        if (shouldCancel(event.target)) {
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
}
</script>

<style scoped>
.item-wrapper {
    @apply rounded bg-white absolute shadow select-none;
}

.edit-bar {
    @apply flex flex-row justify-between bg-white bg-opacity-75 transition-opacity duration-100 ease-out rounded-t cursor-move opacity-0;
}

.visible {
    @apply opacity-100;
}

.edit-icon,
.trash-icon {
    @apply w-6 h-6 p-1 cursor-pointer;
}

.trash-icon {
    @apply text-red-600;
}

.trash-icon:hover {
    @apply text-red-700;
}
</style>
