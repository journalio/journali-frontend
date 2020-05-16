import Vue from 'vue'
import App from './App.vue'

import './assets/tailwind.css'
import AbstractHttpClient from './lib/http/AbstractHttpClient'
import router from './router'
import store from './store'

console.log(
    `Running version "${process.env.VUE_APP_VERSION}" in "${process.env.NODE_ENV}"`,
)

// add library to Vue globally
Vue.prototype.$http = new AbstractHttpClient()

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
