import { CartItemCheckType } from "../../hooks/useCartAPI";
import { Coupon } from "../../types/response";
import getCurrentTime, { CurrentTime } from "../getCurrentTIme";

const isExpired = (
  expirationDate: string,
  currentTime: Omit<CurrentTime, "currentHour">
): boolean => {
  const { currentYear, currentMonth, currentDate } = currentTime;

  const [yearStr, monthStr, dayStr] = expirationDate.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (year < currentYear) return true;
  if (year === currentYear && month < currentMonth) return true;
  if (year === currentYear && month === currentMonth && day < currentDate)
    return true;

  return false;
};

const isMorningTime = (
  availableTime: { start: string; end: string },
  currentHour: number
) => {
  const [startHour] = availableTime.start.split(":").map(Number);
  const [endHour] = availableTime.end.split(":").map(Number);

  return currentHour >= startHour && currentHour < endHour;
};

const isMoreThanMinimumAmount = (minimumAmount: number, orderPrice: number) => {
  if (!minimumAmount) return true;

  return minimumAmount <= orderPrice;
};

export const isFreeShippingAvailable = (
  coupon: Coupon,
  orderPrice: number
): boolean => {
  if (coupon.discountType !== "freeShipping") return false;

  const { minimumAmount } = coupon;
  return minimumAmount ? orderPrice >= minimumAmount : true;
};

export const isCouponAvailable = (
  cartItemsCheckData: CartItemCheckType[],
  coupon: Coupon,
  orderPrice: number
) => {
  const {
    expirationDate,
    availableTime,
    discountType,
    buyQuantity,
    getQuantity,
  } = coupon;

  const { currentYear, currentMonth, currentDate, currentHour } =
    getCurrentTime();

  const notExpired = !isExpired(expirationDate, {
    currentYear,
    currentMonth,
    currentDate,
  });

  if (!notExpired) return false;

  switch (discountType) {
    case "fixed":
    case "percentage":
      if (
        coupon.minimumAmount !== undefined &&
        !isMoreThanMinimumAmount(Number(coupon.minimumAmount), orderPrice)
      ) {
        return false;
      }
      break;

    case "freeShipping":
      if (!isFreeShippingAvailable(coupon, orderPrice)) return false;
      break;
    case "buyXgetY": {
      if (!buyQuantity || !getQuantity) return false;

      const hasEligibleItems = cartItemsCheckData.some(
        (item) => item.quantity === buyQuantity + getQuantity
      );

      if (!hasEligibleItems) return false;
      break;
    }
    default:
      return false;
  }

  if (availableTime && !isMorningTime(availableTime, currentHour)) {
    return false;
  }
  return true;
};
