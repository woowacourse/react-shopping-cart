function formatSingleTime(hour: number): string {
  const formattedHour = hour % 12 || 12;
  const period = hour < 12 ? "오전" : "오후";
  return `${period} ${formattedHour}시`;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  const [startHour] = startTime.split(":").map(Number);
  const [endHour] = endTime.split(":").map(Number);

  const startPeriod = startHour < 12 ? "오전" : "오후";
  const endPeriod = endHour < 12 ? "오전" : "오후";

  const formattedStartTime = formatSingleTime(startHour);
  const formattedEndTime = formatSingleTime(endHour);

  const formattedEnd = startPeriod === endPeriod ? formattedEndTime.replace(`${startPeriod} `, "") : formattedEndTime;

  return `${formattedStartTime}부터 ${formattedEnd}까지`;
}
