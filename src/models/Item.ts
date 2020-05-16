import { Uuid } from '@/models/index'

export default interface Item {
    id: Uuid
    item_type: number
    parent_id: Uuid | null
    parent_type: number | null
    created_at: Date
    updated_at: Date
}
