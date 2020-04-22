<template>
    <button class="button is-primary" @click="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class MyButton extends Vue {
    @Emit('click')
    public onClick() {
        // empty
    }
}
</script>

<style scoped>
button {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    background-color: #ffffff;
    cursor: pointer;
    font-size: 15pt;
    padding: 3px 10px;
    margin: 10px;
}
</style>
