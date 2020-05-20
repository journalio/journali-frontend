<template>
    <div
        :style="{ left: `${item.coord_x}px`, top: `${item.coord_y}px` }"
        class="p-4 rounded bg-white absolute shadow"
        @mouseup="stopDragging"
        @mousedown="startDragging"
    >
        <component :is="type" v-bind="item"></component>
    </div>
</template>

<script lang="ts">
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: { Todo, TextField },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

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
}
</script>
