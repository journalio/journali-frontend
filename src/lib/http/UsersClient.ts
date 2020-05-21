import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { User } from '@/models/entities'

export default class UsersClient extends AbstractHttpClient {
    // overkill?
    public fetchUser(): Promise<User> {
        return this.get<User>('/api/users')
    }
    public updateUser(user: User): Promise<User> {
        return this.patch<User>('/api/users', user)
    }
}
