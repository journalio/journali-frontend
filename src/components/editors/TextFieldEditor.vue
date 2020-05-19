<template>
    <div>
        TextField text:
        <input :value="value.text" @input="onTextChange" />
        <button @click="create()">Create textfield</button>
    </div>
</template>

<script lang="ts">
import { TextField } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextFieldEditor extends Vue {
    @Prop(Object) readonly value!: TextField

    @Emit('input')
    onTextChange($event: { target: HTMLInputElement }) {
        return {
            ...this.value,
            text: $event.target.value,
        }
    }

    @Emit('create')
    create() {
        //
    }
}
</script>
