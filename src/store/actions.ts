import ItemsClient from '@/lib/http/ItemsClient'
import { debounce } from '@/lib/utils'
import { NewItem, Page } from '@/models'
import { Item, Renderable } from '@/models/entities'
import { Uuid } from '@/models/types'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()

type ActionHandler = ActionContext<AppState, AppState>

const updateItemDebounced = debounce<Item, Promise<Item>>((item) =>
    itemsClient.updateItem(item),
)

export default {
    async loadPages({ commit }: ActionHandler) {
        commit('loadPages')
        const pages = await itemsClient.fetchPages()
        commit('pagesLoaded', pages)
    },
    async createPage({ commit }: ActionHandler, data: Page) {
        commit('loadPages')
        const newPage = await itemsClient.createPage(data)
        commit('pagesAdded', newPage)
        return newPage
    },
    async loadItems({ commit }: ActionHandler, parentId: Uuid) {
        commit('loadItems')
        const items = await itemsClient.fetchItemsByParent(parentId)
        commit('itemsLoaded', items)
    },

    async createItem<T>({ commit }: ActionHandler, item: NewItem<T>) {
        const createdItem = await itemsClient.createItem(item)
        commit('addItem', createdItem)
        return createdItem
    },

    async updateItemPosition<T extends Renderable & Item>(
        { commit }: ActionHandler,
        payload: { item: T },
    ): Promise<Item> {
        const { item } = payload
        commit('updateItemPosition', payload)
        return updateItemDebounced(item)
    },

    async deletePage({ commit }: ActionHandler, page: Page) {
        await itemsClient.deleteItem(page)
        // TODO: add error handling, cuz we shouldn't remove an item from the store when deleting it failed
        commit('deletePage', page)
    },
}
