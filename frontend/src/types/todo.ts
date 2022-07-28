export type TodoBody = {
    name: string
    status: string
}
export type ITodo = {
    id?: string
    _id: string
    name: string
    status: string
}
export enum TodoStatus {
    NotStarted = 'NotStarted',
    Process = 'Process'
}
export type TodoResponse = {
    todos: Array<ITodo>
}
export type SingleTodoResponse = {
    todo: ITodo
}