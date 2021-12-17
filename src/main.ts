import { COLLA_CHANNEL_ID, LATEST_EXPORT_TIMESTAMP, OLDEST_EXPORT_TIMESTAMP } from "./config/env";
import {writeMessageData, writeSingleChannelMessage} from "./functions/write_json";

const run = async ():Promise<void> => {
    // await writeSingleChannelMessage(COLLA_CHANNEL_ID!,LATEST_EXPORT_TIMESTAMP!,OLDEST_EXPORT_TIMESTAMP!)
    await writeMessageData(LATEST_EXPORT_TIMESTAMP,OLDEST_EXPORT_TIMESTAMP)
};

void run();