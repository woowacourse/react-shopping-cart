import { useRecoilValue } from 'recoil';
import { couponsState } from '../recoil/atoms';
import { useDiscountCalculator } from './useDiscountCalculator';
import { orderItemsSelector } from '../recoil/selectors';

export const useOrderCalculator = () => {
  const orderItems = useRecoilValue(orderItemsSelector);
  const coupons = useRecoilValue(couponsState);
  const { calculateDiscountAmount } = useDiscountCalculator();
  /**
   * orderItemsSelector value 순회하며 총합 계산
   * @returns { number }
   */
  const calculateOrderTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  /**
   * 쿠폰으로 할인되는 금액 반환
   * @returns { number }
   */
  const calculateDiscountWithCoupon = () => {
    const checkedCoupons = coupons.filter((coupon) => coupon.isChecked);

    const orderTotal = calculateOrderTotal();
    const discountAmount = checkedCoupons.reduce(
      (total, coupon) => total + calculateDiscountAmount(coupon, orderTotal),
      0,
    );
    return discountAmount;
  };

  /**
   * 주문 금액에서 쿠폰으로 할인되는 금액을 뺀 값 반환
   * @returns { number }
   */
  const calculateTotalWithCoupon = () => {
    const orderTotal = calculateOrderTotal();
    const discountAmount = calculateDiscountWithCoupon();
    const deliveryFee = calculateDeliveryFee();
    return orderTotal - discountAmount + deliveryFee;
  };

  /**
   * 배송비 계산
   * @returns { number }
   */
  const calculateDeliveryFee = () => {
    const orderTotal = calculateOrderTotal();
    const deliveryFee = orderTotal > 100000 ? 0 : 3000;
    return deliveryFee;
  };

  return {
    calculateOrderTotal,
    calculateDiscountWithCoupon,
    calculateDeliveryFee,
    calculateTotalWithCoupon,
  };
};
