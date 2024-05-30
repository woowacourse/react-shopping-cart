import { Coupon } from '../../api/get/getCoupons';

const useCouponParser = (coupon: Coupon) => {
  const { expirationDate, minimumAmount, availableTime } = coupon;

  const result: string[] = [];
  const formattedDate = new Date(expirationDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  result.push(`만료일: ${formattedDate}`);

  if (minimumAmount !== undefined) {
    result.push(`최소 주문 금액: ${minimumAmount.toLocaleString('ko-KR')}원`);
  }

  if (availableTime) {
    const [startHour] = availableTime.start.split(':');
    const [endHour] = availableTime.end.split(':');
    result.push(`사용 가능 시간: 오전 ${startHour}시부터 ${endHour}시까지`);
  }

  return result;
};

export default useCouponParser;
