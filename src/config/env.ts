require("dotenv").config();

// slack
export const SLACK_USER_TOKEN = process.env.SLACK_USER_TOKEN;
export const SLACK_BOT_USER_TOKEN = process.env.SLACK_BOT_USER_TOKEN;
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
export const SLACK_SEND_CHANNEL = process.env.SLACK_SEND_CHANNEL;

// firebase
export const FSA_PROJECT_ID = process.env.FSA_PROJECT_ID
export let FSA_PRIVATE_KEY:string;
if (process.env.FSA_PRIVATE_KEY){
    FSA_PRIVATE_KEY = process.env.FSA_PRIVATE_KEY.replace(/\\n/g, '\n')
}
export const FSA_CLIENT_EMAIL = process.env.FSA_CLIENT_EMAIL