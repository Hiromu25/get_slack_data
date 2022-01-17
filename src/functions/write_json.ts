import * as fs from "fs"
import { COLLA_CHANNEL_ID } from "../config/env"
import { message } from "../entity/message"
import { getChannelData, getChannelMembers, getChannels } from "./get_channels"
import { getMessage } from "./get_message"
import { getUserData } from "./get_users"

let messages:message[] = []
let messageNum = 0
let singleChannelMessage:message[] = []

export const writeChannelData = async () => {
    try {
        const channelData = await getChannelData()
        fs.writeFileSync("./data/channel.json",JSON.stringify(channelData,null,'\t'))
    } catch(error){
        console.log(error)
    }
}

export const writeUserData = async () => {
    try {
        const userData = await getUserData()
        fs.writeFileSync("./data/user.json",JSON.stringify(userData,null,'\t'))
    } catch(error){
        console.log(error)
    }
}

export const writeChannelUserData = async (channelId:string) => {
    try {
        const userData = await getChannelMembers(channelId,undefined)
        fs.writeFileSync("./data/"+channelId+"_user.json",JSON.stringify(userData,null,'\t'))
    } catch(error){
        console.log(error)
    }
}

export const writeMessageData = async (latest:string|undefined,oldest:string|undefined) => {
    try{
        const channels = await getChannels(undefined)
        console.log("********start getting data*********")
        await getChannelsMessage(channels,latest,oldest)
        console.log("\n\n total length = "+messages.length+ "\nmessageNum = "+ messageNum + "\n\n")
        fs.writeFileSync("./data/channel_messages.json",JSON.stringify(messages,null,'\t'))
    }catch(error){
        console.error(error)
        return messages
    }
} 

const getChannelsMessage = async (channels:string[],latest:string|undefined,oldest:string|undefined) => {
    try{
        const channelLen = channels.length
        let promiseList = []
        const INIT = 0;
        const CHUNK = 5; // まとめて実行する数を定義
        // for (let channelId of channels){
        //     if (!removeChannel.includes(channelId)){
        //         promiseList.push(() => {return new Promise((resorve) => messageAppend(channelId,latest,oldest))})
        //     }
        // }
        // await runConcurrentlyAsync(promiseList,3)
        let index = INIT
        for (let channelId of channels){

            promiseList.push(messageAppend(channelId,latest,oldest))
    
            if ((index + 1) % CHUNK === 0) {
                await Promise.all(promiseList);
                promiseList = [];
            } else if (index+1 == channelLen) {
                await Promise.all(promiseList);
                promiseList = [];
            }
            
            index++
        }
        console.log("********end getting data*********")
    }catch(error){
        console.log(error)
    }
}

const messageAppend = async (channelId:string,latest:string|undefined,oldest:string|undefined) => {
    try{
        console.log(channelId)
        let channelMessages = await getMessage(channelId,undefined,latest,oldest)
        console.log(channelId+":lenght = "+channelMessages.length)
        messageNum += channelMessages.length
        for (let message of channelMessages){
            messages.push(message)
        }
        console.log("finish:"+channelId)
    }catch(error){
        console.log(error)
    }
}

export const writeSingleChannelMessage = async(channelId:string,latest:string|undefined,oldest:string|undefined) => {
    try{
        let channelMessages = await getMessage(channelId,undefined,latest,oldest)
        console.log(channelId+":lenght = "+channelMessages.length)
        messageNum += channelMessages.length
        for (let message of channelMessages){
            singleChannelMessage.push(message)
        }
        fs.writeFileSync("./data/"+channelId+".json",JSON.stringify(singleChannelMessage,null,'\t'))
    }catch(error){
        console.log(error)
    }
}