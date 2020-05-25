import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import store from '@/store'

interface AuthenticationRequest {
    username: string
    password: string
}

interface AuthenticationResponse {
    token: string
}

export default class AuthenticationClient extends AbstractHttpClient {
    async login(data: AuthenticationRequest): Promise<boolean> {
        try {
            const response = await this.post<AuthenticationResponse>(
                '/api/login',
                data,
            )
            store.commit('login', response.token)

            return true
        } catch {
            return false
        }
    }
}
