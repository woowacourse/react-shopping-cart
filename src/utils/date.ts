export const convertExpiryDateFormat = (expirationDate: string) => {
  const date = new Date(expirationDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const convertAvailableDateFormat = (start: string, end: string) => {
  const startHour = start.split(':')[0][1];
  const endHour = end.split(':')[0][1];
  return `오전 ${startHour}시부터 ${endHour}시까지`;
};
