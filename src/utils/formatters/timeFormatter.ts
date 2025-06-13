export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "오후" : "오전";
  const hour = hours % 12 || 12;
  return `${period} ${hour}시${minutes > 0 ? ` ${minutes}분` : ""}`;
};

export const formatTimeRange = (start: string, end: string): string => {
  return `${formatTime(start)}부터 ${formatTime(end)}까지`;
};
