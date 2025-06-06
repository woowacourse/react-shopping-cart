export const formatTimeToKoreanHour = (timeStr: string): string => {
  const [hour] = timeStr.split(":");
  return `${parseInt(hour, 10)}시`;
};
