import { ItemType, Uuid } from '@/models/types'
/*
 * These interfaces and types all represent entities in the database
 */

// Used by all items
interface Common<T = ItemType> {
    id?: Uuid
    item_type: T
}

export interface Item<P = ItemType> extends Common {
    parent_id: Uuid | null
    parent_type: P | null
    created_at: Date
    updated_at: Date
}

export interface Page extends Common<ItemType.PAGE> {
    title: string
}

export interface Todo extends Common<ItemType.TODO> {
    title: string
}

export interface TodoItem extends Common<ItemType.TODO_ITEM> {
    title: string
    is_checked: boolean
}

export interface TextField extends Common<ItemType.TEXT_FIELD> {
    text: string
}

export interface User {
    // does a user have a Uuid? 🤔🤔🤔
    username: string
}
