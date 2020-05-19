<template>
    <div>
        <span>{{ title }}</span>
        <ul>
            <li v-for="item of childItems" :key="item.id">
                {{ item.id }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import AbstractJournalItem from '@/components/items/AbstractJournalItem'
import TodoItem from '@/models/TodoItem'
import { Component } from 'vue-property-decorator'

@Component
export default class TodoList extends AbstractJournalItem<TodoItem> {
    title = 'Hello world'
}
</script>
