const setDate = (timeString: string, currentDate: Date): Date => {
  const [hour, minute, second] = timeString.split(':').map(Number);
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute, second);
};

export const isTimeValid = (availableTime: { start: string; end: string }, now: Date = new Date()): boolean => {
  const startTime = setDate(availableTime.start, now);
  const endTime = setDate(availableTime.end, now);

  return now >= startTime && now <= endTime;
};
