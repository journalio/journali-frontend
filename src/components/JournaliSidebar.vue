<template>
    <div class="w-64 bg-white shadow px-4 py-8 z-10">
        <div class="text-sm mb-1 text-gray-700">Pages</div>
        <page-adder />
        <pages-list :pages="pages"></pages-list>
        <hr />
    </div>
</template>

<script lang="ts">
import PagesList from '@/components/PagesList.vue'
import PageAdder from '@/components/PageAdder.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { PagesList, PageAdder },
})
export default class JournaliSidebar extends Vue {
    get pages() {
        return this.$store.state.pages
    }

    protected mounted() {
        this.$store.dispatch('loadPages')
    }
}
</script>
