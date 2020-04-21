import VueRouter from 'vue-router'

/*
 * Global app route definitions.
 * Use the dynamic import statements for automatic code splitting
 */
const routes = [
    { path: '', component: () => import('./views/IndexPage') },
    { path: '/hello', component: () => import('./views/HelloPage') },
]

export const createRouter = () =>
    new VueRouter({
        mode: 'history',
        routes,
    })

export default routes
