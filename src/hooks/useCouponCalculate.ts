import { COUPON_DISCOUNT_TYPE, SHIPPING_CONSTANT } from "@/constants";
import { cartState, isExtraShippingFeeState } from "@/store/atom/atoms";
import { orderAmountState } from "@/store/selector/selectors";
import { useRecoilValue } from "recoil";

const useCalculatePercent = (coupons: Coupon[]) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const percentCoupon = coupons.find(
    (coupon): coupon is DiscountCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.Percentage
  );
  if (percentCoupon && (!percentCoupon.minimumAmount || percentCoupon.minimumAmount <= orderAmount)) {
    return (orderAmount * percentCoupon?.discount) / 100;
  }
  return 0;
};

const useCalculateFixed = (coupons: Coupon[]) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const fixedCoupon = coupons.find(
    (coupon): coupon is DiscountCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.Fixed
  );
  if (fixedCoupon && (!fixedCoupon.minimumAmount || fixedCoupon.minimumAmount <= orderAmount)) {
    return fixedCoupon.discount;
  }
  return 0;
};

const useCalculatePresent = (coupons: Coupon[]) => {
  const cartItems = useRecoilValue(cartState);
  const buyXgetYCoupon = coupons.find(
    (coupon): coupon is BOGOCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.BuyXgetY
  );
  if (!buyXgetYCoupon) return 0;
  const findExpensiveItemAmount = () => {
    let getItemAmount = 0;
    cartItems.forEach((item) => {
      if (item.quantity >= buyXgetYCoupon.buyQuantity && item.product.price > getItemAmount) {
        getItemAmount = item.product.price;
      }
    });
    return getItemAmount;
  };
  return findExpensiveItemAmount() * buyXgetYCoupon.getQuantity;
};

const useCalculateFreeShipping = (coupons: Coupon[]) => {
  const orderAmount = useRecoilValue(orderAmountState);
  const isExtraShippingFee = useRecoilValue(isExtraShippingFeeState);
  const freeShippingCoupon = coupons.find(
    (coupon): coupon is FreeShippingCoupon => coupon.discountType === COUPON_DISCOUNT_TYPE.FreeShipping
  );
  if (
    freeShippingCoupon &&
    orderAmount < SHIPPING_CONSTANT.FREE_CRITERIA &&
    (!freeShippingCoupon.minimumAmount || orderAmount >= freeShippingCoupon.minimumAmount)
  ) {
    const discountShipFee = SHIPPING_CONSTANT.FEE + (isExtraShippingFee ? SHIPPING_CONSTANT.EXTRA_FEE : 0);
    return discountShipFee;
  }
  return 0;
};

const useCouponCalculate = (coupons: Coupon[]): { discountAmount: number } => {
  const calculateLogicList: ((coupons: Coupon[]) => number)[] = [
    useCalculatePercent,
    useCalculateFixed,
    useCalculatePresent,
    useCalculateFreeShipping,
  ];
  const discountAmount = calculateLogicList.reduce((acc, calculateFn) => acc + calculateFn(coupons), 0);
  return { discountAmount };
};

export default useCouponCalculate;
