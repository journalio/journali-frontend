<template>
    <div class="w-auto bg-white shadow py-8 z-10">
        <div class="text-sm mb-1 text-gray-700 px-4">Pages</div>
        <pages-list :pages="pages" @delete="deletePage($event)"></pages-list>
        <page-adder class="px-4 mt-4" @add:page="openPage($event)" />
    </div>
</template>

<script lang="ts">
import PageAdder from '@/components/PageAdder.vue'
import PagesList from '@/components/PagesList.vue'
import { Page } from '@/models'
import { ItemType, Uuid } from '@/models/types'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { PagesList, PageAdder },
})
export default class JournaliSidebar extends Vue {
    get pages() {
        return this.$store.getters.getItemsByType(ItemType.PAGE)
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
