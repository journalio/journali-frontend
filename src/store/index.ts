import { JOURNALI_TOKEN } from '@/constants'
import Page from '@/models/Page'
import actions from '@/store/actions'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface AppState {
    user: string | null
    pages: Page[]
}

const store = new Vuex.Store<AppState>({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: localStorage.getItem(JOURNALI_TOKEN),
        pages: [],
    },
    mutations: {
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
    actions,
    modules: {},
})

export default store
