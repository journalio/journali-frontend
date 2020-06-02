import { User } from '@/models/entities'
import { AppState } from '@/store'
import { JOURNALI_TOKEN } from '@/store/users/constants'
import actions from '@/store/users/actions'
import mutations from '@/store/users/mutations'
import { Module } from 'vuex'

export interface UserState {
    user: User | null
    userLoading: boolean
    token: string | null
}

const userStore: Module<UserState, AppState> = {
    namespaced: true,
    state: {
        user: null,
        userLoading: false,
        token: localStorage.getItem(JOURNALI_TOKEN) || null,
    },
    mutations,
    actions,
}

export default userStore
