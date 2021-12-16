import { slackBoltApp } from "../plugin/slack";
import { thread } from "../entity/message";
import { reaction } from "../entity/reaction";
import { getReactions } from "./get_reactions";
import { delay } from "./wait";

export const getThread = async(channelId:string,thread_ts:string) => {
    let threads: thread[] = []
    try {
        await delay(1500)
        const result = await slackBoltApp.client.conversations.replies({
            channel: channelId,
            ts: thread_ts
        })
        let i = 0
        for (let message of result.messages!){
            if (message.type == "message" && i != 0){
                let user = message.user!
                let timestamp = Number(message.ts!)
                // let text = message.text!
                let isBot:boolean
                if (message.bot_id == undefined){
                    isBot = false
                } else {
                    isBot = true
                }
                let reactions: reaction[] = []
                if (message.reactions != undefined){
                    reactions = await getReactions(message.reactions)
                }
                let threadMessage:thread
                // threadMessage = {
                //     user: user,
                //     timestamp: timestamp,
                //     text: text,
                //     isBot: isBot,
                //     reactions: reactions
                // }
                threadMessage = {
                    user: user,
                    timestamp: timestamp,
                    isBot: isBot,
                    reactions: reactions
                }
                threads.push(threadMessage)
            }
            i ++
        }
        return threads
    }catch(error){
        console.error(error)
        return threads
    }
}