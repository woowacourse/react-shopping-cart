export default function getLastTimeDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day, 23, 59, 59);
}
