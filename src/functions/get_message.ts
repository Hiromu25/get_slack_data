import { COLLA_MEMBER_ID } from "../config/env";
import { message, thread } from "../entity/message";
import { reaction } from "../entity/reaction";
import { slackBoltApp } from "../plugin/slack";
import { getReactions } from "./get_reactions";
import { getThread } from "./get_threads";
import { queue } from "../config/queue";
import { wait } from "./wait"

export const getMessage = async (channelId:string,nextCursor:string|undefined,latest:string|undefined,oldest:string|undefined) => {
    let messages:message[] = []
    const result = await slackBoltApp.client.conversations.history({
        channel: channelId,
        cursor: nextCursor,
        limit: 5000,
        latest: latest,
        oldest: oldest
    });
    if (result.error != undefined){
        console.log(result.error)
        const retrySec = result.response_metadata?.retryAfter! 
        // Pause requests to the Web API
        queue.pause()
        // Wait to make any more requests for the amount of time in header
        // Remember that the header is in seconds, not milliseconds
        console.log("wait"+retrySec.toString())
        wait(retrySec * 1000)
        // Resume requests and carry on
        queue.start()
    }else if (result.messages != undefined || result.messages != []){
        for (let message of result.messages!){
            let user = message.user!
            let text="";
            if (user == COLLA_MEMBER_ID){
                text = message.text!
            }
            let timestamp = Number(message.ts!)
            let isBot:boolean
            if (message.bot_id == undefined){
                isBot = false
            } else {
                isBot = true
            }
            let threads:thread[] = []
            if (message.thread_ts != undefined){
                threads = await getThread(channelId,message.thread_ts)
            }
            let reactions:reaction[] = []
            if (message.reactions != undefined){
                reactions = await getReactions(message.reactions)
            }
            messages.push({channel:channelId,user:user,text:text,timestamp:timestamp,isBot:isBot,reactions:reactions,threads:threads})
        }
        let nextMessages:message[] = []
        if (result.response_metadata?.next_cursor != undefined || result.has_more == true){
            nextMessages = await getMessage(channelId,result.response_metadata?.next_cursor,latest,oldest)
            messages = messages.concat(nextMessages)
        }
    }
    return messages
}
