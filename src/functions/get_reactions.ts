import { reaction } from "../entity/reaction"
import { Reaction } from "@slack/bolt/node_modules/@slack/web-api/dist/response/ConversationsRepliesResponse"

export const getReactions = async (data:Reaction[]):Promise<reaction[]> => {
    let reactions:reaction[] = []
    try{
        for (let reaction of data){
            reactions.push({users:reaction.users!,reaction:reaction.name!})
        }
        return reactions
    }catch(error){
        console.error(error)
        return reactions
    }
}