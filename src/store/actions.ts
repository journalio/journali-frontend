import ItemsClient from '@/lib/http/ItemsClient'
import UsersClient from '@/lib/http/UsersClient'
import { NewItem, Page } from '@/models'
import { User } from '@/models/entities'
import { debounce } from '@/lib/utils'
import { Item, Renderable } from '@/models/entities'
import { Uuid } from '@/models/types'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()
const usersClient = new UsersClient()

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

    async updateItem<T extends Item & Renderable>(
        { commit }: ActionHandler,
        item: T,
    ): Promise<Item> {
        commit('updateItem', item)
        return updateItemDebounced(item)
    },

    async deletePage({ commit }: ActionHandler, page: Page) {
        await itemsClient.deleteItem(page)
        commit('deletePage', page)
    },
    // TODO: consider expanding this into a general updateUser method that also checks if user.id === state.me.id
    async updateMe({ commit }: ActionHandler, user: User): Promise<User> {
        commit('updateMe')
        const updatedUser = await usersClient.updateUser(user)
        commit('meUpdated', updatedUser)
        return updatedUser
    },
}
