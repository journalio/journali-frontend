<template>
    <header
        class="w-full h-20 px-4 py-6 flex items-baseline bg-white shadow-md z-20"
    >
        <h1 class="text-bold text-2xl font-display text-primary">Journali</h1>
        <div class="flex-1"></div>
        <nav>
            <router-link class="nav-item" to="/user-settings">
                <icon-user class="nav-icon"></icon-user>
                User Settings
            </router-link>
            <router-link class="nav-item" to="/logout">
                <icon-door-exit class="nav-icon"></icon-door-exit>
                Logout
            </router-link>
        </nav>
    </header>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import IconUser from '../assets/icons/icon-user.svg'
import IconDoorExit from '../assets/icons/icon-door-exit.svg'
import store from '@/store'

@Component({
    components: { IconUser, IconDoorExit },
})
export default class JournaliHeader extends Vue {
    currentPageName = null

    logout() {
        store.commit('logout')
    }

    @Watch('$route')
    setCurrentPageName() {
        const { pageId } = this.$router.currentRoute.params
        this.currentPageName = this.$store.getters.getPageById(pageId)?.title
    }
}
</script>

<style scoped>
.nav-item {
    @apply mx-4 text-gray-800 inline-flex items-center;
}

.nav-item:hover {
    @apply text-black;
}

.nav-icon {
    @apply w-4 h-4 mr-2;
}
</style>
