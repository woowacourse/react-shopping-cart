import { useCouponListContext } from "../contexts/CouponContext";
import CartItem from "../types/CartItem";
import {
  CouponResponse,
  FixedCoupon,
  FreeShippingCoupon,
} from "../types/Coupon";

export function calculateCouponDiscounts(
  couponsId: CouponResponse["id"][],
  orderAmount: number,
  cartItems: CartItem[],
  shippingFee: number,
  now: Date = new Date()
) {
  const { couponList } = useCouponListContext();

  let fixed = 0;
  let bogo = 0;
  let freeShipping = 0;
  let timeSale = 0;

  const notExpired = (coupon: CouponResponse) => {
    return now.getTime() <= new Date(coupon.expirationDate).getTime();
  };

  const meetsMin = (couponId: FixedCoupon | FreeShippingCoupon) =>
    couponId.minimumAmount !== undefined
      ? orderAmount >= couponId.minimumAmount
      : true;

  for (const couponId of couponsId) {
    const coupon = couponList.find((coupon) => coupon.id === couponId)!;
    if (!notExpired(coupon)) continue;

    switch (coupon.discountType) {
      case "fixed":
        if (meetsMin(coupon)) {
          fixed += coupon.discount;
        }
        break;

      case "buyXgetY":
        const eligible = cartItems.filter(
          (i) => i.quantity > coupon.buyQuantity!
        );
        if (eligible.length > 0) {
          const maxItem = eligible.reduce((prev, cur) =>
            cur.product.price > prev.product.price ? cur : prev
          );
          bogo += maxItem.product.price * coupon.getQuantity!;
        }

        break;

      case "freeShipping":
        if (meetsMin(coupon)) {
          freeShipping += shippingFee;
        }
        break;

      case "percentage":
        const [startHourStr] = coupon.availableTime.start.split(":");
        const [endHourStr] = coupon.availableTime.end.split(":");

        const startHour = parseInt(startHourStr, 10); // "04" → 4
        const endHour = parseInt(endHourStr, 10); // "07" → 7
        const h = now.getHours();
        if (h >= startHour && h < endHour) {
          timeSale += Math.floor(orderAmount * coupon.discount);
        }

        break;
    }
  }

  return fixed + bogo + freeShipping + timeSale;
}
