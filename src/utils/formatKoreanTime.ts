export const formatKoreanTime = (time: string) => {
  // "04:00:00" → 오전 4시, "13:00:00" → 오후 1시
  const [hourStr] = time.split(':');
  const hour = parseInt(hourStr, 10);

  if (hour === 0) return '오전 12시';
  if (hour < 12) return `오전 ${hour}시`;
  if (hour === 12) return '오후 12시';
  return `오후 ${hour - 12}시`;
};
