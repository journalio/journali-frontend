<template>
    <form
        class="flex flex-col items-center bg-white p-4"
        @submit.prevent="save()"
    >
        <text-input
            v-model="me.username"
            label="Username"
            type="username"
            name="username"
        />
        <text-input
            v-model="me.password"
            label="Password"
            type="password"
            name="password"
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { User } from '@/models/entities'

@Component({
    components: { TextInput },
})
export default class UserSettings extends Vue {
    // will contain user object
    me = {}

    protected created() {
        this.me = Object.assign({}, this.$store.getters.getMe())
    }

    get storeMe(): User {
        return this.$store.getters.getMe()
    }

    get saveable(): boolean {
        // return this.user?.id
        return true
    }

    @Watch('storeUser', { deep: true })
    protected updateUser() {
        console.log('getting Me from store!!!')
        // copy the user object and add a password field so the user can edit it
        this.me = Object.assign({ password: '' }, this.me)
    }
    save() {
        if (this.saveable) {
            this.$store.dispatch('updateMe', this.me)
        }
    }
}
</script>
