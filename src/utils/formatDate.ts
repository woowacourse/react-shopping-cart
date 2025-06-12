export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${month}월 ${day}일`;
}
