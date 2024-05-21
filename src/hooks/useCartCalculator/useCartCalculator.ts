import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from "../useDiscountCalculator/useDiscountCalculator";
import { cartItemsAtom, couponsAtom } from "../../recoil/atom/atom";

export const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const coupons = useRecoilValue(couponsAtom);
  const { calculateDiscountAmount } = useDiscountCalculator();

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotalWithCoupon = (couponCode: string) => {
    const cartTotal = calculateCartTotal();
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) return cartTotal;

    const discountAmount = calculateDiscountAmount(coupon, cartTotal);
    return cartTotal - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};
