import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";

type InvalidReason =
  | "expired"
  | "minAmount"
  | "timeRange"
  | "bogoQty"
  | "noEffect"; // 할인 금액 0
const inTimeRange = (now: Date, range: { start: string; end: string }) => {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= toMin(range.start) && cur <= toMin(range.end);
};
export const validateCoupon = (
  coupon: Coupon,
  items: CartItem[],
  orderTotal: number,
  now = new Date()
): { isValid: boolean; reason?: InvalidReason } => {
  if (coupon.expirationDate && now > coupon.expirationDate)
    return { isValid: false, reason: "expired" };

  if (coupon.minimumAmount && orderTotal < coupon.minimumAmount)
    return { isValid: false, reason: "minAmount" };

  if (coupon.availableTime && !inTimeRange(now, coupon.availableTime))
    return { isValid: false, reason: "timeRange" };

  if (
    coupon.discountType === "buyXgetY" &&
    Math.max(...items.map((item) => item.quantity)) < (coupon.buyQuantity ?? 0)
  )
    return { isValid: false, reason: "bogoQty" };

  return { isValid: true };
};
