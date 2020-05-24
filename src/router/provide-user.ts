import store from '@/store'
import { VueRouter } from 'vue-router/types/router'

const register = (router: VueRouter) =>
    router.beforeEach(async (to, from, next) => {
        const { user } = store.state

        if (!user) {
            await store.dispatch('loadAuthenticatedUser')
        }

        next()
    })

export default register
