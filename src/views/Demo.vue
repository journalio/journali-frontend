<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ApiTest extends Vue {
    isLoading = true
    message = ''

    async mounted() {
        try {
            const response = await fetch(`/api/demo`)
            this.message = await response.text()
        } catch (e) {
            this.message = e.message
        } finally {
            this.isLoading = false
        }
    }
}
</script>

<template>
    <div>
        <span v-if="isLoading">Loading...</span>
        <span v-else>{{ message }}</span>
    </div>
</template>
