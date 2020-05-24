import authMiddleware from '@/router/auth-middleware'
import provideUser from '@/router/provide-user'
import routes from '@/router/routes'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

authMiddleware(router)
provideUser(router)

export default router
