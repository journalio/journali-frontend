<template>
    <div>
        <span class="font-bold">{{ title }}</span>
        <ul>
            <li v-for="item of childItems" :key="item.id">
                {{ item.id }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import AbstractJournalItem from '@/components/items/AbstractJournalItem'
import { TodoItem } from '@/models'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TodoList extends AbstractJournalItem<TodoItem> {
    @Prop(String) readonly title!: string
}
</script>
