import { Tag } from '@/models/entities'
import { AnyDomainItem, ItemType, Uuid } from '@/models/types'
import actions from '@/store/actions'
import users, { UserState } from '@/store/users/index'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    items: AnyDomainItem[]
    itemsLoading: boolean
    tags: Tag[]
    tagsLoading: boolean
    users?: UserState
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        items: [],
        itemsLoading: false,
        tags: [],
        tagsLoading: false,
    },
    mutations: {
        loadItems(state) {
            state.itemsLoading = true
        },
        itemsLoaded(state, items: AnyDomainItem[]) {
            state.items = items
            state.itemsLoading = false
        },
        addItem(state, item: AnyDomainItem) {
            state.items.push(item)
        },
        updateItem(state, item: AnyDomainItem) {
            const itemIndex = state.items.findIndex((i) => i.id === item.id)

            if (itemIndex === undefined) {
                throw `Tried to update non-existant item: ${item}`
            }

            Vue.set(state.items, itemIndex, {
                ...state.items[itemIndex],
                ...item,
            })
        },
        deleteItem(state, item: AnyDomainItem) {
            const itemIndex = state.items.findIndex((i) => i.id === item.id)

            if (itemIndex === undefined) {
                throw `Tried to delete non-existant item: ${item}`
            }

            state.items.splice(itemIndex, 1)
        },
        loadTags(state) {
            state.tagsLoading = true
        },
        tagsLoaded(state, tags: Tag[]) {
            state.tags = tags
            state.tagsLoading = false
        },
        addTag(state, tag: Tag) {
            state.tags.push(tag)
        },
        updateTag(state, tag: Tag) {
            const tagIndex = state.tags.findIndex((t) => t.id === tag.id)

            if (tagIndex === undefined) {
                throw `Tried to update non-existant tag: ${tag}`
            }

            Vue.set(state.tags, tagIndex, {
                ...state.tags[tagIndex],
                ...tag,
            })
        },
        deleteTag(state, tag: Tag) {
            const tagIndex = state.tags.findIndex((t) => t.id === tag.id)

            if (tagIndex === undefined) {
                throw `Tried to delete non-existant tag: ${tag}`
            }

            state.tags.splice(tagIndex, 1)
        },
    },
    getters: {
        getItemsByParent: (state) => (
            id: Uuid,
            item_type: ItemType,
        ): AnyDomainItem[] =>
            state.items.filter(
                (item) =>
                    item.parent_id === id && item.parent_type === item_type,
            ),
        getItemsByType: (state) => (item_type: ItemType): AnyDomainItem[] =>
            state.items.filter((item) => item.item_type === item_type),

        getTagByName: (state) => (id: string): Tag | undefined =>
            state.tags.find((tag) => tag.name === id),
        getTagsByItem: (state) => (id: Uuid, item_type: ItemType): Tag[] =>
            state.tags.filter((tag) => {
                const index = tag.items?.findIndex(
                    (item) => item.id === id && item.item_type === item_type,
                )
                return index && index >= 0
            }),
    },
    actions,
    modules: {
        users,
    },
})

export default store
