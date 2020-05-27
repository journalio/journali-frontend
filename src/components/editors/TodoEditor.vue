<template>
    <div class="flex flex-col">
        Todo title:
        <input :value="value.title" @input="onTitleChange" />
        <button @click="submit()">Save</button>
    </div>
</template>

<script lang="ts">
import { Todo } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoEditor extends Vue {
    @Prop(Object) readonly value!: Todo

    @Emit('input')
    onTitleChange($event: { target: HTMLInputElement }) {
        return {
            ...this.value,
            title: $event.target.value,
        }
    }

    @Emit()
    submit() {
        //
    }
}
</script>
