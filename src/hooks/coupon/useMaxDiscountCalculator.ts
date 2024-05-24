import { Coupon } from '@appTypes/shoppingCart';
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
    const discount = calculateCouponDiscount(coupon.code, prevDiscountedAmount);

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

  const isPercentageCoupon = (coupons: Coupon[]) => {
    return coupons.some((coupon) => coupon.discountType === 'percentage');
  };

  /**
   * 쿠폰 순서에 따라 금액이 달라지는 경우, 순열을 사용해 다양한 쿠폰 순서 조합에 따라 최대 할인금액을 계산하는 함수
   * @param coupons
   * @returns
   */
  const getPermutationsMaxDiscountAmount = (coupons: Coupon[]) => {
    // 쿠폰 순열
    const permutations = getPermutations(coupons);

    const maxDiscount = permutations.reduce((max, p) => {
      const totalDiscount = getTotalDiscountAmount(p);
      return totalDiscount > max ? totalDiscount : max;
    }, 0);

    return maxDiscount;
  };

  /**
   * percentage 타입의 쿠폰이 있는 경우, 순열을 사용해 최대 할인 금액을 계산하고 그렇지 않을 경우에는 파라미터로 받은 쿠폰 순서대로 최대 할인 금액을 계산하는 함수
   * @param coupons 선택한 쿠폰들
   */
  const getMaxDiscountAmount = (coupons: Coupon[]): number => {
    return isPercentageCoupon(coupons) ? getPermutationsMaxDiscountAmount(coupons) : getTotalDiscountAmount(coupons);
  };

  return { getMaxDiscountAmount };
};

export default useMaxDiscountCalculator;
