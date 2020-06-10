import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Common, Tag } from '@/models/entities'
import { ItemType, Uuid } from '@/models/types'

type UnMappedTag = Tag & {
    items: [Uuid, ItemType][]
}

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        // Uncomment this when /api/tags is implemented
        return (await this.get<UnMappedTag[]>('/api/tags')).map(
            (tag: UnMappedTag) => ({
                ...tag,
                items: tag.items.map(([id, item_type]: [Uuid, ItemType]) => ({
                    id,
                    item_type,
                })),
            }),
        )
    }

    createTag(tag: Tag): Promise<Tag> {
        return this.post<Tag>('/api/tags', tag)
    }

    updateTag(tag: Tag): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}`, tag)
    }

    assignItems(tag: Tag, items: Common[]): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}/items`, items)
    }

    unassignItems(tag: Tag, items: Common[]): Promise<null> {
        return this.delete(`/api/tags/${tag.id}/items`, items)
    }

    deleteTag(tag: Tag): Promise<null> {
        return this.delete(`/api/tags/${tag.id}`)
    }
}
