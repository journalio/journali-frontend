import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import routes from './routes'
import JournaliApp from './JournaliApp'
import Store from './store/store.js'
import './style.css'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

const store = new Vuex.Store(Store)

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(JournaliApp),
})
