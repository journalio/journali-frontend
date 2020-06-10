import ItemsClient from '@/lib/http/ItemsClient'
import TagsClient from '@/lib/http/TagsClient'
import { debounce, stringToColor } from '@/lib/utils'
import { NewItem } from '@/models'
import { Common, Item, Renderable, Tag } from '@/models/entities'
import { AnyDomainItem, ItemType, Uuid } from '@/models/types'
import { AppState } from '@/store/index'
import { ActionContext } from 'vuex'

const itemsClient = new ItemsClient()
const tagsClient = new TagsClient()

type ActionHandler = ActionContext<AppState, AppState>
type CreateTagRequest = {
    tag_name: string
    item_id: Uuid
    item_type: ItemType
}
type DeleteTagRequest = {
    tag: Tag
    item: Item
}

const updateItemDebounced = debounce<Item, Promise<[Item, Item]>>((item) =>
    Promise.all([
        itemsClient.updateItem(item),
        itemsClient.updateItemMeta(item),
    ]),
)

export default {
    async loadAllItems({ commit }: ActionHandler) {
        commit('loadItems')

        const items = await itemsClient.fetchAllItems()
        commit('itemsLoaded', items)
        return items
    },

    async createItem<T = AnyDomainItem>(
        { commit }: ActionHandler,
        item: NewItem,
    ) {
        const createdItem = await itemsClient.createItem<T>(item)
        commit('addItem', createdItem)
        return createdItem
    },

    async updateItem<T extends Item & Renderable>(
        { commit }: ActionHandler,
        item: T,
    ): Promise<Item> {
        commit('updateItem', item)
        const [updated, meta] = await updateItemDebounced(item)
        return {
            ...meta,
            ...updated,
        }
    },

    async deleteItem({ commit, getters }: ActionHandler, item: Item) {
        await itemsClient.deleteItem(item)
        commit('deleteItem', item)
        let children = getters.getItemsByParent(item.id, item.item_type)
        while (children.length) {
            const child = children.pop()
            children = children.concat(
                getters.getItemsByParent(child.id, child.item_type),
            )
            commit('deleteItem', item)
        }
    },

    async loadAllTags({ commit }: ActionHandler): Promise<Tag[]> {
        commit('loadTags')
        const tags = await tagsClient.fetchAllTags()
        commit('tagsLoaded', tags)
        return tags
    },

    async createTag(
        { commit, getters }: ActionHandler,
        payload: CreateTagRequest,
    ) {
        let tag: Tag = getters.getTagByName(payload.tag_name)
        if (tag) {
            // Validate that tag does not already have item
            const existingItemTags = getters.getTagsByItem(
                payload.item_id,
                payload.item_type,
            )
            if (existingItemTags.includes(tag)) {
                return
            }
        }
        if (!tag) {
            tag = await tagsClient.createTag({
                name: payload.tag_name,
                color: stringToColor(payload.tag_name),
            })
            commit('addTag', tag)
        }
        const items: Common[] = [
            {
                id: payload.item_id,
                item_type: payload.item_type,
            },
        ]
        await tagsClient.assignItems(tag, items)
        commit('updateTag', {
            ...tag,
            items: items.concat(tag.items || []),
        })
    },

    async deleteTag(
        { commit }: ActionHandler,
        { tag, item }: DeleteTagRequest,
    ) {
        await tagsClient.unassignItems(tag, [item])
        commit('updateTag', {
            ...tag,
            items: tag.items!.filter(
                (i) => i.id !== item.id && i.item_type !== item.item_type,
            ),
        })

        if (tag.items && tag.items.length === 1) {
            await tagsClient.deleteTag(tag)
            commit('deleteTag', tag)
        }
    },
}
