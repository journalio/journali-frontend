import { JOURNALI_TOKEN } from '@/constants'
import { Uuid } from '@/models'
import Item from '@/models/Item'
import Page from '@/models/Page'
import actions from '@/store/actions'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    user: string | null
    pages: Page[]
    items: Record<Uuid, Item[]>
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: localStorage.getItem(JOURNALI_TOKEN),
        pages: [],
        items: {},
    },
    mutations: {
        pageLoaded(state, { pageId, items }) {
            Vue.set(state.items, pageId, items)
        },
        pagesLoaded(state, pages) {
            state.pages = pages
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
        getPageItems: (state) => (id: Uuid) => state.items[id],
    },
    actions,
    modules: {},
})

export default store
