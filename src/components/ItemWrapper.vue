<template>
    <div
        :style="{ left: `${item.coord_x}px`, top: `${item.coord_y}px` }"
        class="rounded bg-white absolute shadow select-none"
        @mouseup="stopDragging"
        @mousedown="startDragging"
    >
        <div class="p-1 flex flex-row">
            <button class="text-xs" @click="editMode = !editMode">Edit</button>
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
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
    components: { Todo, TextField, TodoEditor, TextFieldEditor },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

    // made this because Vue doesn't allow changing properties
    editableItem = Object.assign({}, this.item)

    // keep editableItem up to date
    @Watch('item', { deep: true })
    onItemChanged() {
        this.editableItem = Object.assign({}, this.item)
    }

    editMode = false

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
        if (this.type === null) {
            throw 'ItemType should not be null at this point'
        }
        this.$store.dispatch('updateItem', this.editableItem)
    }
}
</script>
