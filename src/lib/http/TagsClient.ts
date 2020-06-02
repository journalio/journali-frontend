import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Tag } from '@/models/entities'

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        return Promise.resolve([{ id: '1', name: 'boodschappen' }])
        // return this.get<Tag[]>('/api/tags')
    }
}
