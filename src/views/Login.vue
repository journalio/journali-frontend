<template>
    <div>
        <form class="flex flex-col items-center" @submit.prevent="login()">
            <label for="username">Username</label>
            <input
                id="username"
                v-model="username"
                type="text"
                name="username"
                class="text-black bg-gray-200 px-2 py-1 border-2 rounded"
            />

            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                class="text-black bg-gray-200 px-2 py-1 border-2 rounded"
            />

            <input
                class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
                type="submit"
                value="submit"
            />
        </form>
        <button @click="toRegistration()">Create an account</button>
    </div>
</template>

<script lang="ts">
import AuthenticationClient from '@/lib/http/AuthenticationClient'
import { Component, Vue } from 'vue-property-decorator'

const client = new AuthenticationClient()

@Component
export default class Home extends Vue {
    username = ''
    password = ''

    async login() {
        const credentials = {
            username: this.username,
            password: this.password,
        }

        const success = await client.login(credentials)
        if (success) {
            await this.$router.push('/')
        }
    }

    toRegistration() {
        this.$router.push('/register')
    }
}
</script>
