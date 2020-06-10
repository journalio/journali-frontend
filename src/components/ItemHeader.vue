<template>
    <div :class="{ visible: visible }" class="edit-bar">
        <button
            class="edit-icon"
            title="Toggle edit"
            @click.stop.prevent="$emit('toggle:edit-mode')"
        >
            <icon-edit class="fill-current"></icon-edit>
        </button>
        <tag-list
            :tags="tags"
            @show:tags="$emit('show:tags', $event)"
            @create:tag="$emit('create:tag', $event)"
            @delete:tag="$emit('delete:tag', $event)"
        />
        <button
            class="trash-icon"
            title="Delete item"
            @click.stop.prevent="$emit('delete')"
        >
            <icon-trash class="fill-current"></icon-trash>
        </button>
    </div>
</template>

<script lang="ts">
import IconEdit from '@/assets/icons/icon-edit.svg'
import IconTrash from '@/assets/icons/icon-trash.svg'
import TagList from '@/components/TagList.vue'
import { Tag } from '@/models/entities'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ components: { IconEdit, IconTrash, TagList } })
export default class ItemHeader extends Vue {
    @Prop(Array) readonly tags!: Tag[]
    @Prop(Boolean) readonly visible!: boolean
}
</script>

<style scoped>
.edit-bar {
    @apply p-4 pb-2 flex flex-row justify-end bg-white absolute right-0 top-0 opacity-0 transition duration-100 ease-out rounded-t cursor-move;
}

.edit-bar.visible {
    @apply opacity-100;
}

.edit-icon,
.trash-icon {
    @apply w-6 h-6 p-1 cursor-pointer;
}

.trash-icon {
    @apply text-red-600;
}

.trash-icon:hover {
    @apply text-red-700;
}
</style>
