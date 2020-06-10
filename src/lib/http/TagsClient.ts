import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Tag, Common } from '@/models/entities'

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        // Uncomment this when /api/tags is implemented
        return this.get<Tag[]>('/api/tags')
    }

    createTag(tag: Tag): Promise<Tag> {
        return this.post<Tag>('/api/tags', tag)
    }

    updateTag(tag: Tag): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}`, tag)
    }

    assignItems(tag: Tag, items: Array<Common>): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}/items`, items)
    }

    deleteTag(tag: Tag): Promise<null> {
        return this.delete(`/api/tags/${tag.id}`)
    }
}
