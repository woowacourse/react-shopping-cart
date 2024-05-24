import { useRecoilValue } from 'recoil';
import { Coupon } from '../types/Coupon';
import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';
import { orderItemsSelector } from '../recoil/selectors';
import { useCouponFinder } from './useCouponFinder';

export const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { findCouponByCode } = useCouponFinder();
  const orderItems = useRecoilValue(orderItemsSelector);

  /**
   * 고정값을 할인하는 쿠폰의 할인 금액 반환
   * @returns { number }
   */
  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  /**
   * 퍼센트 할인하는 쿠폰의 할인 금액 반환
   * @returns { number }
   */
  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  /**
   * 여러 개 구매 시 getQuantity개 수량에 해당하는 금액 차감
   * 여러 개 구매하는 상품 종류가 다수일 경우, 가장 큰 금액의 상품을 선택하여 계산
   * @returns {number}
   */
  const calculateBuyXGetYDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    const foundCoupon = findCouponByCode(coupon.code);
    if (!foundCoupon || foundCoupon.getQuantity === undefined) return 0;
    const getQuantity = foundCoupon.getQuantity;

    const eligibleItems = orderItems.filter((item) => item.quantity >= 2);
    const maxPriceItem = eligibleItems.reduce((maxItem, currentItem) => {
      return currentItem.product.price > maxItem.product.price
        ? currentItem
        : maxItem;
    }, eligibleItems[0]);

    return maxPriceItem ? maxPriceItem.product.price * getQuantity : 0;
  };

  /**
   * 쿠폰과 총 금액을 받고, 쿠폰이 유효한지 확인한 뒤
   * 쿠폰의 discountType에 따라 할인되는 금액을 반환
   * @returns { number }
   */
  const calculateDiscountAmount = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date(),
  ) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case 'percentage':
        return calculatePercentageDiscount(coupon, totalAmount);
      case 'fixed':
        return calculateFixedDiscount(coupon, totalAmount);
      case 'buyXgetY':
        return calculateBuyXGetYDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
