<template>
    <div class="Registration">
        <h1 class="text-3xl">Create an account</h1>
        <form class="flex flex-col items-center" @submit.prevent="register()">
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
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'

@Component // ({ TODO: remove this note once you get used to TS in vue
//     components: { HelloWorld },
// })
export default class Registration extends Vue {
    username = ''
    password = ''

    async register() {
        //Called this userdata instead of credentials because it could theoretically contain more than just the credentials in the future
        const userData = {
            username: this.username,
            password: this.password,
        }

        this.$http
            .post('register', userData)
            .then(async data => {
                const response = await data.json()

                console.log(response) // for dev purposes
                // TODO: add proper user feedback
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>
