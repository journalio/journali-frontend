import { User } from '@/models/entities'
import { JOURNALI_TOKEN } from '@/store/users/constants'
import { UserState } from '@/store/users/index'
import { MutationTree } from 'vuex'

export default {
    login(state, token: string) {
        localStorage.setItem(JOURNALI_TOKEN, token)
        state.token = token
    },
    logout(state) {
        localStorage.clear()
        state.user = null
        state.token = null
    },
    isLoadingUser(state, loading: boolean) {
        state.userLoading = loading
    },
    userLoaded(state, user: User) {
        state.user = user
        state.userLoading = false
    },
} as MutationTree<UserState>
