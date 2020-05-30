<template>
    <div class="flex flex-row items-end">
        <text-input
            v-model="pageName"
            autocomplete="off"
            class="flex-1"
            label="Create page"
            placeholder="Random ideas"
            type="text"
        />

        <button
            :class="{ 'bg-gray-200': !isValid, 'bg-primary': isValid }"
            :disabled="!isValid"
            class="rounded p-2 text-white font-bold uppercase ml-4 outline-none focus:bg-primary-dark"
            @click="addPage()"
        >
            <icon-send
                class="w-5 h-5 stroke-current transform rotate-90"
            ></icon-send>
        </button>
    </div>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue'
import { Page } from '@/models/entities'
import { ItemType } from '@/models/types'
import { Component, Emit, Vue } from 'vue-property-decorator'
import IconSend from '../assets/icons/icon-send.svg'

@Component({
    components: { TextInput, IconSend },
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
        const pageId = (await this.$store.dispatch('createItem', page)).id
        this.pageName = ''
        return pageId
    }
}
</script>
