<template>
    <div class="flex flex-row w-full overflow-x-scroll">
        <div v-for="(tag, tagIndex) in tags" :key="tagIndex" class="tag">
            {{ tag.name }}
            <button class="trash-icon" title="Delete item">
                <icon-trash class="fill-current"></icon-trash>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Tag } from '@/models/entities'
import IconTrash from '@/assets/icons/icon-trash.svg'

@Component({
    components: { IconTrash },
})
export default class TagList extends Vue {
    @Prop(Array) readonly tags!: Tag[]
}
</script>

<style scoped>
.tag {
    @apply flex flex-row pl-2 pr-1 mx-1 bg-red-600 bg-opacity-75 rounded-full text-sm;
}
.trash-icon {
    @apply w-5 h-5 p-1 cursor-pointer;
}
</style>
