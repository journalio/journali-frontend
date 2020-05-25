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
                v-model="item"
                @create="updateItem($event)"
            />
        </div>
        <div v-else class="px-4 pt-1 pb-4">
            <component :is="type" v-bind="item"></component>
        </div>
    </div>
</template>

<script lang="ts">
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: { Todo, TextField, TodoEditor, TextFieldEditor },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

    editMode = false

    @Emit('drag-stop')
    stopDragging() {
        return null
    }

    @Emit('drag-start')
    startDragging({ offsetX, offsetY }: MouseEvent) {
        return {
            item: this.item,
            offsetX,
            offsetY,
        }
    }

    protected updateItem(changedItem: Renderable) {
        this.$store.dispatch('updateItem', changedItem)
    }
}
</script>
