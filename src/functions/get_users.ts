import { user } from "../entity/user";
import { slackBoltApp } from "../plugin/slack";

export const getUserData = async () => {
    try {
        let userData:user[] = []
        const result = await slackBoltApp.client.users.list();
        if (result.members != undefined){
            for (let user of result.members) {
                userData.push({userId:user.id!,userName:user.real_name!})
            }
        }
        return userData
    }catch (error) {
        console.error(error);
    }
};