<script>
export default {
    computed: {
        count() {
            return this.$store.state.count
        },
    },
    methods: {
        increment() {
            this.$store.commit('increment')
        },
    },
}
</script>

<template>
    <div>
        <h2 class="text-xl">Store usage example</h2>
        <span>{{ count }}</span>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="increment()"
        >
            Incrementl!
        </button>
    </div>
</template>
