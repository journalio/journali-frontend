import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import { createRouter } from './routes'
import { createStore } from './store/Store'

import JournaliApp from './JournaliApp'

import './style.css'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(JournaliApp),
})
