import { reaction } from "../entity/reaction"
import { Reaction } from "@slack/web-api/dist/response/ConversationsHistoryResponse"

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