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

  if (startPeriod === "오전" && endPeriod === "오전") {
    return `${formattedStartTime}부터 ${formattedEndTime.replace("오전 ", "")}까지`;
  } else if (startPeriod === "오전" && endPeriod === "오후") {
    return `${formattedStartTime}부터 ${formattedEndTime}까지`;
  } else if (startPeriod === "오후" && endPeriod === "오후") {
    return `${formattedStartTime}부터 ${formattedEndTime.replace("오후 ", "")}까지`;
  } else {
    return `${formattedStartTime}부터 ${formattedEndTime}까지`;
  }
}
