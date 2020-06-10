import '@/lib/class-component-hooks'
import { getApplicationInformation } from '@/lib/utils'

import Vue from 'vue'
import App from './App.vue'
import './assets/global.css'
import './assets/tailwind.css'

import router from './router'
import store from './store'

getApplicationInformation().then((info) => console.table(info))

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
