import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { NewItem } from '@/models'
import { Item, Page } from '@/models/entities'
import { AnyDomainItem, AnyEntityItem, ItemType, Uuid } from '@/models/types'

const endPoints: Record<ItemType, string> = {
    [ItemType.PAGE]: 'pages',
    [ItemType.TEXT_FIELD]: 'text_fields',
    [ItemType.TODO]: 'todos',
    [ItemType.TODO_ITEM]: 'todo-items',
}

type ItemResponse = {
    item: Item
    subtype: AnyEntityItem
}
const mapToDomain = ({ item, subtype }: ItemResponse): AnyDomainItem => ({
    ...item,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
    ...Object.values(subtype)[0],
})

export default class ItemsClient extends AbstractHttpClient {
    public fetchPages(): Promise<Page[]> {
        return Promise.resolve([
            {
                id: '9ab51ba2-7faa-4c7a-b36f-ea051a441534',
                item_type: 100,
                title: 'test page please ignore',
            },
            {
                id: 'a6182029-f30f-43fb-bb2d-981df3150e94',
                item_type: 100,
                title: 'test page please ignorei2',
            },
        ])
        // Uncomment when endpoint is implemented
        // return this.get<Page[]>('/api/pages')
    }

    async createPage(data: Page): Promise<Page> {
        return this.post<Page>('/api/pages', data)
    }

    async fetchItemsByParent(parentId: Uuid): Promise<AnyDomainItem[]> {
        const items = await this.get<ItemResponse[]>(
            `/api/items?parent_id=${parentId}`,
        )
        // Uncomment when endpoint is implemented

        return items.map(mapToDomain)
    }

    createItem<T>(item: NewItem): Promise<T> {
        return this.post<T>(`/api/${endPoints[item.item_type]}`, item)
    }

    updateItem<T extends Item>(item: T): Promise<T> {
        return this.patch<T>(
            `/api/${endPoints[item.item_type]}/${item.id}`,
            item,
        )
    }

    deleteItem<T>(item: Item) {
        if (!item.id) {
            // TODO: handle this in a more robust way
            throw 'This item has no Id, probably doesn\'t exist in the API yet'
        }
        return this.delete<T>(`/api/${endPoints[item.item_type]}/${item.id}`)
    }

    async fetchAllItems(): Promise<AnyDomainItem[]> {
        const items = await this.get<ItemResponse[]>('/api/items')

        return items.map(mapToDomain)
    }
}
