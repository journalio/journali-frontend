import ItemsClient from '@/lib/http/ItemsClient'
import { Commit } from 'vuex'

const itemsClient = new ItemsClient()

export default {
    async loadPages({ commit }: { commit: Commit }) {
        const pages = await itemsClient.fetchPages()
        commit('pagesLoaded', pages)
    },
}
