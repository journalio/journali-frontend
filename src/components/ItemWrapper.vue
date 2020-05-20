<template>
    <div
        :style="{ left: `${x}px`, top: `${y}px` }"
        class="p-4 rounded bg-white absolute"
        @mousedown="startDragging"
        @mousemove.prevent="updatePosition"
        @mouseup="dragging = false"
    >
        <component :is="type" v-bind="item"></component>
    </div>
</template>

<script lang="ts">
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Renderable } from '@/models/entities'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: { Todo, TextField },
})
export default class ItemWrapper extends Vue {
    @Prop(String) readonly type!: string
    @Prop(Object) readonly item!: Renderable

    x = this.item.coord_x
    y = this.item.coord_y
    dragging = false
    dragCoords = { offsetX: 0, offsetY: 0 }

    startDragging({ offsetX, offsetY }: MouseEvent) {
        this.dragging = true
        this.dragCoords = {
            offsetX,
            offsetY,
        }
    }

    updatePosition({
        clientX,
        clientY,
        currentTarget,
    }: MouseEvent & { currentTarget: HTMLElement }) {
        if (!this.dragging || !currentTarget.parentElement) {
            return
        }
        const parentPosition = currentTarget.parentElement.getBoundingClientRect()
        this.x = clientX - this.dragCoords.offsetX - parentPosition.x
        this.y = clientY - this.dragCoords.offsetY - parentPosition.y
    }
}
</script>
