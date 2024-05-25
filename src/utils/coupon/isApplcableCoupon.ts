import { CartItem } from '../../types/cartItem.type';
import { Coupon } from '../../types/coupon.type';

// TODO: 리펙터링
export const isApplicableCoupon = ({
  coupon,
  totalCartPrice,
  selectedCartItemList,
}: {
  coupon: Coupon;
  totalCartPrice?: number;
  selectedCartItemList?: CartItem[];
}) => {
  if (
    coupon.minimumAmount !== undefined &&
    totalCartPrice !== undefined &&
    isGreaterThanMinimumAmount(coupon.minimumAmount, totalCartPrice)
  )
    return true;
  if (
    coupon.buyQuantity !== undefined &&
    coupon.getQuantity !== undefined &&
    selectedCartItemList !== undefined &&
    isGreaterThanMinimumQuantity(coupon.buyQuantity, coupon.getQuantity, selectedCartItemList)
  )
    return true;
  if (coupon.availableTime !== undefined && isWithinTimeRange(coupon.availableTime)) return true;

  return false;
};

const isGreaterThanMinimumAmount = (minimumAmount: number, totalCartPrice: number) => {
  return minimumAmount <= totalCartPrice;
};

const isGreaterThanMinimumQuantity = (buyQuantity: number, getQuantity: number, selectedCartItemList: CartItem[]) => {
  const minimumQuantity = buyQuantity + getQuantity;

  return selectedCartItemList.some(({ quantity }) => quantity >= minimumQuantity);
};

const createTodayDateWithTIme = (time: string) => {
  const today = new Date();
  const [hours, minutes, seconds] = time.split(':').map(Number);

  today.setHours(hours, minutes, seconds, 0);

  return today;
};

const isWithinTimeRange = (availableTime: { start: string; end: string }) => {
  const startTime = createTodayDateWithTIme(availableTime.start);
  const endTime = createTodayDateWithTIme(availableTime.end);

  const current = new Date();

  return current >= startTime && current <= endTime;
};
