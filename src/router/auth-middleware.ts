import store from '@/store'
import { VueRouter } from 'vue-router/types/router'

const allowedRoutes = ['Login', 'Registration']

const register = (router: VueRouter) =>
    router.beforeEach((to, from, next) => {
        const { user } = store.state
        if (!allowedRoutes.includes(to.name!) && !user) next({ name: 'Login' })
        else next()
    })

export default register
