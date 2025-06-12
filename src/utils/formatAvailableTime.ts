export function formatAvailableTime(start: string, end: string): string {
  return `${format(start)}부터 ${format(end)}까지`;
}

const format = (time: string) => {
  const hour = parseInt(time.split(":")[0], 10);
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${period} ${displayHour}시`;
};
