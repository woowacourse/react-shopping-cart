export const getIsTimeAvailable = (start: string, end: string) => {
  const now = new Date();

  const [startHour, startMin, startSec] = start.split(":").map(Number);
  const [endHour, endMin, endSec] = end.split(":").map(Number);

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHour,
    startMin,
    startSec
  );
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHour,
    endMin,
    endSec
  );

  return (
    now.getTime() >= todayStart.getTime() && now.getTime() <= todayEnd.getTime()
  );
};
