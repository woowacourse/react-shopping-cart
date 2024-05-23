/**
 * @example "12:30:00" - 12시 30분 0초
 */
type TimeString = string;

export const isNowInTimeRange = (
  start: TimeString,
  end: TimeString,
  now: Date = new Date()
): boolean => {
  const [startHour, startMinute, startSecond] = start.split(":").map(Number);
  const [endHour, endMinute, endSecond] = end.split(":").map(Number);

  const startTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHour,
    startMinute,
    startSecond
  );

  const endTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHour,
    endMinute,
    endSecond
  );

  if (startTime >= endTime) {
    if (now >= endTime && now < startTime) {
      return true;
    }
  } else {
    if (now >= startTime && now < endTime) {
      return true;
    }
  }

  return false;
};
