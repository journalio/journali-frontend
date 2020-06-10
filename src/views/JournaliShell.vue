<script lang="ts">
import JournaliContent from '@/components/JournaliContent.vue'
import JournaliHeader from '@/components/JournaliHeader.vue'
import JournaliSidebar from '@/components/JournaliSidebar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { JournaliHeader, JournaliSidebar, JournaliContent },
})
export default class JournaliShell extends Vue {
    protected created() {
        this.$store.dispatch('loadAllItems')
        this.$store.dispatch('loadAllTags')
    }
}
</script>

<template>
    <div class="h-screen bg-gray-200 flex flex-col">
        <journali-header></journali-header>
        <div class="flex flex-1">
            <journali-sidebar></journali-sidebar>
            <journali-content></journali-content>
        </div>
    </div>
</template>
