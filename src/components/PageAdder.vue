<template>
    <div>
        <button @click="addMode = !addMode">
            New page
        </button>
        <input v-if="addMode" v-model="pageName" type="text" />
        <button v-if="addMode && pageName" @click="addPage()">Save</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { Page } from '@/models/entities'
import { ItemType } from '@/models/types'

@Component
export default class PageAdder extends Vue {
    addMode = false
    pageName = ''

    @Emit('add:page')
    async addPage() {
        const page: Page = {
            item_type: ItemType.PAGE,
            title: this.pageName,
        }
        return (await this.$store.dispatch('createPage', page)).id
    }
}
</script>
