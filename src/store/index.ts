import { Item, Page, User } from '@/models/entities'
import { Uuid } from '@/models/types'
import actions from '@/store/actions'
import { JOURNALI_TOKEN } from '@/store/constants'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    user: User
    userLoading: boolean
    token: string | null
    pages: Page[]
    pagesLoading: boolean
    items: Item[]
    itemsLoading: boolean
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: { username: '' },
        userLoading: false,
        token: localStorage.getItem(JOURNALI_TOKEN),
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
        deletePage(state, pageToDelete: Page) {
            state.pages = state.pages.filter(
                (page) => page.id !== pageToDelete.id,
            )
        },
        login(state, token) {
            localStorage.setItem(JOURNALI_TOKEN, token)
            state.token = token
        },
        logout(state) {
            localStorage.setItem(JOURNALI_TOKEN, '')
            state.token = null
        },
        addItem(state, item) {
            state.items.push(item)
        },
        updateUser(state) {
            // TODO: needs to be refactored
            state.userLoading = true
        },
        userUpdated(state, user) {
            state.user = user
            state.userLoading = false
        },
    },
    getters: {
        getPageById: (state) => (id: Uuid) =>
            state.pages.find((page) => page.id === id),
        getItemsByParent: (state) => (id: Uuid) =>
            state.items.filter((item) => item.parent_id === id),
        getUser: (state) => () => state.user,
    },
    actions,
    modules: {},
})

export default store
