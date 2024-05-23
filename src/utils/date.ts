export const getNextMidnight = (date: Date) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
};

export const getHoursFromServerData = (text: string) => {
  return Number(text.split(':')[0]);
};

export const formatDateToString = (text: string) => {
  const date = new Date(text);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
