import Vue from 'vue'
import App from './App.vue'

import './assets/tailwind.css'
import router from './router'
import store from './store'

console.log(
    `Running version "${process.env.VUE_APP_VERSION}" in "${process.env.NODE_ENV}"`,
)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
