<template>
    <div>
        <span class="font-bold text-lg font-display">{{ title }}</span>
        <ul>
            <li v-for="item of childItems" :key="item.id" class="leading-5">
                <button
                    class="rounded border w-5 h-5"
                    @click="toggleTodoItem(item)"
                >
                    <icon-check
                        v-if="item.is_checked"
                        class="w-full h-full fill-current"
                    ></icon-check>
                </button>
                {{ item.title }}
            </li>
        </ul>
        <div v-show="showNewTodo">
            <text-input
                v-model="newTodoTitle"
                name="List item"
                @submit="saveNewTodo"
            ></text-input>
        </div>
        <button
            class="text-gray-500 uppercase text-sm flex items-center mt-2"
            @click.stop="showNewTodo = !showNewTodo"
        >
            Add todo
            <icon-add class="w-5 h-5 fill-current"></icon-add>
        </button>
    </div>
</template>

<script lang="ts">
import AbstractJournalItem from '@/components/items/AbstractJournalItem'
import TextInput from '@/components/TextInput.vue'
import { TodoItem } from '@/models'
import { ItemType, Uuid } from '@/models/types'
import { Component, Prop } from 'vue-property-decorator'
import IconAdd from '../../assets/icons/icon-add.svg'
import IconCheck from '../../assets/icons/icon-check.svg'

@Component({
    components: { TextInput, IconAdd, IconCheck },
})
export default class Todo extends AbstractJournalItem<TodoItem> {
    @Prop(String) readonly title!: string
    @Prop(String) readonly id!: Uuid
    protected showNewTodo = false
    protected newTodoTitle = ''

    protected async saveNewTodo() {
        console.log(this.newTodoTitle)
        await this.$store.dispatch('createItem', {
            item_type: ItemType.TODO_ITEM,
            todo_id: this.id,
            title: this.newTodoTitle,
        })

        this.newTodoTitle = ''
        this.showNewTodo = false
    }

    protected async toggleTodoItem(item: TodoItem) {
        await this.$store.dispatch('updateItem', {
            ...item,
            is_checked: !item.is_checked,
        })
    }
}
</script>
