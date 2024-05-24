import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from ".";
// import { mockCoupons } from "../../mocks";
import { mockCartItems, mockCoupons } from "../../mocks";
import {
  cartListTotalPrice,
  selectedCouponSelector,
} from "../../recoil/selectors";

const useCoupons = () => {
  //   const coupons = useRecoilValue(couponsState);
  const coupons = mockCoupons;
  //   const cartItems = useRecoilValue(cartListState);
  const cartItems = mockCartItems.content;
  const selectedCoupons = useRecoilValue(selectedCouponSelector);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const { calculateDiscountAmount } = useDiscountCalculator();

  const totalDiscountAmount = selectedCoupons.reduce((discount, coupon) => {
    const discountAmount = calculateDiscountAmount({
      coupon,
      totalAmount: totalPrice,
      cartItems,
    });

    return discount + discountAmount;
  }, 0);

  return {
    coupons,
    totalDiscountAmount,
  };
};

export default useCoupons;
