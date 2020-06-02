import store from '@/store'
import EmptyJournalPage from '@/views/journal/EmptyJournalPage.vue'
import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(
                /* webpackChunkName: "authentication" */ '../views/Login.vue'
            ),
    },
    {
        path: '/register',
        name: 'Registration',
        component: () =>
            import(
                /* webpackChunkName: "authentication" */ '../views/Registration.vue'
            ),
    },
    {
        path: '/logout',
        redirect: () => {
            store.commit('logout')
            return '/login'
        },
    },
    {
        path: '/',
        name: 'Home',
        component: () =>
            import(
                /* webpackChunkName: "journali" */
                '../views/JournaliShell.vue'
            ),
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
                path: 'user-settings',
                name: 'UserSettings',
                component: () => import('../views/UserSettings.vue'),
            },
            {
                path: '*',
                component: EmptyJournalPage,
            },
        ],
    },
]

export default routes
