import { useRecoilValue } from 'recoil';
import { CouponAvailableTimeType, Coupon } from '../type';
import { orderAmountState, totalCheckedCartItemsState } from '../recoil/selectors';

export default function useCouponValidityChecker() {
  const orderAmount = useRecoilValue(orderAmountState);
  const checkedCartItems = useRecoilValue(totalCheckedCartItemsState);

  const isCouponValid = (coupon: Coupon) => {
    const { discountType, expirationDate, availableTime, minimumAmount, buyQuantity } = coupon;

    if (!isCouponNotExpired(expirationDate)) return false;
    if (availableTime && !isCouponValidForCurrentTime(availableTime)) return false;
    if (minimumAmount && !isCouponValidForOrderAmount(minimumAmount, orderAmount)) return false;
    if (discountType === 'buyXgetY' && buyQuantity && !isCouponValidForBuyQuantity(buyQuantity))
      return false;

    return true;
  };

  const isCouponNotExpired = (expirationDate: string) => {
    return new Date(expirationDate) >= new Date();
  };

  const isCouponValidForCurrentTime = (availableTime: CouponAvailableTimeType) => {
    const [startHour, startMinute, startSecond] = availableTime.start.split(':').map(Number);
    const [endHour, endMinute, endSecond] = availableTime.end.split(':').map(Number);
    const currentTime = new Date();

    const startTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      startHour,
      startMinute,
      startSecond,
    );

    const endTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      endHour,
      endMinute,
      endSecond,
    );

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }

    return true;
  };

  const isCouponValidForOrderAmount = (minimumAmount: number, orderAmount: number) => {
    return minimumAmount <= orderAmount;
  };

  const isCouponValidForBuyQuantity = (buyQuantity: number) => {
    const maxQuantityForCheckedItems = Math.max(...checkedCartItems.map((item) => item.quantity));
    return maxQuantityForCheckedItems > buyQuantity;
  };

  return {
    isCouponValid,
  };
}
