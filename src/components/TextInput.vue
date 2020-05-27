<template>
    <div class="flex justify-between flex-col items-start">
        <label :for="name" class="mr-2 text-gray-700 text-xs">
            {{ label }}
        </label>
        <input
            :id="name"
            :name="name"
            :value="value"
            class="text-black focus:bg-gray-100 px-2 py-1 border-b-2 rounded-t outline-none w-full"
            v-bind="$attrs"
            @input="$emit('input', $event.target.value)"
            @keypress.enter="$emit('submit', $event.target.value)"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    inheritAttrs: false,
})
export default class TextInput extends Vue {
    @Prop(String) readonly value!: string
    @Prop(String) readonly name!: string
    @Prop(String) readonly label!: string
}
</script>
