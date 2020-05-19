<template>
    <div class="">
        <label :for="name">{{ label }}</label>
        <input
            :id="name"
            :name="name"
            :value="value"
            class="text-black bg-gray-200 px-2 py-1 border-2 rounded"
            v-bind="$attrs"
            @input="$emit('input', $event.target.value)"
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
