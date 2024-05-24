import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from ".";
import { cartListState, couponsState } from "../../recoil/atoms";
import { cartListTotalPrice } from "./../../recoil/selectors";

const useCartCalculator = () => {
  const cartItems = useRecoilValue(cartListState);
  const coupons = useRecoilValue(couponsState);
  const { calculateDiscountAmount } = useDiscountCalculator();
  const totalAmount = useRecoilValue(cartListTotalPrice);
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotalWithCoupon = (couponCode: string) => {
    const cartTotal = calculateCartTotal();
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) return cartTotal;

    const discountAmount = calculateDiscountAmount({
      coupon,
      totalAmount,
      cartItems,
    });
    return cartTotal - discountAmount;
  };

  return {
    calculateCartTotal,
    calculateTotalWithCoupon,
  };
};

export default useCartCalculator;
