<template>
    <div class="flex flex-col">
        Todo title:
        <input v-model="title" @input="onTitleChange" />
        <button @click="submit()">Save</button>
    </div>
</template>

<script lang="ts">
import { Todo } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoEditor extends Vue {
    @Prop(Object) readonly value!: Todo

    // can't change prop, so use this instead
    title = this.value.title

    get newItem() {
        return {
            ...this.value,
            title: this.title,
        }
    }

    @Emit('input')
    onTitleChange() {
        return this.newItem
    }

    @Emit()
    submit() {
        return this.newItem
    }
}
</script>
