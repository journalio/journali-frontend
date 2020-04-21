<template>
    <button
        @click="$emit('click', $event)"
        class="rounded bg-blue-600 hover:bg-blue-800 py-1 px-4 text-white"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TestButton',
}
</script>
