export function formatTimeRange(start: string, end: string) {
  const toKoreanTime = (timeStr: string) => {
    const [hourStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    const period = hour < 12 ? "오전" : "오후";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${hour12}시`;
  };

  return `${toKoreanTime(start)}부터 ${toKoreanTime(end)}까지`;
}
