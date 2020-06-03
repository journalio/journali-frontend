<template>
    <div class="flex flex-col">
        <div class="flex flex-row">
            <button
                class="edit-icon"
                title="Toggle edit"
                @click.stop.prevent="showTags = !showTags"
            >
                <icon-edit class="fill-current"></icon-edit>
            </button>
        </div>
        <div class="relative">
            <div v-if="showTags" class="tag-list-dropdown">
                <div
                    v-for="(tag, tagIndex) in tags"
                    :key="tagIndex"
                    class="tag"
                >
                    {{ tag.name }}
                    <button class="trash-icon" title="Delete item">
                        <icon-trash class="fill-current"></icon-trash>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Tag } from '@/models/entities'
import IconTrash from '@/assets/icons/icon-trash.svg'
import IconEdit from '@/assets/icons/icon-edit.svg'

@Component({
    components: { IconEdit, IconTrash },
})
export default class TagList extends Vue {
    @Prop(Array) readonly tags!: Tag[]

    private showTags = false
}
</script>

<style scoped>
.tag-list-dropdown {
    @apply absolute flex flex-row flex-wrap rounded bg-white shadow-md overflow-auto;
    max-height: 10rem;
}
.tag {
    @apply flex flex-row pl-2 pr-1 m-1 bg-red-500 rounded-full text-xs whitespace-no-wrap;
}
.edit-icon,
.trash-icon {
    @apply w-5 h-5 p-1 cursor-pointer;
}
</style>
