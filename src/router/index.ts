import register from '@/router/auth-middleware'
import routes from '@/router/routes'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

register(router)

export default router
