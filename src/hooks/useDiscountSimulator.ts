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

  const calculateBuyXgetYDiscount = () => {
    return selectedItems.reduce(
      (accMaxAmount, curItem) => Math.max(accMaxAmount, curItem.product.price),
      0
    );
  };

  const calculateFreeShippingDiscount = () => {
    return shippingFee;
  };

  const calculateDiscountAmount = (coupon: CouponType) => {
    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon);
      case "percentage":
        return calculatePercentageDiscount(coupon, orderPrice);
      case "buyXgetY":
        return calculateBuyXgetYDiscount();
      case "freeShipping":
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
