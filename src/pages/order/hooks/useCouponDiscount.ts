import { CartItem } from "../../../types/cartItem";
import { CouponResponse } from "../../../types/coupon";

interface useCouponDiscountParams {
  coupons: CouponResponse[];
  cartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
  isRemoteArea: boolean;
}

const useCouponDiscount = ({
  coupons,
  cartItems,
  orderPrice,
  deliveryPrice,
  isRemoteArea,
}: useCouponDiscountParams) => {
  const calculateDiscount = (coupon: CouponResponse): number => {
    switch (coupon.discountType) {
      case "percentage":
        return coupon.discount ? orderPrice * (coupon.discount / 100) : 0;
      case "fixed":
        return coupon.discount || 0;
      case "freeShipping":
        return isRemoteArea ? deliveryPrice + 3000 : deliveryPrice;
      case "buyXgetY": {
        const eligibleItems = cartItems
          .filter((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!)
          .map((item) => item.product.price)
          .sort((a, b) => b - a);

        return eligibleItems[0] || 0;
      }
      default:
        return 0;
    }
  };

  return coupons.map((coupon) => ({
    ...coupon,
    discountAmount: calculateDiscount(coupon),
  }));
};

export default useCouponDiscount;
