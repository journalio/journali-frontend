import { User } from '@/models/entities'
import { AnyDomainItem, ItemType, Uuid } from '@/models/types'
import actions from '@/store/actions'
import { JOURNALI_TOKEN } from '@/store/constants'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    user: User | null
    userLoading: boolean
    token: string | null
    items: AnyDomainItem[]
    itemsLoading: boolean
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: null,
        userLoading: false,
        token: localStorage.getItem(JOURNALI_TOKEN) || null,
        items: [],
        itemsLoading: false,
    },
    mutations: {
        loadItems(state) {
            state.itemsLoading = true
        },
        itemsLoaded(state, items: AnyDomainItem[]) {
            state.items = items
            state.itemsLoading = false
        },
        login(state, token) {
            localStorage.setItem(JOURNALI_TOKEN, token)
            state.token = token
        },
        logout(state) {
            localStorage.clear()
            state.user = null
            state.token = null
        },
        addItem(state, item: AnyDomainItem) {
            state.items.push(item)
        },
        isLoadingUser(state, loading: boolean) {
            state.userLoading = loading
        },
        userLoaded(state, user: User) {
            state.user = user
            state.userLoading = false
        },
        updateItem(state, item: AnyDomainItem) {
            const itemIndex = state.items.findIndex((i) => i.id === item.id)!
            Vue.set(state.items, itemIndex, {
                ...state.items[itemIndex],
                ...item,
            })
        },
        deleteItem(state, item: AnyDomainItem) {
            const itemIndex = state.items.findIndex((i) => i.id === item.id)!
            state.items.splice(itemIndex, 1)
        },
    },
    getters: {
        getItemsByParent: (state) => (id: Uuid): AnyDomainItem[] =>
            state.items.filter((item) => item.parent_id === id),
        getItemsByType: (state) => (item_type: ItemType): AnyDomainItem[] =>
            state.items.filter((item) => item.item_type === item_type),
    },
    actions,
    modules: {},
})

export default store
