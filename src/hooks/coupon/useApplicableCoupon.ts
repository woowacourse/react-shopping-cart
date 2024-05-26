import { useRecoilValue } from 'recoil';
import { CartItem } from '@type/cartItem';
import {
  BuyXGetYCoupon,
  Coupon,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from '@type/coupon';
import dayjs from '@utils/dayjs';
import { selectedCartItems } from '@recoil/atoms';
import usePriceInfo from '@hooks/usePriceInfo';

const isApplicableFixed = (minimumAmount: number, totalAmount: number) => {
  return totalAmount >= minimumAmount;
};

const isApplicableBuyXGetY = (buyQuantity: number, cartItems: CartItem[]) => {
  return cartItems.find(cartItem => cartItem.quantity > buyQuantity) !== undefined;
};

const isApplicableFreeShipping = (minimumAmount: number, totalAmount: number) => {
  return totalAmount >= minimumAmount;
};

const isApplicablePercentage = (start: string, end: string, now: dayjs.Dayjs) => {
  const startTime = `${now.format('YYYY-MM-DD')}T${start}`;
  const endTime = `${now.format('YYYY-MM-DD')}T${end}`;

  const isBetween = now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime));
  const isStart = now.isSame(dayjs(startTime));
  const isEnd = now.isSame(dayjs(endTime));

  return isBetween || isStart || isEnd;
};

/**
 * 상황
 * fixed -> minimumAmount를 비교해서 totalAmount보다 클 경우
 * buyXgetY -> 장바구니 상품에서 같은 종류를 2개 담았을 경우
 * freeShipping -> totalAmount가 minimumAmount 이상일 경우
 * percentage -> 현재 시간이 start ~ end 사이일 경우
 */
const useApplicableCoupon = (now: dayjs.Dayjs = dayjs()) => {
  const selectedItems = useRecoilValue(selectedCartItems);
  const totalAmount = usePriceInfo().order;

  const isApplicable = (coupon: Coupon) => {
    if (coupon.discountType === 'fixed')
      return isApplicableFixed((coupon as FixedCoupon).minimumAmount as number, totalAmount);

    if (coupon.discountType === 'buyXgetY')
      return isApplicableBuyXGetY((coupon as BuyXGetYCoupon).buyQuantity as number, selectedItems);

    if (coupon.discountType === 'freeShipping')
      return isApplicableFreeShipping(
        (coupon as FreeShippingCoupon).minimumAmount as number,
        totalAmount,
      );

    if (coupon.discountType === 'percentage') {
      const percentageCoupon = coupon as PercentageCoupon;
      return isApplicablePercentage(
        percentageCoupon.availableTime.start ?? '',
        percentageCoupon.availableTime.end ?? '',
        now,
      );
    }

    return false;
  };

  return { isApplicable };
};

export default useApplicableCoupon;
