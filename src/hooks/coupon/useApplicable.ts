import { useRecoilValue } from 'recoil';
import { CartItem } from '../../types/cartItem';
import { Coupon } from '../../types/coupon';
import dayjs from './../../utils/dayjs';
import { selectedCartItems } from '../../recoil/atoms';
import { priceInfoStore } from '../../recoil/selectors';

/**
 * 상황
 * fixed -> minimumAmount를 비교해서 totalAmount보다 클 경우
 * buyXgetY -> 장바구니 상품에서 같은 종류를 3개 담았을 경우
 * freeShipping -> totalAmount가 minimumAmount 이상일 경우
 * percentage -> 현재 시간이 start ~ end 사이일 경우
 */
const useApplicable = () => {
  const selectedItems = useRecoilValue(selectedCartItems);
  const totalAmount = useRecoilValue(priceInfoStore).order;

  const isApplicable = (coupon: Coupon) => {
    if (coupon.discountType === 'fixed')
      return isApplicableFixed(coupon.minimumAmount as number, totalAmount);

    if (coupon.discountType === 'buyXgetY')
      return isApplicableBuyXGetY(coupon.buyQuantity as number, selectedItems);

    if (coupon.discountType === 'freeShipping')
      return isApplicableFreeShipping(coupon.minimumAmount as number, totalAmount);

    if (coupon.discountType === 'percentage')
      return isApplicablePercentage(
        coupon.availableTime?.start ?? '',
        coupon.availableTime?.end ?? '',
      );

    return false;
  };

  const isApplicableFixed = (minimumAmount: number, totalAmount: number) => {
    return totalAmount >= minimumAmount;
  };

  const isApplicableBuyXGetY = (buyQuantity: number, cartItems: CartItem[]) => {
    return cartItems.find(cartItem => cartItem.quantity > buyQuantity) !== undefined;
  };

  const isApplicableFreeShipping = (minimumAmount: number, totalAmount: number) => {
    return totalAmount >= minimumAmount;
  };

  const isApplicablePercentage = (start: string, end: string) => {
    const now = dayjs();
    const startTime = `${now.format('YYYY-MM-DD')}T${start}`;
    const endTime = `${now.format('YYYY-MM-DD')}T${end}`;

    const isBetween = now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime));
    const isStart = now.isSame(dayjs(startTime));
    const isEnd = now.isSame(dayjs(endTime));

    return isBetween || isStart || isEnd;
  };

  return { isApplicable };
};

export default useApplicable;
