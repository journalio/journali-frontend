<template>
    <div class="flex flex-col">
        <label class="text-sm text-gray-800" for="page-name">
            Create page
        </label>
        <div class="flex items-end justify-between">
            <input
                id="page-name"
                v-model="pageName"
                autocomplete="off"
                class="h-8 mr-2 mt-1 outline-none border-b border-transparent focus:border-gray-500"
                placeholder="Random ideas"
                type="text"
            />
            <button
                v-show="isValid"
                :disabled="!isValid"
                class="rounded p-2 text-gray-900 bg-gray-200 font-bold uppercase"
                @click="addPage()"
            >
                <icon-send
                    class="w-5 h-5 stroke-current transform rotate-90"
                ></icon-send>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Page } from '@/models/entities'
import { ItemType } from '@/models/types'
import { Component, Emit, Vue } from 'vue-property-decorator'
import IconSend from '../assets/icon-send.svg'

@Component({
    components: { IconSend },
})
export default class PageAdder extends Vue {
    pageName = ''

    get isValid() {
        return this.pageName.length > 2
    }

    @Emit('add:page')
    async addPage() {
        const page: Page = {
            item_type: ItemType.PAGE,
            title: this.pageName,
        }
        const pageId = (await this.$store.dispatch('createPage', page)).id
        this.pageName = ''
        return pageId
    }
}
</script>
