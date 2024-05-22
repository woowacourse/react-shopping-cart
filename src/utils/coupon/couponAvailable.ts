import { Coupon } from '@/types/coupon.type';

interface Props {
  coupon: Coupon;
  orderPrice: number;
  date: Date;
}

const couponAvailable = ({ coupon, orderPrice, date }: Props) => {
  const checkMinimumAmount = () => {
    const { minimumAmount } = coupon;

    return !minimumAmount || orderPrice >= minimumAmount;
  };

  const checkAvailableTime = () => {
    const { availableTime } = coupon;

    if (!availableTime) return true;

    const [startHour, startMinute, startSecond] = availableTime.start
      .split(':')
      .map(Number);
    const [endHour, endMinute, endSecond] = availableTime.end
      .split(':')
      .map(Number);

    const start = new Date(date);
    start.setHours(startHour, startMinute, startSecond, 0);

    const end = new Date(date);
    end.setHours(endHour, endMinute, endSecond, 0);

    return date >= start && date <= end;
  };

  return checkMinimumAmount() && checkAvailableTime();
};

export default couponAvailable;
