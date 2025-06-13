export default function getKoreanAmPm(timeString: string) {
  const [hourStr] = timeString.split(':');
  const hour = parseInt(hourStr, 10);

  if (Number.isNaN(hour) || hour < 0 || hour > 23) {
    throw new RangeError('시간의 시(hour) 부분이 00~23 범위를 벗어났습니다.');
  }

  return hour < 12 ? '오전' : '오후';
}
