// https://api.slack.com/methods/conversations.list

import { channel } from "../entity/channel";
import { slackBoltApp } from "../plugin/slack";

export const getChannels = async (nextCursor: string|undefined) => {
    let channels:string[] = []
    try{
        const result = await slackBoltApp.client.conversations.list({limit:1000,cursor:nextCursor});
        if (result.channels != undefined){
            for (let channel of result.channels) {
                channels.push(channel.id!)
            }
        }
        if (result.response_metadata?.next_cursor != ""){
            channels = channels.concat(await getChannels(result.response_metadata!.next_cursor))
        }
        return channels
    } catch(error){
        console.error(error);
        return channels
    }
};

export const getChannelData = async () => {
    let channelData:channel[] = []
    try{
        const result = await slackBoltApp.client.conversations.list({limit:1000});
        if (result.channels != undefined){
            for (let channel of result.channels) {
                channelData.push({channelId:channel.id!,channelName:channel.name!})
            }
        }
        return channelData
    } catch(error){
        console.error(error);
        return channelData
    }
};

export const getChannelMembers = async (channelId:string,nextCursor: string|undefined) => {
    let members:{userId:string}[] = []
    try{
        const result = await slackBoltApp.client.conversations.members({channel:channelId,limit:100,cursor:nextCursor})
        for (let member of result.members!){
            members.push({userId:member})
        }
        if (result.response_metadata?.next_cursor != ""){
            members = members.concat(await getChannelMembers(channelId,result.response_metadata!.next_cursor))
        }
        return members
    } catch(error){
        console.error(error);
        return members
    }
}