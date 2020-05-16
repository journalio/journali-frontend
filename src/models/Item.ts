import { Uuid } from '@/models/index'

export default interface Item {
    id: Uuid
    item_type: number
    parent_id: Uuid
    parent_type: number
    created_at: Date
    updated_at: Date
}
