// https://api.slack.com/methods/conversations.list

import { channel } from "../entity/channel";
import { slackBoltApp } from "../plugin/slack";

export const getChannels = async () => {
    let channels:string[] = []
    try{
        const result = await slackBoltApp.client.conversations.list({limit:1000});
        if (result.channels != undefined){
            for (let channel of result.channels) {
                channels.push(channel.id!)
            }
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

export const getChannelMembers = async (channelId:string) => {
    let members:{userId:string}[] = []
    try{
        const result = await slackBoltApp.client.conversations.members({channel:channelId})
        for (let member of result.members!){
            members.push({userId:member})
        }
        return members
    } catch(error){
        console.error(error);
        return members
    }
}