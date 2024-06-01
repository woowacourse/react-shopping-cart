import { useRecoilValue } from "recoil";
import { selectedCouponsState } from "../store/atom/atoms";
import { checkedCartItemsSelector, OrdershippingFeeSelector } from "../store/selector/selectors";
import { calculateTotalDiscountAmount } from "../utils/couponDiscount";

export const useCartCalculator = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const selectedCoupon = useRecoilValue(selectedCouponsState);
  const shippingFee = useRecoilValue(OrdershippingFeeSelector);

  const calculateCartTotal = () => {
    return checkedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotalWithCoupon = () => {
    const cartTotal = calculateCartTotal();

    const discountAmount = calculateTotalDiscountAmount(selectedCoupon, cartTotal, checkedCartItems);
    return cartTotal + shippingFee - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};
