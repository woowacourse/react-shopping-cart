export function formatToKoreanDate(dateStr: string): string {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid date format: "${dateStr}". Expected "YYYY-MM-DD".`);
  }
  const [, year, month, day] = match;
  return `${year}년 ${month}월 ${day}일`;
}
