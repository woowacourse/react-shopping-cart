import { cartListQuantitySelector } from "@/recoil/cartItemQuantity";
import { couponListSelector } from "@/recoil/coupons";
import { useRecoilValue } from "recoil";

const useBuyXgetYCoupon = () => {
  const couponsInfo = useRecoilValue(couponListSelector);
  const targetCouponInfo = couponsInfo.find(
    (coupon) => coupon.discountType === "buyXgetY"
  )!;
  const totalItemQuantity = useRecoilValue(cartListQuantitySelector);

  const checkBuyXgetY = () => {
    if (targetCouponInfo.buyQuantity && targetCouponInfo.getQuantity) {
      const minCountForCoupon =
        targetCouponInfo.buyQuantity + targetCouponInfo.getQuantity;

      const applicableItems = totalItemQuantity.filter((itemWithQuantity) => {
        return itemWithQuantity.quantity >= minCountForCoupon;
      });

      return applicableItems;
    }
    return [];
  };

  const getMaxPriceItem = () => {
    const items = checkBuyXgetY();
    if (items) {
      const maxDiscount = items.reduce((acc, item) => {
        const itemPrice = item.item.product.price!;
        acc = Math.max(acc, itemPrice);
        return acc;
      }, 0);
      return maxDiscount;
    }
    return 0;
  };

  return { checkBuyXgetY, getMaxPriceItem };
};

export default useBuyXgetYCoupon;
