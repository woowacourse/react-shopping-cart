const now = new Date();
const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
const koreaTimeDiff = 9 * 60 * 60 * 1000;
export const curKoreaTime = new Date(utc + koreaTimeDiff);
