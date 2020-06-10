<template>
    <header class="header">
        <router-link
            to="/"
            class="text-bold text-2xl font-display text-primary"
        >
            <icon-diary class="h-8 w-8 inline-block fill-current" />
            Journali
        </router-link>
        <div class="flex-1"></div>
        <nav>
            <notification-tray :items="nearlyDueItems" />
            <router-link
                class="nav-item text-gray-800 hover:text-black"
                to="/user-settings"
            >
                <icon-user class="nav-icon mr-2" />
                User Settings
            </router-link>
            <router-link
                class="nav-item text-gray-800 hover:text-black"
                to="/statistics"
            >
                <icon-diary class="nav-icon mr-2" />
                statistics
            </router-link>
            <router-link
                class="nav-item text-red-600 hover:text-red-700"
                to="/logout"
            >
                <icon-door-exit class="nav-icon mr-2" />
                Logout
            </router-link>
        </nav>
    </header>
</template>

<script lang="ts">
import NotificationTray from '@/components/NotificationTray.vue'
import { AnyDomainItem } from '@/models/types'
import { Component, Vue } from 'vue-property-decorator'
import IconDiary from '../assets/icons/icon-diary.svg'
import IconDoorExit from '../assets/icons/icon-door-exit.svg'
import IconUser from '../assets/icons/icon-user.svg'

@Component({
    components: { NotificationTray, IconUser, IconDoorExit, IconDiary },
})
export default class JournaliHeader extends Vue {
    get nearlyDueItems() {
        return this.$store.state.items
            .filter((item: AnyDomainItem) => !!item.due_date) // Clone the array before sorting
            .sort((a: { due_date: Date }, b: { due_date: Date }) => {
                return a.due_date.getTime() - b.due_date.getTime()
            })
            .slice(0, 5)
    }
}
</script>

<style scoped>
.header {
    @apply w-full h-20 px-4 py-6 flex items-baseline bg-white shadow-md z-20;
}

.nav-item {
    @apply mx-4 inline-flex items-center py-1;
}

.nav-icon {
    @apply w-4 h-4 fill-current;
}
</style>
