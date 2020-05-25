<template>
    <div class="flex flex-col">
        TextField text:
        <input v-model="text" />
        <button @click="create()">Create textfield</button>
    </div>
</template>

<script lang="ts">
import { TextField } from '@/models/entities'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TextFieldEditor extends Vue {
    @Prop(Object) readonly value!: TextField

    text = ''

    created() {
        this.text = this.value.text
    }

    @Watch('text')
    @Emit('input')
    onTextChange() {
        return {
            ...this.value,
            text: this.text,
        }
    }

    @Emit('create')
    create() {
        return {
            ...this.value,
            text: this.text,
        }
    }
}
</script>
