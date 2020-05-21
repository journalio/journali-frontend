<template>
    <div class="Registration">
        <h1 class="text-3xl">Create an account</h1>
        <form class="flex flex-col items-center" @submit.prevent="register()">
            <text-input
                v-model="credentials.username"
                label="Username"
                type="username"
                name="username"
            />
            <text-input
                v-model="credentials.password"
                label="Password"
                type="password"
                name="password"
            />

            <input
                class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
                type="submit"
                value="submit"
                :disabled="!submittable"
            />
        </form>
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
export default class Registration extends Vue {
    credentials = {
        username: '',
        password: '',
    }

    get submittable(): boolean {
        return !!this.credentials.username && !!this.credentials.password
    }

    async register() {
        const res = await client.register(this.credentials)
        if (res) this.$router.push('login')
    }
}
</script>
