import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Tag } from '@/models/entities'

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        return Promise.resolve([
            {
                id: '9ab51ba2-7faa-4c7a-b36f-ea051a441534',
                name: 'boodschappen',
            },
            {
                id: 'a6182029-f30f-43fb-bb2d-981df3150e94',
                name: 'School',
            },
        ])
        // Uncomment this when /api/tags is implemented
        // return this.get<Tag[]>('/api/tags')
    }

    createTag(tag: Tag): Promise<Tag> {
        return this.post<Tag>('/api/tags', tag)
    }

    updateTag(tag: Tag): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}`, tag)
    }

    deleteTag(tag: Tag): Promise<null> {
        return this.delete(`/api/tags/${tag.id}`)
    }
}
