import store from '@/store'
import { VueRouter } from 'vue-router/types/router'

const allowedRoutes = ['Login', 'Registration']

const register = (router: VueRouter) =>
    router.beforeEach((to, from, next) => {
        const { token } = store.state
        if (to.name && !allowedRoutes.includes(to.name) && token === null) {
            next({ name: 'Login' })
        } else {
            next()
        }
    })

export default register
