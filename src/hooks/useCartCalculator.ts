import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { selectedCouponsState } from "../store/atom/atoms";
import { checkedCartItemsSelector, shippingFeeSelector } from "../store/selector/selectors";

export const useCartCalculator = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const selectedCoupon = useRecoilValue(selectedCouponsState);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const { calculateTotalDiscountAmount } = useDiscountCalculator();

  const calculateCartTotal = () => {
    return checkedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotalWithCoupon = () => {
    const cartTotal = calculateCartTotal();

    const discountAmount = calculateTotalDiscountAmount(selectedCoupon);
    return cartTotal + shippingFee - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};
