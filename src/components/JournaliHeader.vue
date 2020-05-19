<template>
    <header
        class="w-full h-20 px-4 py-6 flex bg-white shadow-md z-10 leading-8"
    >
        <h1 class="text-bold text-xl">Journali</h1>
        <span v-if="currentPageName" class="text-gray-900 ml-6">
            <span class="font-bold">&gt;</span> {{ currentPageName }}
        </span>
        <div class="flex-1"></div>
        <button @click="logout">Logout</button>
    </header>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import store from '@/store'

@Component
export default class JournaliHeader extends Vue {
    currentPageName = null

    logout() {
        store.commit('logout')
        this.$router.push('/login')
    }

    @Watch('$route')
    setCurrentPageName() {
        const { pageId } = this.$router.currentRoute.params
        this.currentPageName = this.$store.getters.getPageById(pageId)?.title
    }
}
</script>
