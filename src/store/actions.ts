import ItemsClient from '@/lib/http/ItemsClient'
import TagsClient from '@/lib/http/TagsClient'
import { debounce } from '@/lib/utils'
import { NewItem } from '@/models'
import { Item, Renderable, Tag } from '@/models/entities'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()
const tagsClient = new TagsClient()

type ActionHandler = ActionContext<AppState, AppState>

const updateItemDebounced = debounce<Item, Promise<Item>>((item) =>
    itemsClient.updateItem(item),
)

export default {
    async loadAllItems({ commit }: ActionHandler) {
        commit('loadItems')

        const items = await itemsClient.fetchAllItems()
        commit('itemsLoaded', items)
    },

    async createItem<T>({ commit }: ActionHandler, item: NewItem) {
        const createdItem = await itemsClient.createItem<T>(item)
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

    async deleteItem({ commit }: ActionHandler, item: Item) {
        await itemsClient.deleteItem(item)
        commit('deleteItem', item)
    },

    async loadAllTags({ commit }: ActionHandler): Promise<Tag[]> {
        commit('loadTags')
        const tags = await tagsClient.fetchAllTags()
        commit('tagsLoaded', tags)
        return tags
    },
}
