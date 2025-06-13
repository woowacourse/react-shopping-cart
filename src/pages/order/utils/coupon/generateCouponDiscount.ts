import { CartItem } from "../../../../shared/types/cartItem";
import { CouponResponse } from "../../../../shared/types/coupon";
import { REMOTE_AREA_DELIVERY_PRICE } from "../../constants";

interface generateCouponDiscountParams {
  coupons: CouponResponse[];
  cartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
  isRemoteArea: boolean;
}

const generateCouponDiscount = ({
  coupons,
  cartItems,
  orderPrice,
  deliveryPrice,
  isRemoteArea,
}: generateCouponDiscountParams) => {
  const calculateDiscount = (coupon: CouponResponse): number => {
    switch (coupon.discountType) {
      case "percentage":
        return coupon.discount ? orderPrice * (coupon.discount / 100) : 0;
      case "fixed":
        return coupon.discount || 0;
      case "freeShipping":
        return isRemoteArea ? deliveryPrice + REMOTE_AREA_DELIVERY_PRICE : deliveryPrice;
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

export default generateCouponDiscount;
