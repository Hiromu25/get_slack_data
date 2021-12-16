require("dotenv").config();

// slack
export const SLACK_USER_TOKEN = process.env.SLACK_USER_TOKEN;
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
export const COLLA_CHANNEL_ID  = process.env.COLLA_CHANNEL_ID;
export const LATEST_EXPORT_TIMESTAMP = process.env.LATEST_EXPORT_TIMESTAMP; 
export const OLDEST_EXPORT_TIMESTAMP = process.env.OLDEST_EXPORT_TIMESTAMP;
export const COLLA_MEMBER_ID = process.env.COLLA_MEMBER_ID;