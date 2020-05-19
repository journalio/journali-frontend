<template>
    <div>
        <form class="flex flex-col items-center" @submit.prevent="login()">
            <text-input
                v-model="username"
                label="Username"
                type="username"
                name="username"
            />
            <text-input
                v-model="password"
                label="Password"
                name="password"
                type="password"
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
import TextInput from '@/components/TextInput.vue'
import AuthenticationClient from '@/lib/http/AuthenticationClient'
import { Component, Vue } from 'vue-property-decorator'

const client = new AuthenticationClient()

@Component({
    components: { TextInput },
})
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
