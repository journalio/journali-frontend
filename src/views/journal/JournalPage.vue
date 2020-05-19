<template>
    <div class="bg-white w-64 h-64 rounded p-4 relative">
        <component
            :is="componentName[item.item_type]"
            v-for="item of items"
            :key="item.id"
            v-bind="item"
        ></component>
    </div>
</template>

<script lang="ts">
import TodoList from '@/components/items/TodoList.vue'
import { ItemType, RenderableItem } from '@/models'
import Item from '@/models/Item'
import Page from '@/models/Page'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: { TodoList },
})
export default class JournalPage extends Vue {
    @Prop(Array) readonly items!: Item[]
    @Prop(Object) readonly page!: Page

    readonly componentName: Record<RenderableItem, string> = {
        [ItemType.TODO]: 'TodoList',
        [ItemType.TEXT_FIELD]: 'TextField', // TODO: Implement
    }
}
</script>
