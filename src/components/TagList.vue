<template>
    <div :class="{ 'is-open': showTags }" class="z-10 relative rounded">
        <button
            class="ml-auto block edit-icon"
            title="Toggle edit"
            @click.stop.prevent="showTags = !showTags"
        >
            <icon-tag class="fill-current"></icon-tag>
        </button>
        <transition name="show">
            <div v-if="showTags" class="tag-list-dropdown">
                <div
                    v-for="(tag, tagIndex) in tags"
                    :key="tagIndex"
                    class="tag"
                >
                    <span class="tag-text">{{ tag.name }}</span>
                    <button class="remove-icon" title="Remove tag">
                        <icon-close class="fill-current"></icon-close>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import IconClose from '@/assets/icons/icon-close.svg'
import IconTag from '@/assets/icons/icon-tag.svg'
import { Tag } from '@/models/entities'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
    components: { IconTag, IconClose },
})
export default class TagList extends Vue {
    @Prop(Array) readonly tags!: Tag[]

    private showTags = false

    @Emit('tagsShowing')
    @Watch('showTags')
    protected emitShowTags() {
        return this.showTags
    }
}
</script>

<style scoped>
.tag-list-dropdown {
    @apply bg-white flex flex-row flex-wrap overflow-auto max-w-xs p-2 absolute top-0 right-0 transform translate-y-6;
    max-height: 10rem;
}

.tag {
    @apply flex flex-row pl-2 pr-1 m-1 bg-red-500 rounded-full;
}

.tag:hover .remove-icon {
    opacity: 1;
}

.tag-text {
    @apply text-xs whitespace-no-wrap overflow-hidden;
    max-width: 16rem;
}

.edit-icon {
    @apply w-6 h-6 p-1 cursor-pointer;
}

.remove-icon {
    @apply w-5 h-5 cursor-pointer opacity-0;
}

.show-enter-active,
.show-leave-active {
    transition: opacity 0.15s;
}

.show-enter,
.show-leave-to {
    opacity: 0;
}

.is-open {
    @apply rounded-b-none;
}
</style>
