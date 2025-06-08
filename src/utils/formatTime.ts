export default function formatTime(time: string) {
  const [hour] = time.split(':');
  const h = parseInt(hour, 10);
  if (h === 0) return '오전 12시';
  if (h < 12) return `오전 ${h}시`;
  if (h === 12) return '오후 12시';
  return `오후 ${h - 12}시`;
}
