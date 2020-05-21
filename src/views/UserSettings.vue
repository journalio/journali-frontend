<template>
    <form
        class="flex flex-col items-center bg-white p-4"
        @submit.prevent="save()"
    >
        <text-input
            v-model="user.username"
            label="Username"
            type="username"
            name="username"
        />
        <text-input
            v-model="user.password"
            label="Password"
            type="password"
            name="password"
        />

        <input
            class="my-4 rounded px-4 py-1 bg-white text-gray-800 border-gray-800 border font-bold uppercase w-24"
            type="submit"
            value="Save"
        />
    </form>
</template>
<script lang="ts">
import TextInput from '@/components/TextInput.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { User } from '@/models/entities'

@Component({
    components: { TextInput },
})
export default class UserSettings extends Vue {
    user: User = { username: '' }

    get storeUser() {
        return this.$store.getters.getUser()
    }

    @Watch('storeUser', { deep: true })
    protected updateUser() {
        console.log('getting user from store!!!')
        const storeUser = this.$store.getters.getUser()
        // copy the user object and add a password field so the user can edit it
        this.user = Object.assign({ password: '' }, storeUser)
    }
    save() {
        this.$store.dispatch('updateUser', this.user)
    }
}
</script>
