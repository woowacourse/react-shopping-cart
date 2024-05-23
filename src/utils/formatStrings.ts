import { AvailableTime } from '../types/Coupon.type';

export const formatExpirationDate = (input: string): string => {
  const date = new Date(input);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedExpirationDate = formatter.format(date);

  return `만료일: ${formattedExpirationDate}`;
};

export const formatMinimumAmount = (amount: number): string => {
  const formattedAmount = amount.toLocaleString('ko-KR');

  return `최소 주문 금액: ${formattedAmount}원`;
};

export const formatTimeRange = (availableTime: AvailableTime): string => {
  const formatTime = (time: string): string => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const period = hours < 12 ? '오전' : '오후';
    const adjustedHours = hours % 12 || 12;
    const formattedMinutes = minutes > 0 ? `${minutes}분` : '';
    const formattedSeconds = seconds > 0 ? `${seconds}초` : '';
    const formattedTime = `${period} ${adjustedHours}시${formattedMinutes}${formattedSeconds}`;
    return formattedTime.trim();
  };

  const startFormatted = formatTime(availableTime.start);
  const endFormatted = formatTime(availableTime.end);

  return `사용 가능 시간: ${startFormatted}부터 ${endFormatted}까지`;
};
