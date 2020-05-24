import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { User } from '@/models/entities'

export default class UsersClient extends AbstractHttpClient {
    public async fetchAuthenticatedUser(): Promise<User> {
        return {
            id: '',
            username: 'your username',
        }

        // TODO uncomment when API endpoint is implemented
        // return this.get<User>('/api/me')
    }

    public updateUser(user: User): Promise<User> {
        return this.patch<User>(`/api/users/${user.id}`, user)
    }
}
