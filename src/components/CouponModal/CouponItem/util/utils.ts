export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)}부터 ${formatTime(end)}까지`;
}

function formatTime(time: string): string {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}시`;
}
