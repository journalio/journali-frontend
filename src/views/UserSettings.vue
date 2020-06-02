<template>
    <form
        class="flex flex-col items-center bg-white p-4"
        @submit.prevent="save()"
    >
        <text-input
            v-model="username"
            type="text"
            name="username"
            label="Username"
        />

        <text-input
            v-model="password"
            type="password"
            name="password"
            label="New password"
            autocomplete="new-password"
        />

        <text-input
            v-model="passwordConfirm"
            type="password"
            name="password-confirm"
            label="Confirm password"
            autocomplete="new-password"
        />

        <input
            class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
            type="submit"
            value="Save"
            :disabled="!saveable"
        />
    </form>
</template>
<script lang="ts">
import TextInput from '@/components/TextInput.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: { TextInput },
})
export default class UserSettings extends Vue {
    protected username = this.storeUser.username
    protected password = ''
    protected passwordConfirm = ''

    // represents existing userdata
    get storeUser() {
        return this.$store.state.users.user
    }

    get saveable(): boolean {
        // Password requirements are at least six characters and should be confirmed
        return (
            this.username.length > 2 &&
            this.password.length > 6 &&
            this.passwordConfirm === this.password
        )
    }

    save() {
        if (!this.saveable) {
            return
        }
        this.$store.dispatch('users/updateUser', {
            id: this.storeUser.id,
            username: this.username,
            password: this.password,
        })
    }
}
</script>
