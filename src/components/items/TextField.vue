<template>
    <div class="whitespace-pre" v-text="text" />
</template>

<script lang="ts">
import AbstractJournalItem from '@/components/items/AbstractJournalItem'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TextField extends AbstractJournalItem {
    @Prop(String) readonly text!: string
}
</script>
