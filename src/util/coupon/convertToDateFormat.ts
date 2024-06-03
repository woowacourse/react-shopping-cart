export function convertToDateFormat(dateString: string) {
  const [year, month, day] = dateString.split('-');

  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}
