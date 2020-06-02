<template>
    <div
        class="flex-1 overflow-hidden flex items-center justify-center relative"
    >
        <router-view></router-view>
        <router-link
            v-if="currentPageId"
            :to="{ name: 'createItem', params: { pageId: currentPageId } }"
            active-class="hidden"
            class="absolute bottom-0 right-0 m-6 w-20 h-20 rounded-full shadow-lg bg-primary hover:bg-primary-dark text-white"
        >
            <icon-add class="fill-current"></icon-add>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconAdd from '../assets/icons/icon-add.svg'

@Component({
    components: { IconAdd },
})
export default class JournaliContent extends Vue {
    get currentPageId() {
        return this.$route.params.pageId
    }
}
</script>
