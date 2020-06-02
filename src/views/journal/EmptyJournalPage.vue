<template>
    <div class="flex items-center justify-center flex-col">
        <component :is="placeholder.icon" class="w-48 h-48"></component>
        <p class="mb-8 text-gray-700" v-html="placeholder.text"></p>

        <p>Select a page on the left to begin.</p>
    </div>
</template>

<script lang="ts">
import items, { randomPlaceholder } from '@/lib/random-placeholder'
import { VueClass } from 'vue-class-component/lib/declarations'
import { Component, Vue } from 'vue-property-decorator'

type DynamicImportDefinition = Record<string, () => Promise<VueClass<Vue>>>
const components = items.reduce((all, curr) => {
    all[curr.icon] = () =>
        import(`../../assets/icons/placeholder-${curr.icon}.svg`)
    return all
}, {} as DynamicImportDefinition)

@Component({
    components,
})
export default class EmptyJournalPage extends Vue {
    placeholder = randomPlaceholder()
}
</script>
