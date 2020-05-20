import ItemsClient from '@/lib/http/ItemsClient'
import { NewItem, Page } from '@/models'
import { Uuid } from '@/models/types'
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
        const newPage = await itemsClient.createPage(data)
        commit('pagesLoaded', newPage)
        return newPage
    },
    async createItem<T>({ commit }: ActionHandler, item: NewItem<T>) {
        const createdItem = await itemsClient.createItem(item)
        commit('addItem', createdItem)
        return createdItem
    },
}
