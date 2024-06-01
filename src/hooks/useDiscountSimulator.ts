import { COUPON_DISCOUNT_TYPE } from "@/constants/system";
import { CouponType } from "@/types/coupon.type";
import { orderSummaryState } from "@/store/selectors/summarySelector/orderSummarySelector";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import { useRecoilValue } from "recoil";

const useDiscountSimulator = () => {
  const { orderPrice, shippingFee } = useRecoilValue(orderSummaryState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const calculateFixedDiscount = (coupon: CouponType) => {
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (
    coupon: CouponType,
    totalAmount: number
  ) => {
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateBuyXgetYDiscount = (coupon: CouponType) => {
    const minimumQuantity =
      coupon.buyQuantity &&
      coupon.getQuantity &&
      coupon.buyQuantity + coupon.getQuantity;

    if (!minimumQuantity) {
      return 0;
    }

    const mostExpensiveItem = selectedItems.reduce((accMaxAmount, curItem) => {
      if (minimumQuantity <= curItem.quantity) {
        return Math.max(accMaxAmount, curItem.product.price);
      }
      return accMaxAmount;
    }, 0);

    return mostExpensiveItem * (coupon.getQuantity ?? 0);
  };

  const calculateFreeShippingDiscount = () => {
    return shippingFee;
  };

  const calculateDiscountAmount = (coupon: CouponType) => {
    switch (coupon.discountType) {
      case COUPON_DISCOUNT_TYPE.fixed:
        return calculateFixedDiscount(coupon);
      case COUPON_DISCOUNT_TYPE.percentage:
        return calculatePercentageDiscount(coupon, orderPrice);
      case COUPON_DISCOUNT_TYPE.buyXgetY:
        return calculateBuyXgetYDiscount(coupon);
      case COUPON_DISCOUNT_TYPE.freeShipping:
        return calculateFreeShippingDiscount();
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default useDiscountSimulator;
