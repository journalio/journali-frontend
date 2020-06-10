<template>
    <div
        class="w-screen h-screen flex items-center justify-center bg-gray-200 login-background"
    >
        <form
            class="flex flex-col bg-white rounded shadow py-8 px-16"
            @submit.prevent="login()"
        >
            <icon-book-open class="-mt-32 fill-inherit"></icon-book-open>
            <h1 class="text-2xl mb-2 font-display">Welcome back</h1>

            <p class="text-sm text-gray-600 w-64 mt-2 mb-1">
                Enter your username and password to sign in.
            </p>

            <text-input
                v-model="username"
                class="my-2"
                label="Username"
                type="username"
                name="username"
                placeholder="John Doe"
            />
            <text-input
                v-model="password"
                class="my-2"
                label="Password"
                name="password"
                type="password"
                placeholder="hunter2"
            />

            <button
                class="my-4 text-sm rounded px-4 py-2 bg-primary text-white font-bold uppercase"
                type="submit"
            >
                Sign in
            </button>
            <router-link
                class="text-sm mx-auto text-gray-600 hover:text-gray-800"
                to="/register"
            >
                Create an account
            </router-link>
        </form>
    </div>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue'
import { Component, Vue } from 'vue-property-decorator'
import IconBookOpen from '../assets/icons/icon-book-open.svg'

@Component({
    components: { TextInput, IconBookOpen },
})
export default class Home extends Vue {
    username = ''
    password = ''

    async login() {
        const credentials = {
            username: this.username,
            password: this.password,
        }

        const success = await this.$store.dispatch('users/login', credentials)

        if (success) {
            await this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.icon-book-open {
    @apply text-accent;
    filter: drop-shadow(0 0 0 white);
}

.icon-book-open .secondary {
    @apply opacity-75;
}
</style>
