<script>
export default {
    name: 'TestButton',
}
</script>

<template>
    <button
        class="rounded bg-blue-600 hover:bg-blue-800 py-1 px-4 text-white"
        @click="$emit('click', $event)"
    >
        <slot></slot>
    </button>
</template>
