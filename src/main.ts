import Vue from 'vue'
import App from './App.vue'

import './assets/tailwind.css'
import router from './router'
import store from './store'
import HttpHelper from './lib/HttpHelper'

console.log(
    `Running version "${process.env.VUE_APP_VERSION}" in "${process.env.NODE_ENV}"`,
)

// Helps TS to understand the nemly added type
// may need some polishing: https://vuejs.org/v2/guide/typescript.html
declare module 'vue/types/vue' {
    interface Vue {
        $http: HttpHelper
    }
}

// add library to Vue globally
Vue.prototype.$http = new HttpHelper()

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
