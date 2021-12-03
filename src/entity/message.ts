import {reaction} from "./reaction"

export interface message {
    channel:string
    user:string
    text:string
    timestamp:number
    isBot:boolean
    reactions?: reaction[]
    threads?: thread[]
}

export interface thread {
    user:string
    text:string
    timestamp:number
    isBot:boolean
    reactions?: reaction[]
}