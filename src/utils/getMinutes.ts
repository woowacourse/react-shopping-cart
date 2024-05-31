export default function getMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}
