import {reaction} from "./reaction"

export interface message {
    channel:string
    user:string
    text:string
    timestamp:number
    isBot:boolean
    reactions?: reaction[]
}

export interface thread {
    user:string
    timestamp:number
    isBot:boolean
    reactions?: reaction[]
}