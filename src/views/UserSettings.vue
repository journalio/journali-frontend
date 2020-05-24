<template>
    <form
        class="flex flex-col items-center bg-white p-4"
        @submit.prevent="save()"
    >
        <text-input
            v-model="password"
            autocomplete="new-password"
            label="Password"
            type="password"
            name="password"
        />

        <text-input
            v-model="passwordConfirm"
            autocomplete="new-password"
            label="Confirm password"
            name="password-confirm"
            type="password"
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
    protected password = ''
    protected passwordConfirm = ''

    get saveable(): boolean {
        // Password requirements are at least six characters and should be confirmed
        return (
            this.password.length > 6 && this.passwordConfirm === this.password
        )
    }

    save() {
        if (!this.saveable) {
            return
        }
        this.$store.dispatch('updateUser', {
            password: this.password,
            passwordConfirm: this.passwordConfirm,
        })
    }
}
</script>
