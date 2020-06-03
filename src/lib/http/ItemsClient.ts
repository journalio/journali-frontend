import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { NewItem } from '@/models'
import { Item } from '@/models/entities'
import { AnyDomainItem, AnyEntityItem, ItemType, Uuid } from '@/models/types'

const endPoints: Record<ItemType, string> = {
    [ItemType.PAGE]: 'pages',
    [ItemType.TEXT_FIELD]: 'text_fields',
    [ItemType.TODO]: 'todos',
    [ItemType.TODO_ITEM]: 'todo_items',
}

type ItemResponse = {
    item: Item
    subtype: AnyEntityItem
}
const mapToDomain = <T = AnyDomainItem>({
    item,
    subtype,
}: ItemResponse): T => ({
    ...item,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
    due_date: item.due_date ? new Date(item.due_date) : null,
    ...Object.values(subtype)[0],
})

export default class ItemsClient extends AbstractHttpClient {
    async fetchItemsByParent(parentId: Uuid): Promise<AnyDomainItem[]> {
        const items = await this.get<ItemResponse[]>(
            `/api/items?parent_id=${parentId}`,
        )
        // Uncomment when endpoint is implemented

        return items.map(mapToDomain)
    }

    async createItem<T>(item: NewItem): Promise<T> {
        const response = await this.post<ItemResponse>(
            `/api/${endPoints[item.item_type]}`,
            item,
        )

        return mapToDomain(response)
    }

    updateItem<T extends Item>(item: T): Promise<T> {
        return this.patch<T>(
            `/api/${endPoints[item.item_type]}/${item.id}`,
            item,
        )
    }

    updateItemMeta(item: Item): Promise<Item> {
        return this.patch<Item>(`/api/items/${item.id}`, item)
    }

    deleteItem(item: Item) {
        if (!item.id) {
            // TODO: handle this in a more robust way
            throw 'This item has no Id, probably doesn\'t exist in the API yet'
        }
        return this.delete(`/api/${endPoints[item.item_type]}/${item.id}`)
    }

    async fetchAllItems(): Promise<AnyDomainItem[]> {
        const items = await this.get<ItemResponse[]>('/api/items')

        return items.map(mapToDomain)
    }
}
