import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/JournaliShell.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Registration',
        component: () =>
            import(
                /* webpackChunkName: "registration" */ '../views/Registration.vue'
            ),
    },
]

export default routes
