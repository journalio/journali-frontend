<template>
    <div class="flex flex-col">
        <text-input
            v-model="title"
            label="Todo title:"
            @input="onTitleChange"
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
import TextInput from '@/components/TextInput.vue'
import { Todo } from '@/models/entities'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: { TextInput },
})
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
