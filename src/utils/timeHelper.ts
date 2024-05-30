export const formatHourToDate = (now: Date, target: number[]) => {
  const dateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    ...target
  );

  return dateTime;
};
