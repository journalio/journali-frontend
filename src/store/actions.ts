import ItemsClient from '@/lib/http/ItemsClient'
import UsersClient from '@/lib/http/UsersClient'
import { NewItem, Page } from '@/models'
import { User } from '@/models/entities'
import { Uuid } from '@/models/types'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()
const usersClient = new UsersClient()

type ActionHandler = ActionContext<AppState, AppState>

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
    async deletePage({ commit }: ActionHandler, page: Page) {
        await itemsClient.deleteItem(page)
        // TODO: add error handling, cuz we shouldn't remove an item from the store when deleting it failed
        commit('deletePage', page)
    },
    async updateUser({ commit }: ActionHandler, user: User) {
        commit('updateUser')
        const updatedUser = await usersClient.updateUser(user)
        // TODO: add error handling, cuz we shouldn't remove an item from the store when deleting it failed
        commit('userUpdated', updatedUser)
        return updatedUser
    },
}
