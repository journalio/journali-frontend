import { ItemType, Uuid } from '@/models'

export default interface Todo {
    id: Uuid
    item_type: ItemType.TODO
    title: string
}
