import { JOURNALI_TOKEN } from '@/constants'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: localStorage.getItem(JOURNALI_TOKEN),
    },
    mutations: {
        login(state, user) {
            state.user = user
        },
    },
    actions: {},
    modules: {},
})

export default store
