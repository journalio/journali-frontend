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

    // suggestion: rename to createUser? What's the diff between registering and creating a user anyways?
    // public register(data: User): Promise<User> {
    //     return this.post<User>('/api/register', data)
    // }

    // a hacky version to make sure everything works correctly for the deadline. TODO: remove
    async register(data: User): Promise<User> {
        const user = await this.post<User>('/api/register', data)
        delete user.password
        return user
    }

    public updateUser(user: User): Promise<User> {
        return this.patch<User>(`/api/users/${user.id}`, user)
    }
}
