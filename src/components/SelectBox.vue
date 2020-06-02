<template>
    <label class="my-4 text-gray-700 text-sm">
        {{ label }}
        <select
            :value="value"
            class="text-black px-2 py-1 rounded-t border-b-2 outline-none focus:bg-gray-100 w-full"
            @change="$emit('input', $event.target.value)"
        >
            <option v-if="!value" disabled selected>
                Select an option
            </option>
            <option v-for="item of items" :key="item">
                {{ item }}
            </option>
        </select>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectBox extends Vue {
    @Prop(String) protected readonly label!: string
    @Prop(Array) protected readonly items!: string[]
    @Prop(String) protected readonly value!: string
}
</script>
