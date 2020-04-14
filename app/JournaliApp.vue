<template>
    <div class="container mx-auto pt-4">
        <h1 class="font-bold text-3xl text-yellow-500 py-2">
            Journali is geweldig!!!
        </h1>

        <router-link to="/" class="text-yellow-500">
            Home
        </router-link>
        <span class="text-white">|</span>
        <router-link to="/hello" class="text-yellow-500">
            Hello
        </router-link>

        <router-view class="py-4 text-white"></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
