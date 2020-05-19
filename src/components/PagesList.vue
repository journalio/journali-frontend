<template>
    <nav class="flex flex-col">
        <router-link
            v-for="page of pages"
            :key="page.id"
            :to="`/page/${page.id}`"
            class="w-full py-3 text-gray-900"
            active-class="font-bold text-black"
        >
            {{ page.title }}
        </router-link>
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
