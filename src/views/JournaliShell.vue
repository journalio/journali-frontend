<script lang="ts">
import JournaliContent from '@/components/JournaliContent.vue'
import JournaliHeader from '@/components/JournaliHeader.vue'
import JournaliSidebar from '@/components/JournaliSidebar.vue'

export default {
    components: { JournaliHeader, JournaliSidebar, JournaliContent },
}
</script>

<template>
    <div class="w-screen h-screen bg-gray-200 flex flex-col">
        <journali-header></journali-header>
        <div class="flex flex-1">
            <journali-sidebar></journali-sidebar>
            <journali-content></journali-content>
        </div>
    </div>
</template>
