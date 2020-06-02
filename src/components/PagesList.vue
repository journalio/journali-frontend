<template>
    <nav class="flex flex-col">
        <router-link
            v-for="page of pages"
            :key="page.id"
            :to="`/page/${page.id}`"
            active-class="text-black font-bold bg-gray-100"
            class="page-item"
        >
            <div class="mr-2 w-56 truncate">{{ page.title }}</div>
            <button
                class="trash-icon"
                @click.stop.prevent="$emit('delete', page)"
            >
                <icon-trash class="fill-current"></icon-trash>
            </button>
        </router-link>
    </nav>
</template>

<script lang="ts">
import { Page } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import IconTrash from '../assets/icons/icon-trash.svg'

@Component({
    components: { IconTrash },
})
export default class PagesList extends Vue {
    @Prop(Array) readonly pages!: Page[]
}
</script>

<style scoped>
.page-item {
    @apply flex flex-row items-center py-3 text-gray-900 px-4;
}

.trash-icon {
    @apply ml-auto w-6 h-6 p-1 opacity-0 transition-opacity duration-100 ease-out text-red-600;
}

.trash-icon:hover {
    @apply text-red-700;
}

.page-item:hover > .trash-icon {
    @apply opacity-100;
}
</style>
