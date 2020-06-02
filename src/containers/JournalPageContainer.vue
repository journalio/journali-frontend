<template>
    <div v-if="loading">
        Loading...
    </div>
    <journal-page v-else :items="items" />
</template>

<script lang="ts">
import { ItemType } from '@/models/types'
import JournalPage from '@/views/journal/JournalPage.vue'
import { Component, Vue } from 'vue-property-decorator'

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

    get items() {
        return this.$store.getters.getItemsByParent(this.pageId, ItemType.PAGE)
    }
}
</script>
