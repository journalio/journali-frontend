<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        haha
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class JournalPage extends Vue {
    get loading() {
        return !(this.pageId in this.$store.state.items)
    }

    get pageId() {
        return this.$route.params.pageId
    }

    get page() {
        return this.$store.getters.getPageById(this.pageId)
    }

    get items() {
        return this.$store.getters.getPageItems(this.pageId)
    }

    @Watch('$route')
    protected loadPage() {
        this.$store.dispatch('loadPage', this.pageId)
    }

    protected created() {
        this.loadPage()
    }
}
</script>
