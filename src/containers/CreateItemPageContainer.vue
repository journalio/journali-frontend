<template>
    <main class="flex flex-col p-8 bg-white rounded">
        <h3 class="text-lg font-bold">Create item</h3>
        <label>
            Select an item type.
            <select v-model="itemType" @change="updateItem">
                <option v-if="!itemType" disabled selected>
                    Select an option
                </option>
                <option v-for="item of itemTypes" :key="item">
                    {{ item }}
                </option>
            </select>
        </label>
        <component
            :is="`${itemType}Editor`"
            v-if="itemType"
            v-model="item"
            @submit="createItem()"
        />
    </main>
</template>

<script lang="ts">
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import { createItemByName } from '@/models'
import { Renderable, renderableTypes } from '@/models/traits'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { TodoEditor, TextFieldEditor },
})
export default class CreateItemPageContainer extends Vue {
    itemType: Renderable | null = null
    item = {}

    get itemTypes() {
        return renderableTypes
    }

    updateItem() {
        if (this.itemType === null) {
            throw 'Itemtype should not be null at this point'
        }
        this.item = createItemByName(this.itemType)
    }

    createItem() {
        if (this.itemType === null) {
            throw 'ItemType should not be null at this point'
        }
        this.$store.dispatch('createItem', {
            page_id: this.$route.params.pageId,
            coord_x: 0,
            coord_y: 0,
            ...this.item,
        })
    }
}
</script>
