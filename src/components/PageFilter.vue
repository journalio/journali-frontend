<template>
    <div class="flex flex-row items-end">
        <text-input
            v-model="keyWord"
            autocomplete="off"
            class="flex-1"
            label="Search"
            placeholder="Key words"
            type="search"
            @input="filterEntities()"
        />
    </div>
</template>
<script lang="ts">
import { Page } from '@/models/entities'
import { Vue, Emit, Component, Prop } from 'vue-property-decorator'
import TextInput from '@/components/TextInput.vue'

// checks every string property in any given object to check if it contains a substring
// doesn't check objects inside arrays, like child items
const matchByAnyProperty = (obj: object, keyWord: string) => {
    const matchingProps = Object.keys(obj).filter((prop) => {
        return (
            typeof obj[prop] === 'string' &&
            obj[prop].toLowerCase().includes(keyWord.toLowerCase())
        )
    })
    return matchingProps.length > 0
}

@Component({
    components: { TextInput },
})
export default class PageFilter extends Vue {
    @Prop(Array) readonly pages!: Page[]

    keyWord = ''

    @Emit('resultsFound')
    private filterEntities() {
        if (this.keyWord.length === 0) {
            return this.pages
        }

        return this.pages.filter((page: object) =>
            matchByAnyProperty(page, this.keyWord),
        )
    }
}
</script>
