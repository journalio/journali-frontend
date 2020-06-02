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
import TextInput from '@/components/TextInput.vue'
import PageAdder from '@/components/PageAdder.vue'
import PagesList from '@/components/PagesList.vue'
import { Page } from '@/models'
import { Uuid } from '@/models/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { PagesList, PageAdder, TextInput },
})
export default class JournaliSidebar extends Vue {
    searchWord = ''

    get pages() {
        return this.$store.state.pages.filter((page: Page) =>
            page.title.toLowerCase().includes(this.searchWord.toLowerCase()),
        )
    }

    // get pagesToDisplay() {
    //     return this.foundPages.length > 0 ? this.foundPages : this.pages
    // }

    protected mounted() {
        this.$store.dispatch('loadPages')
    }

    openPage(pageId: Uuid) {
        this.$router.push(`/page/${pageId}`)
    }

    deletePage(page: Page) {
        this.$store.dispatch('deletePage', page)
    }
}
</script>
