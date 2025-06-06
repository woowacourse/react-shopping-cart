export const parseHour = (time: string) => {
  const [hour] = time.split(":");
  if (Number.isNaN(Number(hour))) return "시간 정보 없음";

  if (hour === "0") return "오전 12시";
  if (hour === "12") return "오후 12시";
  if (Number(hour) > 12) {
    return `오후 ${Number(hour) - 12}시`;
  }
  return `오전 ${Number(hour)}시`;
};
