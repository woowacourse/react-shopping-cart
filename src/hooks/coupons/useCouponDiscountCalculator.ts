import { COUPON_DISCOUNT_TYPE } from '../../constants/constants';
import { Coupon } from '../../api/get/getCoupons';
import { selectedCartItems, shippingFeeState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

export const useCouponDiscountCalculator = (coupons: Coupon[]) => {
  const shippingFeeInfo = useRecoilValue(shippingFeeState);
  const selectedItems = useRecoilValue(selectedCartItems);

  const calculateFixedDiscount = (coupon: Coupon) => {
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, orderTotal: number) => {
    return Math.floor((orderTotal * (coupon.discount ?? 0)) / 100);
  };

  const calculateFreeShippingAmount = () => {
    return shippingFeeInfo.shipping;
  };

  const calculateGetOneDiscount = () => {
    const mostExpensivePrice = selectedItems.reduce((max, item) => {
      return item.price > max ? item.price : max;
    }, 0);

    return mostExpensivePrice;
  };

  const calculateDiscountAmount = (coupon: Coupon, orderTotal) => {
    switch (coupon.discountType) {
      case COUPON_DISCOUNT_TYPE.FIXED:
        return calculateFixedDiscount(coupon);
      case COUPON_DISCOUNT_TYPE.PERCENTAGE:
        return calculatePercentageDiscount(coupon, orderTotal);
      case COUPON_DISCOUNT_TYPE.BUY_X_GET_Y:
        return calculateGetOneDiscount();
      case COUPON_DISCOUNT_TYPE.FREE_SHIPPING:
        return calculateFreeShippingAmount();
      default:
        return 0;
    }
  };

  const applyPercentageDiscountFirst = (orderTotal: number, coupons: Coupon[]) => {
    let discountedAmount = orderTotal;
    // NOTE: 가장 할인 금액이 큰 경우를 만들어야 하므로 퍼센테이지 할인 쿠폰을 먼저 적용
    const percentageCoupon = coupons.find(
      coupon => coupon.discountType === COUPON_DISCOUNT_TYPE.PERCENTAGE,
    );

    if (percentageCoupon) {
      discountedAmount -= calculateDiscountAmount(percentageCoupon, orderTotal);
    }

    const remainingCoupons = coupons.filter(
      coupon => coupon.discountType !== COUPON_DISCOUNT_TYPE.PERCENTAGE,
    );
    remainingCoupons.forEach(coupon => {
      discountedAmount -= calculateDiscountAmount(coupon, discountedAmount);
    });
    return discountedAmount;
  };

  const calculateBestDiscount = (orderTotal: number) => {
    if (coupons.length === 0) return 0;

    const finalAmount = applyPercentageDiscountFirst(orderTotal, coupons);
    return orderTotal - finalAmount; // 할인이 적용된 금액
  };

  return {
    calculateDiscountAmount,
    calculateBestDiscount,
  };
};

export default useCouponDiscountCalculator;
