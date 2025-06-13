export default function formatDate(dateString: string) {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day) return '';

  return `${year}년 ${month}월 ${day}일`;
}
