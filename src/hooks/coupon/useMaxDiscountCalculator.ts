import { Coupon, CouponCode } from '@appTypes/shoppingCart';
import { orderPriceSelector } from '@recoil/shoppingCart';
import { getPermutations } from '@utils/index';
import { useRecoilValue } from 'recoil';

import useCouponDiscount from './useCouponDiscount';

const useMaxDiscountCalculator = () => {
  const { calculateCouponDiscount } = useCouponDiscount();
  const orderPrice = useRecoilValue(orderPriceSelector);

  /**
   * @param discountTargetAmount 할인 쿠폰의 적용되상이 되는 금액
   * @param coupon  적용되는 쿠폰
   * @returns 쿠폰의 할인이 적용된 금액
   */
  const calculateAccumulatedDiscount = (accumulatedDiscount: number, coupon: Coupon): number => {
    const prevDiscountedAmount = orderPrice - accumulatedDiscount;
    const discount = calculateCouponDiscount(coupon.code as CouponCode, prevDiscountedAmount);
    console.log('di', discount, 'a', accumulatedDiscount);
    return accumulatedDiscount + discount;
  };

  /**
   * 쿠폰을 순차적으로 할인 적용해 총 할인금액을 계산하는 함수
   */
  const getTotalDiscountAmount = (coupons: Coupon[]): number => {
    return coupons.reduce(calculateAccumulatedDiscount, 0);
  };
  /**
   * 쿠폰들을 적용해서 최대 할인 금액을 반환하는 함수
   * @param coupons
   * @returns
   */

  const getMaxDiscountAmount = (coupons: Coupon[]): number => {
    // 쿠폰 순열
    const permutations = getPermutations(coupons);
    // 쿠폰을 조합해 최대 할인 금액 계산
    const maxDiscount = permutations.reduce((max, p) => {
      const totalDiscount = getTotalDiscountAmount(p);
      return totalDiscount > max ? totalDiscount : max;
    }, 0);

    return maxDiscount;
  };

  return { getMaxDiscountAmount };
};

export default useMaxDiscountCalculator;
