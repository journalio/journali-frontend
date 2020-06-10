import * as domain from '@/models'
import * as entities from '@/models/entities'

export type Uuid = string

export enum ItemType {
    PAGE = 100,
    TODO = 200,
    TODO_ITEM = 210,
    TEXT_FIELD = 300,
}

export type AnyEntityItem =
    | entities.Page
    | entities.TodoItem
    | entities.TextField
    | entities.Todo
export type AnyDomainItem =
    | domain.Page
    | domain.TodoItem
    | domain.TextField
    | domain.Todo
