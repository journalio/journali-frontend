import ItemsClient from '@/lib/http/ItemsClient'
import { AppState } from '@/store/index'
import { Store } from 'vuex'

const itemsClient = new ItemsClient()

export default {
    async loadPages({ commit }: Store<AppState>) {
        const pages = await itemsClient.fetchPages()
        commit('pagesLoaded', pages)
    },
}
