import EmptyJournalPage from '@/views/journal/EmptyJournalPage.vue'
import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
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
            { path: '*', component: EmptyJournalPage },
        ],
    },
]

export default routes
