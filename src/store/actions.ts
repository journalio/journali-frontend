import ItemsClient from '@/lib/http/ItemsClient'
import { Uuid } from '@/models'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()

type ActionHandler = ActionContext<AppState, AppState>

export default {
    async loadPages({ commit }: ActionHandler) {
        const pages = await itemsClient.fetchPages()
        commit('pagesLoaded', pages)
    },
    async loadPage({ commit }: ActionHandler, pageId: Uuid) {
        const items = await itemsClient.fetchPage(pageId)
        commit('pageLoaded', { pageId, items })
    },
}
