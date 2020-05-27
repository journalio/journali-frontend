<template>
    <div class="flex flex-col">
        TextField text:
        <input v-model="text" @input="onTextChange" />
        <button @click="submit()">Save</button>
    </div>
</template>

<script lang="ts">
import { TextField } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextFieldEditor extends Vue {
    @Prop(Object) readonly value!: TextField

    // can't change prop, so use this instead
    text = this.value.text

    get newItem() {
        return {
            ...this.value,
            text: this.text,
        }
    }

    @Emit('input')
    onTextChange() {
        return this.newItem
    }

    @Emit()
    submit() {
        return this.newItem
    }
}
</script>
