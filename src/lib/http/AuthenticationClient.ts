import AbstractHttpClient from '@/lib/http/AbstractHttpClient'

interface AuthenticationRequest {
    username: string
    password: string
}

interface AuthenticationResponse {
    token: string
}

export default class AuthenticationClient extends AbstractHttpClient {
    login(data: AuthenticationRequest): Promise<string> {
        return this.post<AuthenticationResponse>('/api/login', data).then(
            (resp) => resp.token,
        )
    }
}
