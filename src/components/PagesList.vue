<template>
    <nav class="flex flex-col">
        <div
            v-for="page of pages"
            :key="page.id"
            class="flex flex-row py-3 text-gray-900"
        >
            <router-link
                :to="`/page/${page.id}`"
                active-class="font-bold text-black"
            >
                {{ page.title }}
            </router-link>
            <button @click="$emit('delete', page)">
                delete
            </button>
        </div>
    </nav>
</template>

<script lang="ts">
import { Page } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PagesList extends Vue {
    @Prop(Array) readonly pages!: Page[]
}
</script>
