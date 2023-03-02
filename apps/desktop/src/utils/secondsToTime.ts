import dayjs from "dayjs";

export const secondsToTime = (seconds: number): string => dayjs(seconds * 1000).format('mm:ss');