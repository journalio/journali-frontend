import Vue from 'vue'
import Vuex from 'vuex'
import AppTitle from './AppTitle'

import './style.css'

Vue.use(Vuex)

new Vue({
    el: '#app',
    render: (h) => h(AppTitle),
})

// EErst even lokaal testen!!
