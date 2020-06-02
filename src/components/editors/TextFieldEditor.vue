<template>
    <div class="flex flex-col">
        <label class="text-gray-700 text-sm" for="input">Textfield text:</label>
        <textarea
            id="input"
            v-model="text"
            class="border border-b-2 px-2 py-1 rounded-t resize-y outline-none w-full"
            @input="onTextChange"
        />
        <button
            class="mt-4 text-sm rounded px-4 py-2 bg-primary text-white font-bold uppercase"
            @click="submit()"
        >
            Save
        </button>
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
