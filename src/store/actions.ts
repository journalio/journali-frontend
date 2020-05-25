import ItemsClient from '@/lib/http/ItemsClient'
import UsersClient from '@/lib/http/UsersClient'
import { debounce } from '@/lib/utils'
import { NewItem, Page } from '@/models'
import { Item, Renderable, User } from '@/models/entities'
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
    async updateUser({ commit }: ActionHandler, user: User): Promise<User> {
        commit('isLoadingUser', true)
        const updatedUser = await usersClient.updateUser(user)
        commit('userLoaded', updatedUser)
        return updatedUser
    },

    async register({ commit }: ActionHandler, user: User): Promise<User> {
        commit('isLoadingUser', true) //TODO: remove after deadline
        const registeredUser = await usersClient.register(user)

        // only for making stuff work for the deadline. loadAuthenticatedUser should do this eventually
        commit('userLoaded', registeredUser) //TODO: remove after deadline
        return registeredUser
    },

    async loadAuthenticatedUser({ commit }: ActionHandler): Promise<User> {
        commit('isLoadingUser', true)
        const user = await usersClient.fetchAuthenticatedUser()
        commit('userLoaded', user)
        return user
    },
}
