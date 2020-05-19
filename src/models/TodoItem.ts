import { ItemType, Uuid } from '@/models'

export default interface TodoItem {
    id: Uuid
    item_type: ItemType.TODO_ITEM
    title: string
    is_checked: boolean
}
