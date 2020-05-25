import store from '@/store'
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
        path: '/logout',
        redirect: () => {
            store.commit('logout')
            return '/login'
        },
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
            {
                path: 'page/:pageId/create',
                name: 'createItem',
                component: () =>
                    import('../containers/CreateItemPageContainer.vue'),
            },
            {
                // TODO: putting the user settings page in the same place as containers may not be the right thing to do?
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
