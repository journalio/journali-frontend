<template>
    <form
        class="flex flex-col"
        @submit.prevent="handleSubmit"
    >
        Please enter your name and age:

        <label class="my-4">
            Name:
            <input
                v-model="name"
                type="text"
                autocomplete="name"
                class="text-black"
            />
        </label>
        <label class="my-4">
            Age:
            <input
                v-model="age"
                type="tel"
                autocomplete="age"
                class="text-black"
            />
        </label>

        <input
            class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
            type="submit"
            value="submit"
        />

        <p v-if="response">
            {{ response }}
        </p>
    </form>
</template>

<script>
export default {
    methods: {
        async handleSubmit() {
            const response = await fetch(`/api/hello/${this.name}/${this.age}`)
            this.response = await response.text()
        },
    },
    data() {
        return {
            name: '',
            age: 18,
            response: '',
        }
    },
}
</script>

<style scoped></style>
