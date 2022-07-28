import {createServer,Factory,Model,Serializer} from 'miragejs'

import {ITodo,TodoBody,TodoStatus} from '../types/todo'
import IdManager from './IdManager'

export function MockServer({environment = 'development'}){
    return createServer({
        environment,
        identityManagers: {
            todo: IdManager,
        } as any,
        serializers: {
            todo: Serializer.extend({
                keyForAttribute(key){
                    return key==='id'?'_id':key
                }
            })
        },
        models: {
            todo: Model.extend<Partial<ITodo>>({}),
        },
        factories: {
            todo: Factory.extend<Partial<ITodo>>({
                get name(){
                    return 'empty'
                },
                get status(){
                    return TodoStatus.NotStarted
                },
                get _id(){
                    return ''
                }
            })
        },
        seeds(server)
        {
            server.createList('todo',3)
        },
        routes(){
            this.urlPrefix = '/api'
            this.get('/todos',(schema,request) => {
                return schema.all('todo')
            })
            this.post('/todos',(schema,request)=>{
                const attrs = JSON.parse(request.requestBody) as TodoBody
                let res = schema.create('todo',attrs)
                res.attrs._id = res.attrs.id
                if(res.attrs._id !== undefined)
                {
                    const todo = schema.db.todos.update(res.attrs._id,res.attrs)
                    return {todo}
                }
                return {todo:res}
            })
            this.put('/todos/:key',(schema,request)=>{
                const keyId = request.params.key 
                const attrs = JSON.parse(request.requestBody)
                const res = schema.db.todos.update(keyId,attrs)
                return {todo:res}
            })
            this.del('/todos/:key',(schema,request)=>{
                const keyId = request.params.key
                const post = schema.findBy('todo',{id: keyId})
                if(post !== null)
                {
                    post.destroy()
                }
                return {todo:post}
            })
        }
    })
}