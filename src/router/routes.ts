import EmptyJournalPage from '@/views/journal/EmptyJournalPage.vue'
import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/JournaliShell.vue'),
        children: [
            {
                path: 'page/:pageId',
                name: 'Page',
                component: () => import('../views/journal/JournalPage.vue'),
            },
            { path: '*', component: EmptyJournalPage },
        ],
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
