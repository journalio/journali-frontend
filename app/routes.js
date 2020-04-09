/*
 * Global app route definitions.
 * Use the dynamic import statements for automatic code splitting
 */
const routes = [
    { path: '', component: () => import('./pages/IndexPage') },
    { path: '/hello', component: () => import('./pages/HelloPage') },
]

export default routes
