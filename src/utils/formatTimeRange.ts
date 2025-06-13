export function formatTimeRange(start: string, end: string) {
  const format = (time: string) => {
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const isAM = hour < 12;
    const period = isAM ? "오전" : "오후";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${displayHour}시`;
  };

  return `${format(start)}부터 ${format(end)}까지`;
}
