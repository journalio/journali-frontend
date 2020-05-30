<template>
    <div class="w-auto bg-white shadow py-8 z-10">
        <page-searcher class="px-4" @resultsFound="foundPages = $event" />
        <div class="text-sm my-2 text-gray-700 px-4">Pages</div>
        <pages-list :pages="pages" @delete="deletePage($event)"></pages-list>
        <page-adder class="px-4 mt-4" @add:page="openPage($event)" />
    </div>
</template>

<script lang="ts">
import PageAdder from '@/components/PageAdder.vue'
import PagesList from '@/components/PagesList.vue'
import PageSearcher from '@/components/PageSearcher.vue'
import { Page } from '@/models'
import { Uuid } from '@/models/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { PagesList, PageAdder, PageSearcher },
})
export default class JournaliSidebar extends Vue {
    foundPages = []

    get pages() {
        return this.foundPages.length > 0
            ? this.foundPages
            : this.$store.state.pages
    }

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
