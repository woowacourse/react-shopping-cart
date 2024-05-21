export const getNextMidnight = (date: Date) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
};

export const getHoursFromServerData = (text: string) => {
  return Number(text.split(':')[0]);
};
