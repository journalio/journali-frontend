import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { User } from '@/models/entities'

export default class UsersClient extends AbstractHttpClient {
    public async fetchAuthenticatedUser(): Promise<User> {
        return this.get<User>('/api/user/me')
    }

    async register(data: User): Promise<User> {
        const user = await this.post<User>('/api/register', data)
        delete user.password
        return user
    }

    public updateUser(user: User): Promise<User> {
        return this.patch<User>(`/api/users/${user.id}`, user)
    }
}
