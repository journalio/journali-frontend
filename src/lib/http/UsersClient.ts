import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { User } from '@/models/entities'

export default class UsersClient extends AbstractHttpClient {
    // overkill?
    public fetchUsers(): Promise<User[]> {
        return this.get<User[]>('/api/users')
    }
    public fetchMe(): Promise<User> {
        return this.get<User>('/api/me')
    }
    public updateUser(user: User): Promise<User> {
        return this.patch<User>(`/api/users/${user.id}`, user)
    }
}