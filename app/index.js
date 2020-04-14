import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import JournaliApp from './JournaliApp'

import './style.css'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

new Vue({
    el: '#app',
    router,
    render: (h) => h(JournaliApp),
})
