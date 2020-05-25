<template>
    <div>
        <div v-if="!editMode">{{ text }}</div>
        <input v-else v-model="text" type="text" />
        <button @click="edit()">Edit</button>
    </div>
</template>

<script lang="ts">
import AbstractJournalItem from '@/components/items/AbstractJournalItem'
import { Component, Emit, Prop } from 'vue-property-decorator'

@Component
export default class TextField extends AbstractJournalItem {
    @Prop(String) readonly text!: string

    editMode = false

    protected edit() {
        if (this.editMode) {
            this.editItem()
        }
        this.editMode = !this.editMode
    }

    @Emit('change')
    protected editItem() {
        // must return an object instead of just a text, to make sure the itemWrapper's updateItem can handle this.
        return {
            text: this.text,
        }
    }
}
</script>
