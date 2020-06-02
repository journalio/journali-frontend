import store from '@/store'
import { NavigationGuardNext, Route, VueRouter } from 'vue-router/types/router'

const register = (router: VueRouter) =>
    router.beforeEach(
        async (to: Route, from: Route, next: NavigationGuardNext) => {
            const { user, token } = store.state.users!

            if (!user && token) {
                await store.dispatch('users/loadAuthenticatedUser')
            }

            next()
        },
    )

export default register
