<template>
    <div v-if="loading">
        Loading...
    </div>
    <journal-page v-else :items="items" :page="page" />
</template>

<script lang="ts">
import JournalPage from '@/views/journal/JournalPage.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
    components: { JournalPage },
})
export default class JournalPageContainer extends Vue {
    get loading() {
        return this.$store.state.itemsLoading
    }

    get pageId() {
        return this.$route.params.pageId
    }

    get page() {
        return this.$store.getters.getPageById(this.pageId)
    }

    get items() {
        return this.$store.state.items
    }

    @Watch('$route')
    protected loadItems() {
        this.$store.dispatch('loadItems', { parent_id: this.pageId })
    }

    protected created() {
        this.loadItems()
    }
}
</script>
