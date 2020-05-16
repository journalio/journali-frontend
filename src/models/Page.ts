import { Uuid } from '@/models/index'

export default interface Page {
    id: Uuid
    item_type: number
    title: string
}
