export const getHourFromTime = (time: string = '00:00:00') => {
  const hour = time.split(':')[0].slice(1);

  return hour;
};
