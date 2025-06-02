import { FREE_SHIPPING_OVER } from "@/constants/priceSetting";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";

export type InvalidReason =
  | "expired"
  | "minAmount"
  | "timeRange"
  | "bogoQty"
  | "noEffect";

const inTimeRange = (now: Date, range: { start: string; end: string }) => {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= toMin(range.start) && cur <= toMin(range.end);
};
const isBogoable = (coupon: Coupon, items: CartItem[]) => {
  // 각 아이템별로, 해당 상품 quantity가 buyQuantity 이상인 항목이 하나라도 있으면 유효
  return items.some((item) => item.quantity >= (coupon.buyQuantity ?? 0));
};
const isExpired = (coupon: Coupon, now: Date) => {
  return !!coupon.expirationDate && now > coupon.expirationDate;
};
const isMinAmount = (coupon: Coupon, items: CartItem[]) => {
  const orderTotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return coupon.minimumAmount && orderTotal < coupon.minimumAmount;
};
const isNoEffect = (items: CartItem[]) => {
  const orderTotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return orderTotal >= FREE_SHIPPING_OVER;
};
export const validateCoupon = (
  coupon: Coupon,
  items: CartItem[],
  now = new Date()
): { isValid: boolean; invalidReason?: InvalidReason } => {
  if (isExpired(coupon, now))
    return { isValid: false, invalidReason: "expired" };

  if (coupon.minimumAmount && isMinAmount(coupon, items))
    return { isValid: false, invalidReason: "minAmount" };
  if (coupon.availableTime && !inTimeRange(now, coupon.availableTime))
    return { isValid: false, invalidReason: "timeRange" };

  if (coupon.discountType === "buyXgetY" && !isBogoable(coupon, items))
    return { isValid: false, invalidReason: "bogoQty" };
  if (coupon.discountType === "freeShipping" && isNoEffect(items)) {
    return { isValid: false, invalidReason: "noEffect" };
  }
  return { isValid: true };
};
