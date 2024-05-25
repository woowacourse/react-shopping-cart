export const formatExpirationDate = (expirationDate: string) => {
  const date = new Date(expirationDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
};

export const formatAvailableTime = (start: string, end: string) => {
  const startHour = Number(start.split(':')[0]);
  const endHour = Number(end.split(':')[0]);

  if (startHour >= 12 && endHour >= 12)
    return `오후 ${startHour}시부터 ${endHour}까지`;
  if (startHour < 12 && endHour >= 12)
    return `오전 ${startHour}시부터 오후 ${endHour}까지`;
  if (startHour < 12 && endHour < 12)
    return `오전 ${startHour}시부터 ${endHour}까지`;
};
