import '@/lib/class-component-hooks'
import { getApiVersion } from '@/lib/utils'

import Vue from 'vue'
import App from './App.vue'
import './assets/global.css'
import './assets/tailwind.css'

import router from './router'
import store from './store'
;(async () => {
    const appVersion = process.env.VUE_APP_VERSION
    const appEnvironment = process.env.NODE_ENV
    const apiVersion = await getApiVersion()

    console.table({ appEnvironment, appVersion, apiVersion })
})()
console.log(
    `Running version "${process.env.VUE_APP_VERSION}" in "${process.env.NODE_ENV}"`,
)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
