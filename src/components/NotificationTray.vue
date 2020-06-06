<template>
    <div ref="container" class="inline-block relative">
        <button
            v-if="items.length"
            class="nav-item notification-tray__button"
            @click="showNotificationTray = !showNotificationTray"
        >
            <icon-notification class="w-6 h-6 fill-current"></icon-notification>
            <span
                class="absolute right-0 top-0 text-xs rounded-full bg-red-600 text-white w-4 h-4"
                >{{ items.length }}</span
            >
        </button>
        <ul
            v-if="showNotificationTray"
            class="border bg-white shadow-xl w-64 h-auto absolute top-0 right-0 transform translate-y-10 rounded align-left"
        >
            <li class="px-4 py-1 text-sm text-gray-900 border-b font-bold">
                Nearly due
            </li>
            <li v-for="item of items" :key="item.id">
                <router-link
                    :to="`/page/${item.parent_id}`"
                    class="px-4 py-2 flex justify-between items-center"
                >
                    <span class="truncate">{{ item.title || item.text }}</span>
                    <span class="ml-2 text-xs text-gray-700 w-20 text-right">{{
                        formatDueDate(item.due_date)
                    }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { isElementContainedByOther } from '@/lib/utils'
import { AnyDomainItem } from '@/models/types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Component, Prop, Vue } from 'vue-property-decorator'
import IconNotification from '../assets/icons/icon-notification.svg'

@Component({
    components: { IconNotification },
})
export default class NotificationTray extends Vue {
    @Prop(Array) readonly items!: (AnyDomainItem & { due_date: Date })[]
    protected showNotificationTray = false

    protected formatDueDate(dueDate: Date) {
        return formatDistanceToNow(dueDate)
    }

    protected created() {
        document.addEventListener('click', this.handlePageClick)
    }

    protected beforeDestroy() {
        document.removeEventListener('click', this.handlePageClick)
    }

    private handlePageClick(event: MouseEvent) {
        const target = event.target as Element
        if (!isElementContainedByOther(this.$refs.container as Node, target)) {
            this.showNotificationTray = false
        }
    }
}
</script>

<style scoped>
.notification-tray__button {
    @apply text-gray-800 align-top relative p-1;
}

.notification-tray__button:hover {
    @apply text-black;
}
</style>
