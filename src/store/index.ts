import { Item, Page } from '@/models/entities'
import { Uuid } from '@/models/types'
import actions from '@/store/actions'
import { JOURNALI_TOKEN } from '@/store/constants'
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
        // Used when adding pages rather than refreshing
        pagesAdded(state, pages: Array<Page> | Page) {
            state.pagesLoading = false

            if (pages instanceof Array) {
                Array.prototype.push.apply(state.pages, pages)
                return
            }
            state.pages.push(pages)
        },
        deletePage(state, pageToDelete) {
            const pageIndex = state.pages
                .map((page) => {
                    return page.id
                })
                .indexOf(pageToDelete.id)

            // Remove page
            state.pages.splice(pageIndex, 1)
        },
        login(state, user) {
            localStorage.setItem(JOURNALI_TOKEN, user)
            state.user = user
        },
        logout(state) {
            localStorage.setItem(JOURNALI_TOKEN, '')
            state.user = null
        },
        addItem(state, item) {
            state.items.push(item)
        },
    },
    getters: {
        getPageById: (state) => (id: Uuid) =>
            state.pages.find((page) => page.id === id),
        getItemsByParent: (state) => (id: Uuid) =>
            state.items.filter((item) => item.parent_id === id),
    },
    actions,
    modules: {},
})

export default store
