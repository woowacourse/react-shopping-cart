import { CouponAvailableTimeType } from '../../../type';

export function getExpirationDateString(date: string) {
  const dateString = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `만료일: ${dateString}`;
}

export function getAvailableTimeString(availableTime: CouponAvailableTimeType) {
  const startTimeString = convertTimeToString(availableTime.start);
  const endTimeString = convertTimeToString(availableTime.end);

  return `사용 가능 시간: ${startTimeString}부터 ${endTimeString}까지`;
}

function convertTimeToString(time: string) {
  const [hours, minutes, seconds] = time.split(':');
  const dateString = `2024-01-01T${hours}:${minutes}:${seconds}`;

  return new Date(dateString).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: minutes !== '00' ? 'numeric' : undefined,
    second: seconds !== '00' ? 'numeric' : undefined,
    hour12: true,
  });
}

export function getMinimumAmountString(amount: number) {
  return `최소 주문 금액: ${amount.toLocaleString('ko-KR')}원`;
}
