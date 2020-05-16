<template>
    <div class="flex-1 overflow-hidden flex items-center justify-center">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class JournaliHeader extends Vue {}
</script>
