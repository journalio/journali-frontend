import { ItemType, Uuid } from '@/models'

export default interface Item {
    id: Uuid
    item_type: ItemType
    parent_id: Uuid | null
    parent_type: ItemType | null
    created_at: Date
    updated_at: Date
}
