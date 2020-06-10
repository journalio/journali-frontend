<template>
    <div v-if="loading">
        Loading...
    </div>
    <journal-page v-else :items="items" :tags="tags" />
</template>

<script lang="ts">
import { Tag } from '@/models/entities'
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

    get tags() {
        return this.$store.getters.getTagsByItem(this.pageId, ItemType.PAGE)
    }

    protected handleCreateTag(tagName: string) {
        this.$store.dispatch('createTag', {
            tag_name: tagName,
            item_id: this.item.id,
            item_type: this.item.item_type,
        })
    }

    protected handleDeleteTag(tag: Tag) {
        this.$store.dispatch('deleteTag', {
            tag,
            item: this.item,
        })
    }
}
</script>
