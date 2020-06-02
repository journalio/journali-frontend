<template>
    <header
        class="w-full h-20 px-4 py-6 flex items-baseline bg-white shadow-md z-20"
    >
        <router-link
            to="/"
            class="text-bold text-2xl font-display text-primary"
        >
            Journali
        </router-link>
        <div class="flex-1"></div>
        <nav>
            <router-link
                class="nav-item text-gray-800 hover:text-black"
                to="/user-settings"
            >
                <icon-user class="nav-icon"></icon-user>
                User Settings
            </router-link>
            <router-link
                class="nav-item text-red-600 hover:text-red-700"
                to="/logout"
            >
                <icon-door-exit class="nav-icon"></icon-door-exit>
                Logout
            </router-link>
        </nav>
    </header>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import IconUser from '../assets/icons/icon-user.svg'
import IconDoorExit from '../assets/icons/icon-door-exit.svg'
import store from '@/store'

@Component({
    components: { IconUser, IconDoorExit },
})
export default class JournaliHeader extends Vue {
    logout() {
        store.commit('logout')
    }
}
</script>

<style scoped>
.nav-item {
    @apply mx-4 inline-flex items-center;
}

.nav-icon {
    @apply w-4 h-4 mr-2 fill-current;
}
</style>
