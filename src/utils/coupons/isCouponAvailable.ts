import { CartItemCheckType } from "../../hooks/useCartAPI";
import { Coupon } from "../../types/response";
import getCurrentTime from "../getCurrentTime";

const isExpired = (expirationDate: string, now: Date): boolean => {
  return new Date(expirationDate) < now;
};

const isValidTime = (
  availableTime: { start: string; end: string } | undefined,
  currentHour: number
): boolean => {
  if (!availableTime) return true;

  const [startHour] = availableTime.start.split(":").map(Number);
  const [endHour] = availableTime.end.split(":").map(Number);

  return currentHour >= startHour && currentHour < endHour;
};

const isValidMinAmount = (
  minimumAmount: number | undefined,
  orderPrice: number
): boolean => {
  if (!minimumAmount) return true;
  return minimumAmount <= orderPrice;
};

const isValidFreeShipping = (coupon: Coupon, orderPrice: number): boolean => {
  if (coupon.discountType !== "freeShipping") return false;
  return isValidMinAmount(coupon.minimumAmount, orderPrice);
};

const isValidBuyXGetY = (
  coupon: Coupon,
  cartItemsCheckData: CartItemCheckType[]
): boolean => {
  const { buyQuantity, getQuantity } = coupon;

  if (!buyQuantity || !getQuantity) return false;

  return cartItemsCheckData.some(
    (item) => item.quantity === buyQuantity + getQuantity
  );
};

const isValidDiscountType = (
  coupon: Coupon,
  orderPrice: number,
  cartItemsCheckData: CartItemCheckType[]
): boolean => {
  const { discountType } = coupon;

  switch (discountType) {
    case "fixed":
    case "percentage":
      return isValidMinAmount(coupon.minimumAmount, orderPrice);

    case "freeShipping":
      return isValidFreeShipping(coupon, orderPrice);

    case "buyXgetY":
      return isValidBuyXGetY(coupon, cartItemsCheckData);

    default:
      return false;
  }
};

export const isFreeShippingAvailable = (
  coupon: Coupon,
  orderPrice: number
): boolean => {
  return isValidFreeShipping(coupon, orderPrice);
};

export const isCouponAvailable = (
  cartItemsCheckData: CartItemCheckType[],
  coupon: Coupon,
  orderPrice: number
): boolean => {
  const { expirationDate, availableTime } = coupon;
  const { currentHour } = getCurrentTime();
  const now = new Date();

  if (isExpired(expirationDate, now)) return false;

  if (!isValidTime(availableTime, currentHour)) return false;

  if (!isValidDiscountType(coupon, orderPrice, cartItemsCheckData))
    return false;

  return true;
};
