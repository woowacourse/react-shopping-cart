export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formatAvailableTime = (start: string, end: string): string => {
  const getHourInfo = (time: string) => {
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr, 10);

    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return { period, hour: formattedHour };
  };

  const startInfo = getHourInfo(start);
  const endInfo = getHourInfo(end);

  if (startInfo.period === endInfo.period) {
    return `${startInfo.period} ${startInfo.hour}시부터 ${endInfo.hour}시까지`;
  }

  return `${startInfo.period} ${startInfo.hour}시부터 ${endInfo.period} ${endInfo.hour}시까지`;
};
