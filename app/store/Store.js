import Vuex from 'vuex'

const store = {
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count = state.count + 1
        },
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        },
    },
    getters: {
        count: (state) => state.count,
    },
}

export default store

export const createStore = () => new Vuex.Store(store)
