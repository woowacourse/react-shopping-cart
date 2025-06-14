export const getHourFromTime = (time: string = '00:00:00') => {
  const hourString = time.split(':')[0];

  return String(parseInt(hourString, 10));
};
