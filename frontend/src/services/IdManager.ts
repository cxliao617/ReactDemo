import {v4} from 'uuid'

export default class IdManager{
    ids = new Set()

    constructor(){
        this.ids = new Set()
    }
    fetch(){
        let id = v4()
        while(this.ids.has(id))
        {
            id = v4()
        }
        this.ids.add(id)

        return id
    }
    set(id: string)
    {
        if(this.ids.has(id))
        {
            throw new Error(`ID ${id} has already been used.`)
        }
        this.ids.add(id)
    }
    reset()
    {
        this.ids.clear()
    }
}