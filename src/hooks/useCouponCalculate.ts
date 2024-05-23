import { COUPON_DISCOUNT_TYPE } from "@/constants";
import { cartState } from "@/store/atom/atoms";
import { orderAmountState } from "@/store/selector/selectors";
import { useRecoilValue } from "recoil";

const useCouponCalculate = (coupons: Coupon[]) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const cartItems = useRecoilValue(cartState);
  let discountAmount = 0;

  // 1. 퍼센트 우선 계산
  const percentCoupon = coupons.find(
    (coupon): coupon is DiscountCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.Percentage
  );
  if (percentCoupon && (!percentCoupon.minimumAmount || percentCoupon.minimumAmount <= orderAmount)) {
    discountAmount += (orderAmount * percentCoupon?.discount) / 100;
  }
  // 2. 고정할인
  const fixedCoupon = coupons.find(
    (coupon): coupon is DiscountCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.Fixed
  );
  if (fixedCoupon && (!fixedCoupon.minimumAmount || fixedCoupon.minimumAmount <= orderAmount)) {
    discountAmount += fixedCoupon.discount;
  }
  // 3. 제공할인
  const buyXgetYCoupon = coupons.find(
    (coupon): coupon is BOGOCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.BuyXgetY
  );
  if (buyXgetYCoupon) {
    let getItemAmount = 0;
    cartItems.forEach((item) => {
      if (item.quantity >= buyXgetYCoupon.buyQuantity && item.product.price > getItemAmount) {
        getItemAmount = item.product.price;
      }
    });
    discountAmount += getItemAmount * buyXgetYCoupon.getQuantity;
  }
  // 4. 무료배송 할인

  return { discountAmount };
};

export default useCouponCalculate;
