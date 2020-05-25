<template>
    <div
        class="w-screen h-screen flex items-center justify-center bg-gray-200 login-background"
    >
        <form
            class="flex flex-col bg-white rounded shadow p-8"
            @submit.prevent="register()"
        >
            <icon-book-closed class="-mt-32"></icon-book-closed>
            <h1 class="text-2xl mb-2 font-display">Greetings!</h1>

            <p class="text-sm text-gray-600 w-56 mt-2 mb-1">
                Please fill in a username and password to create an account.
            </p>

            <text-input
                v-model="username"
                class="my-2"
                placeholder="John Doe"
                label="Username"
                type="username"
                name="username"
            />
            <text-input
                v-model="password"
                class="my-2"
                placeholder="hunter2"
                label="Password"
                type="password"
                name="password"
            />

            <button
                class="my-4 text-sm rounded px-4 py-2 bg-primary text-white font-bold uppercase"
                type="submit"
                :disabled="!submittable"
            >
                Sign up
            </button>
            <router-link
                class="text-sm mx-auto text-gray-600 hover:text-gray-800"
                to="/login"
            >
                Sign in using an existing account
            </router-link>
        </form>
    </div>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue'
import { Component, Vue } from 'vue-property-decorator'
import IconBookClosed from '../assets/icons/icon-book-closed.svg'

@Component({
    components: { TextInput, IconBookClosed },
})
export default class Registration extends Vue {
    username = ''
    password = ''

    get submittable(): boolean {
        return this.username.length > 4 && this.password.length > 6
    }

    async register() {
        await this.$store.dispatch('register', {
            username: this.username,
            password: this.password,
        })
        return this.$router.push('login')
    }
}
</script>

<style scoped>
.icon-book-closed {
    @apply fill-current text-accent;
    filter: drop-shadow(0 0 0 white);
}

.icon-book-closed .secondary {
    @apply opacity-75;
}
</style>
