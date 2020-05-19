import { ItemType, Uuid } from '@/models'

export default interface Page {
    id?: Uuid
    item_type: ItemType.PAGE
    title: string
}
