import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export const setDefaultTimezone = () => {
    dayjs.extend(timezone);
    dayjs.extend(utc);

    dayjs.tz.setDefault("Asia/Tokyo");
}