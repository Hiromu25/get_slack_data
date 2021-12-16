import { message, thread } from "../entity/message";
import { reaction } from "../entity/reaction";
import { slackBoltApp } from "../plugin/slack";
import { getReactions } from "./get_reactions";
import { getThread } from "./get_threads";

export const getMessage = async (channelId:string,nextCursor:string|undefined,latest:string|undefined,oldest:string|undefined) => {
    let messages:message[] = []
    try{
        const result = await slackBoltApp.client.conversations.history({
            channel: channelId,
            cursor: nextCursor,
            limit: 5000,
            latest: latest,
            oldest: oldest
        });
        if (result.messages != undefined || result.messages != []){
            for (let message of result.messages!){
                let user = message.user!
                // let text = message.text!
                let timestamp = Number(message.ts!)
                let isBot:boolean
                if (message.bot_id == undefined){
                    isBot = false
                } else {
                    isBot = true
                }
                let threads:thread[] = []
                // if (message.thread_ts != undefined){
                //     threads = await getThread(channelId,message.thread_ts)
                // }
                let reactions:reaction[] = []
                if (message.reactions != undefined){
                    reactions = await getReactions(message.reactions)
                }
                // messages.push({channel:channelId,user:user,text:text,timestamp:timestamp,isBot:isBot,threads,reactions})
                messages.push({channel:channelId,user:user,timestamp:timestamp,isBot:isBot,reactions})
            }
            let nextMessages:message[] = []
            if (result.response_metadata?.next_cursor != undefined || result.has_more == true){
                nextMessages = await getMessage(channelId,result.response_metadata?.next_cursor,latest,oldest)
                messages = messages.concat(nextMessages)
            }
        }
        return messages
    }catch(error) {
        console.error(error)
        return messages
    }
}
