export function formatDate(date: string) {
  if (typeof date !== "string") return "";

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) return "";

  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
}
