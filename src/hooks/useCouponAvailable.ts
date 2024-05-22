import { Coupon } from '@/types/coupon.type';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import { recipeState } from '@/store/selectors/recipeSelector';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  date: Date;
}

const useCouponAvailable = ({ coupon, date }: Props) => {
  const orderedList = useRecoilValue(orderItemState);
  const { orderPrice } = useRecoilValue(recipeState);

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

  const checkMinimumQuantity = () => {
    const { buyQuantity, getQuantity } = coupon;

    if (!buyQuantity || !getQuantity) return true;

    return orderedList.reduce((acc, cur) => {
      if (cur.quantity >= buyQuantity + getQuantity) {
        return true;
      }
      return acc;
    }, false);
  };

  return checkMinimumAmount() && checkAvailableTime() && checkMinimumQuantity();
};

export default useCouponAvailable;
