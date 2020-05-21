<template>
    <div
        class="flex-1 overflow-hidden flex items-center justify-center relative"
    >
        <router-view></router-view>
        <router-link
            v-if="currentPageId"
            :to="{ name: 'createItem', params: { pageId: currentPageId } }"
            active-class="hidden"
            class="absolute bottom-0 right-0 m-6 w-20 h-20 rounded-full shadow bg-gray-300 hover:bg-gray-500"
        >
            <icon-add></icon-add>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import IconAdd from '../assets/icon-add.svg'

@Component({
    components: { IconAdd },
})
export default class JournaliContent extends Vue {
    currentPageId: string | null = null

    mounted() {
        this.updatePageId()
    }

    @Watch('$route')
    updatePageId() {
        this.currentPageId = this.$route.params.pageId
    }
}
</script>
