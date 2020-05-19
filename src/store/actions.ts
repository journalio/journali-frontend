import ItemsClient from '@/lib/http/ItemsClient'
import { Uuid } from '@/models'
import Page from '@/models/Page'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()

type ActionHandler = ActionContext<AppState, AppState>

export default {
    async loadPages({ commit }: ActionHandler) {
        commit('loadPages')
        const pages = await itemsClient.fetchPages()
        commit('pagesLoaded', pages)
    },
    async loadItems({ commit }: ActionHandler, parentId: Uuid) {
        commit('loadItems')
        const items = await itemsClient.fetchItemsByParent(parentId)
        commit('itemsLoaded', items)
    },
    async createPage({ commit }: ActionHandler, data: Page) {
        commit('loadPages')
        itemsClient
            .createPage(data)
            .then((newPage) => {
                commit('pagesLoaded', newPage)
                return newPage.id
            })
            .catch((error) => {
                console.error(error)
            })
    },
}
