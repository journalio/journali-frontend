<template>
    <div
        :style="{ left: `${item.coord_x}px`, top: `${item.coord_y}px` }"
        class="rounded bg-white absolute shadow select-none"
        @mousedown.stop.prevent="startDragging"
        @mouseup.stop.prevent="stopDragging"
    >
        <div class="p-1 flex flex-row justify-between">
            <button class="text-xs" @click="editMode = !editMode">Edit</button>
            <button class="trash-icon" @click.stop.prevent="deleteItem()">
                <icon-trash class="fill-current"></icon-trash>
            </button>
        </div>
        <div v-if="type && editMode" class="px-4 pt-1 pb-4">
            <component
                :is="`${type}Editor`"
                v-model="editableItem"
                @submit="updateItem($event)"
            />
        </div>
        <div v-else class="px-4 pt-1 pb-4">
            <component :is="type" v-bind="editableItem"></component>
        </div>
    </div>
</template>

<script lang="ts">
import IconTrash from '@/assets/icons/icon-trash.svg'
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
    components: { Todo, TextField, TodoEditor, TextFieldEditor, IconTrash },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

    editMode = false

    // copy item object because Vue doesn't allow changing properties
    editableItem = Object.assign({}, this.item)

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
    startDragging({ offsetX, offsetY }: MouseEvent) {
        return {
            item: this.editableItem,
            offsetX,
            offsetY,
        }
    }

    protected updateItem() {
        this.$store.dispatch('updateItem', this.editableItem)
    }

    protected deleteItem() {
        this.$store.dispatch('deleteItem', this.item)
    }
}
</script>

<style scoped>
.trash-icon {
    @apply ml-auto w-6 h-6 p-1 transition-colors duration-100 ease-out text-red-600;
}

.trash-icon:hover {
    @apply text-red-700;
}
</style>
