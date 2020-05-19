import { JOURNALI_TOKEN } from '@/constants'
import { ItemType, Uuid } from '@/models'
import Item from '@/models/Item'
import Page from '@/models/Page'
import actions from '@/store/actions'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    user: string | null
    pages: Page[]
    pagesLoading: boolean
    items: Item[]
    itemsLoading: boolean
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: localStorage.getItem(JOURNALI_TOKEN),
        pages: [],
        pagesLoading: false,
        items: [],
        itemsLoading: false,
    },
    mutations: {
        loadItems(state) {
            state.itemsLoading = true
        },
        loadPages(state) {
            state.pagesLoading = true
        },
        itemsLoaded(state, items) {
            state.items = items
            state.itemsLoading = false
        },
        pagesLoaded(state, pages) {
            state.pages = pages
            state.pagesLoading = false
        },
        login(state, user) {
            localStorage.setItem(JOURNALI_TOKEN, user)
            state.user = user
        },
        logout(state) {
            localStorage.setItem(JOURNALI_TOKEN, '')
            state.user = null
        },
    },
    getters: {
        getPageById: (state) => (id: Uuid) =>
            state.pages.find((page) => page.id === id),
        getItemsByParent: (state) => (id: Uuid) =>
            state.items.filter((item) => item.parent_id === id),
        getItemById: (state) => (id: Uuid, type: ItemType) =>
            state.items.filter(
                (item) => item.id === id && item.item_type === type,
            ),
    },
    actions,
    modules: {},
})

export default store
