export const validateAvailableTime = (currentDate: Date, availableTime: { start: string; end: string }) => {
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  const [startHour, startMinute] = availableTime.start.split(':').map(Number);
  const [endHour, endMinute] = availableTime.end.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};
