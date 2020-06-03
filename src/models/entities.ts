import { ItemType, Uuid } from '@/models/types'
/*
 * These interfaces and types all represent entities in the database
 */

// Used by all items
interface Common<T = ItemType> {
    id?: Uuid
    item_type: T
}

export interface Renderable {
    coord_x: number
    coord_y: number
}

export interface Item<P = ItemType> extends Common, Record<string, any> {
    parent_id: Uuid | null
    parent_type: P | null
    created_at: Date
    updated_at: Date
    due_date: Date | null
}

export interface Page extends Common<ItemType.PAGE> {
    title: string
}

export interface Todo extends Common<ItemType.TODO> {
    title: string
}

export interface TodoItem extends Common<ItemType.TODO_ITEM>, Renderable {
    title: string
    is_checked: boolean
}

export interface TextField extends Common<ItemType.TEXT_FIELD>, Renderable {
    text: string
}

export interface User {
    id?: Uuid
    username: string
    password?: string
}

export interface Tag {
    id?: Uuid
    name: string
}
