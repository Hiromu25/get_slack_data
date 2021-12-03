import { SLACK_USER_TOKEN, SLACK_SIGNING_SECRET } from "../config/env";
import  { App } from '@slack/bolt';

export const slackBoltApp = new App({
  token:SLACK_USER_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET
});