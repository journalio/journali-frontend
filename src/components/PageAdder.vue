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
import { Component, Vue } from 'vue-property-decorator'
import ItemsClient from '@/lib/http/ItemsClient'
import Page from '@/models/Page'
import { ItemType } from '@/models'

const client = new ItemsClient()

@Component
export default class PageAdder extends Vue {
    addMode = false
    pageName = ''

    addPage() {
        const page: Page = {
            id: 'kek',
            item_type: ItemType.PAGE,
            title: this.pageName,
        }
        client.createPage(page).then((res) => {
            if (res) {
                this.$emit('pageAdded', res)
            }
        })
    }
}
</script>
