import { CouponResponse } from "../types/Coupon";

export default function calculateDisableCoupon(
  coupon: CouponResponse,
  opts: {
    couponIds: number[];
    allProductPrice: number;
    shippingFee: number;
    selectedItems: { quantity: number }[];
    now: Date;
  }
) {
  const { couponIds, allProductPrice, shippingFee, selectedItems, now } = opts;
  const isChecked = couponIds.includes(coupon.id);

  if (!isChecked && couponIds.length >= 2) return true;

  if (
    (coupon.discountType === "fixed" ||
      coupon.discountType === "freeShipping") &&
    allProductPrice < coupon.minimumAmount
  )
    return true;

  if (coupon.discountType === "freeShipping" && shippingFee === 0) return true;

  if (
    coupon.discountType === "buyXgetY" &&
    !selectedItems.some(
      (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
    )
  )
    return true;

  if (coupon.discountType === "percentage" && coupon.availableTime) {
    const [sh, sm] = coupon.availableTime.start.split(":").map(Number);
    const [eh, em] = coupon.availableTime.end.split(":").map(Number);
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      sh,
      sm
    );
    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      eh,
      em
    );
    if (now < startTime || now > endTime) return true;
  }

  return false;
}
