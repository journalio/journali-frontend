<template>
    <form class="flex flex-col items-center" @submit.prevent="handleSubmit">
        Please enter your name and age:

        <label class="my-4">
            Name:
            <input
                v-model="name"
                type="text"
                autocomplete="name"
                class="text-black bg-gray-200 px-2 py-1 border-2 rounded"
            />
        </label>

        <input
            class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
            type="submit"
            value="submit"
        />

        <p v-if="response" class="p-4 border rounded">
            {{ response }}
        </p>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ApiTest extends Vue {
    name = ''
    response = ''

    async handleSubmit() {
        const response = await fetch(`/api/hello/${this.name}`)
        this.response = await response.text()
    }
}
</script>
