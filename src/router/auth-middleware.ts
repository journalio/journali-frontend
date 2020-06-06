import store from '@/store'
import { NavigationGuardNext, Route, VueRouter } from 'vue-router/types/router'

const allowedRoutes = ['Login', 'Registration']

const register = (router: VueRouter) =>
    router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { token } = store.state.users!

        if (token === null && (!to.name || !allowedRoutes.includes(to.name))) {
            next({ name: 'Login' })
        } else {
            next()
        }
    })

export default register
