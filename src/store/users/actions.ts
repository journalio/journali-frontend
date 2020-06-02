import AuthenticationClient from '@/lib/http/AuthenticationClient'
import UsersClient from '@/lib/http/UsersClient'
import { User } from '@/models/entities'
import { AppState } from '@/store'
import { UserState } from '@/store/users/index'
import { ActionContext, ActionTree } from 'vuex'

type ActionHandler = ActionContext<UserState, AppState>
const usersClient = new UsersClient()
const authClient = new AuthenticationClient()

export default {
    async updateUser({ commit }: ActionHandler, user: User): Promise<User> {
        commit('isLoadingUser', true)
        const updatedUser = await usersClient.updateUser(user)
        commit('userLoaded', updatedUser)
        return updatedUser
    },

    async login({ commit }: ActionHandler, credentials): Promise<boolean> {
        commit('isLoadingUser', true)
        try {
            const token = await authClient.login(credentials)
            commit('login', token)
            return true
        } catch {
            return false
        } finally {
            commit('isLoadingUser', false)
        }
    },
    async register({ commit }: ActionHandler, user: User): Promise<User> {
        commit('isLoadingUser', true) //TODO: remove after deadline
        const registeredUser = await usersClient.register(user)

        // only for making stuff work for the deadline. loadAuthenticatedUser should do this eventually
        commit('userLoaded', registeredUser) //TODO: remove after deadline
        return registeredUser
    },

    async loadAuthenticatedUser({ commit }: ActionHandler): Promise<void> {
        commit('isLoadingUser', true)
        const user = await usersClient.fetchAuthenticatedUser()
        commit('userLoaded', user)
    },
} as ActionTree<UserState, AppState>
