import { Coupon } from '@/types/coupon.type';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import { orderRecipeState } from '@/store/selectors/orderRecipeSelector';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  date: Date;
}

const useCouponAvailable = ({ coupon, date }: Props) => {
  const orderedList = useRecoilValue(orderItemState);
  const { orderPrice } = useRecoilValue(orderRecipeState);
  if (coupon === null) return false;

  const checkMinimumAmount = () => {
    const { minimumAmount } = coupon;

    return !minimumAmount || orderPrice >= minimumAmount;
  };

  const checkAvailableTime = () => {
    const { availableTime } = coupon;
    if (!availableTime) return true;

    const start = new Date(`${date.toDateString()} ${availableTime.start}`);
    const end = new Date(`${date.toDateString()} ${availableTime.end}`);

    return date >= start && date <= end;
  };

  const checkMinimumQuantity = () => {
    const { buyQuantity, getQuantity } = coupon;
    if (!buyQuantity || !getQuantity) return true;

    return orderedList.some((cur) => cur.quantity >= buyQuantity + getQuantity);
  };

  return checkMinimumAmount() && checkAvailableTime() && checkMinimumQuantity();
};

export default useCouponAvailable;
