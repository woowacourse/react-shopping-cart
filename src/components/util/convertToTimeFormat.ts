export function convertToTimeFormat(timeString: string) {
  const [hours, ,] = timeString.split(':');

  const hours12 = ((parseInt(hours) + 11) % 12) + 1;
  const amPm = parseInt(hours) >= 12 ? '오후' : '오전';

  return `${amPm} ${hours12}시`;
}
