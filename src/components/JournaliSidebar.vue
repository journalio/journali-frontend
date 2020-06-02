<template>
    <div class="w-auto bg-white shadow py-8 z-10">
        <text-input
            v-model="searchWord"
            autocomplete="off"
            class="px-4"
            label="Search"
            placeholder="Key words"
            type="search"
        />
        <div class="text-sm my-2 text-gray-700 px-4">Pages</div>
        <pages-list :pages="pages" @delete="deletePage($event)"></pages-list>
        <page-adder class="px-4 mt-4" @add:page="openPage($event)" />
    </div>
</template>

<script lang="ts">
import PageAdder from '@/components/PageAdder.vue'
import PagesList from '@/components/PagesList.vue'
import TextInput from '@/components/TextInput.vue'
import { Page } from '@/models'
import { ItemType, Uuid } from '@/models/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { PagesList, PageAdder, TextInput },
})
export default class JournaliSidebar extends Vue {
    searchWord = ''

    get pages() {
        return this.$store.getters
            .getItemsByType(ItemType.PAGE)
            .filter((page: Page) =>
                page.title
                    .toLowerCase()
                    .includes(this.searchWord.toLowerCase()),
            )
    }

    protected async created() {
        await this.$store.dispatch('loadAllTags')
        console.log(this.$store.state.tags)
    }

    openPage(pageId: Uuid) {
        this.$router.push(`/page/${pageId}`)
    }

    deletePage(page: Page) {
        this.$store.dispatch('deleteItem', page)
        if (this.$route.params.pageId === page.id) {
            this.$router.replace('/page')
        }
    }
}
</script>
