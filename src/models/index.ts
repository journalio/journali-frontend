import {
    Item,
    Page as EPage,
    TextField as ETextField,
    Todo as ETodo,
    TodoItem as ETodoItem,
} from '@/models/entities'
import { ItemType, Uuid } from '@/models/types'

export type Page = Item & EPage
export type TextField = Item & ETextField
export type Todo = Item & ETodo
export type TodoItem = Item & ETodoItem
export type NewItem<T = ETextField | ETodo> = T & {
    item_type: ItemType
    page_id: Uuid
}

export const itemTypeFromString = (type: string): ItemType => {
    switch (type) {
        case 'Page':
            return ItemType.PAGE
        case 'Todo':
            return ItemType.TODO
        case 'TodoItem':
            return ItemType.TODO_ITEM
        case 'TextField':
            return ItemType.TEXT_FIELD
        default:
            throw `Invalid Item type "${type}"`
    }
}

export const createItemByName = (type: string) => {
    const item_type = itemTypeFromString(type)

    switch (item_type) {
        case ItemType.PAGE:
            return {
                item_type,
                title: '',
            } as EPage
        case ItemType.TODO:
            return {
                item_type,
                title: '',
            } as ETodo
        case ItemType.TODO_ITEM:
            return {
                item_type,
                title: '',
                is_checked: false,
            } as ETodoItem
        case ItemType.TEXT_FIELD:
            return {
                item_type,
                text: '',
            } as ETextField
    }
}
