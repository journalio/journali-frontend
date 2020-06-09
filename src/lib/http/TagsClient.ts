import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Tag, Common } from '@/models/entities'
import { ItemType } from '@/models/types'

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        return Promise.resolve([
            {
                name: 'WWWWWWWWWWWWWWWW',
                color: '4287f5',
                items: [
                    {
                        id: 'da2054b6-7e5e-49f1-bf42-e42e1baa0647',
                        item_type: ItemType.TEXT_FIELD,
                    },
                ],
            },
            {
                name: 'Boodschappen',
                color: '4287f5',
                items: [
                    {
                        id: 'da2054b6-7e5e-49f1-bf42-e42e1baa0647',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: 'c4b502b6-b296-4d96-97d0-9a61afe0b457',
                        item_type: ItemType.TODO,
                    },
                ],
            },
            {
                name: 'School',
                color: '4287f5',
                items: [
                    {
                        id: 'da2054b6-7e5e-49f1-bf42-e42e1baa0647',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: 'c4b502b6-b296-4d96-97d0-9a61afe0b457',
                        item_type: ItemType.TODO,
                    },
                    {
                        id: '1619bfca-4f74-4f0d-956c-64bcd082d065',
                        item_type: ItemType.TEXT_FIELD,
                    },
                ],
            },
            {
                name: 'memes',
                color: '4287f5',
                items: [
                    {
                        id: 'da2054b6-7e5e-49f1-bf42-e42e1baa0647',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: 'c4b502b6-b296-4d96-97d0-9a61afe0b457',
                        item_type: ItemType.TODO,
                    },
                    {
                        id: '1619bfca-4f74-4f0d-956c-64bcd082d065',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: '8ae48ea0-1263-4bc3-9970-2cb4e69784b0',
                        item_type: ItemType.PAGE,
                    },
                ],
            },
            {
                name: 'vrienden',
                color: '4287f5',
                items: [
                    {
                        id: 'c4b502b6-b296-4d96-97d0-9a61afe0b457',
                        item_type: ItemType.TODO,
                    },
                    {
                        id: '1619bfca-4f74-4f0d-956c-64bcd082d065',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: '8ae48ea0-1263-4bc3-9970-2cb4e69784b0',
                        item_type: ItemType.PAGE,
                    },
                ],
            },
            {
                name: 'IPSENH',
                color: '4287f5',
                items: [
                    {
                        id: '1619bfca-4f74-4f0d-956c-64bcd082d065',
                        item_type: ItemType.TEXT_FIELD,
                    },
                    {
                        id: '8ae48ea0-1263-4bc3-9970-2cb4e69784b0',
                        item_type: ItemType.PAGE,
                    },
                ],
            },
            {
                name: 'Tabletop RPG',
                color: '4287f5',
                items: [
                    {
                        id: '8ae48ea0-1263-4bc3-9970-2cb4e69784b0',
                        item_type: ItemType.PAGE,
                    },
                ],
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

    assignItems(tag: Tag, items: Array<Common>): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}/items`, items)
    }

    deleteTag(tag: Tag): Promise<null> {
        return this.delete(`/api/tags/${tag.id}`)
    }
}
