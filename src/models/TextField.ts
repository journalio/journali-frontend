import { ItemType, Uuid } from '@/models'

export default interface TextField {
    id: Uuid
    item_type: ItemType.TEXT_FIELD
    text: string
}
