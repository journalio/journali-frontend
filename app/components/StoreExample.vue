<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['count']),
    methods: {
        ...mapActions(['increment']),
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
            Increment!
        </button>
    </div>
</template>
