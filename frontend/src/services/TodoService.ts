import axios,{AxiosResponse} from 'axios'
import { SingleTodoResponse,TodoResponse,ITodo,TodoBody } from '../types/todo'


export class TodoService{
    async getTodos(): Promise<AxiosResponse<TodoResponse>>{
        try{
            const res = await axios.get<TodoResponse>(`/api/todos`)
            return Promise.resolve(res)
        }
        catch(err)
        {
            return Promise.reject(`${err}`)
        }
    }
    async postTodo(todoBody: TodoBody): Promise<AxiosResponse<SingleTodoResponse>>{
        try{
            const res = await axios.post<SingleTodoResponse>(`/api/todos`,todoBody)
            return Promise.resolve(res)
        }
        catch(err)
        {
            return Promise.reject(`${err}`)
        }
    }
    async putTodo(todoObject: ITodo): Promise<AxiosResponse<SingleTodoResponse>>{
        try{
            const res = await axios.put<SingleTodoResponse>(`/api/todos/${todoObject._id}`,todoObject)
            return Promise.resolve(res)
        }
        catch(err)
        {
            return Promise.reject(`${err}`)
        }
    }
    async deleteTodo(id: string): Promise<AxiosResponse<SingleTodoResponse>>{
        try{
            const res = await axios.delete<SingleTodoResponse>(`/api/todos/${id}`)
            return Promise.resolve(res)
        }
        catch(err)
        {
            return Promise.reject(`${err}`)
        }
    }
}