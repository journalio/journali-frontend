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
                component: () =>
                    import('../containers/JournalPageContainer.vue'),
            },
            {
                path: 'page/:pageId/create',
                name: 'createItem',
                component: () =>
                    import('../containers/CreateItemPageContainer.vue'),
            },
            {
                path: '*',
                component: EmptyJournalPage,
            },
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
