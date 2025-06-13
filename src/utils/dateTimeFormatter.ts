import { AMPM_STANDARD } from '../constants/couponConfig';

export const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

export const formatAMPM = (time: number): string => {
  return time < AMPM_STANDARD ? '오전' : '오후';
};

export const formatTimeRange = (start: string, end: string): string => {
  const startHour = parseInt(start.split(':')[0]);
  const endHour = parseInt(end.split(':')[0]);

  const startAMPM = formatAMPM(startHour);
  const endAMPM = formatAMPM(endHour);

  if (startAMPM === endAMPM) {
    return `${startAMPM} ${startHour % AMPM_STANDARD || AMPM_STANDARD}시부터 ${endHour % AMPM_STANDARD || AMPM_STANDARD}시까지`;
  }

  const startFormatted = `${startAMPM} ${startHour % AMPM_STANDARD || AMPM_STANDARD}시부터`;
  const endFormatted = `${endAMPM} ${endHour % AMPM_STANDARD || AMPM_STANDARD}시`;

  return `${startFormatted} ${endFormatted}까지`;
};
