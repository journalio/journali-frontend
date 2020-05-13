<template>
    <div class="home">
        <form class="flex flex-col items-center" @submit.prevent="login()">
            <label for="username">Username</label>
            <input
                v-model="username"
                type="test"
                name="username"
                class="text-black bg-gray-200 px-2 py-1 border-2 rounded"
            />

            <label for="password">Password</label>
            <input
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
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'

@Component // ({ TODO: remove this note once you get used to TS in vue
//     components: { HelloWorld },
// })
export default class Home extends Vue {
    username = ''
    password = ''

    async login() {
        const credentials = {
            username: this.username,
            password: this.password,
        }

        this.$http
            .auth(credentials)
            .then(async res => {
                // console.log(data)
                const data = await res.json()
                if (data && data.token) {
                    // TODO: encapsulate this properly
                    this.$router.push('hello-world')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    toRegistration() {
        this.$router.push('register')
    }
}
</script>
