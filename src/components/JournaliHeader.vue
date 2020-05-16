<template>
    <header class="w-full h-20 px-4 py-6 flex bg-white shadow-md z-10">
        <h1 class="text-bold text-xl">Journali</h1>
        <div class="flex-1"></div>
        <button @click="logout">Logout</button>
    </header>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'

@Component
export default class TextInput extends Vue {
    logout() {
        store.commit('logout')
        this.$router.push('/login')
    }
}
</script>
