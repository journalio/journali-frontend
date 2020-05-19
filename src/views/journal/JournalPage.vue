<template>
    <div class="bg-white w-full h-full rounded p-4 relative">
        <component
            :is="componentName[item.item_type]"
            v-for="item of items"
            :key="item.id"
            v-bind="item"
        ></component>
    </div>
</template>

<script lang="ts">
import TextField from '@/components/items/TextField.vue'
import Todo from '@/components/items/Todo.vue'
import { Item, Page } from '@/models/entities'
import { Renderable } from '@/models/traits'
import { ItemType } from '@/models/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

type RenderableItemType = ItemType.TODO & ItemType.TEXT_FIELD

@Component({
    components: { Todo, TextField },
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
