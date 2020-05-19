export type Uuid = string

export const enum ItemType {
    PAGE = 100,
    TODO = 200,
    TODO_ITEM = 210,
    TEXT_FIELD = 300,
}

export type RenderableItem = ItemType.TODO | ItemType.TEXT_FIELD

export enum ItemNames {
    PAGE = 'Page',
    TODO = 'Todo',
    TODO_ITEM = 'TodoItem',
    TEXT_FIELD = 'TextField',
}
