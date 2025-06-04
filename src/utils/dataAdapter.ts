import {
  BuyXGetYCouponDataType,
  BuyXGetYCouponType,
  FixedCouponDataType,
  FixedCouponType,
  FreeShippingCouponDataType,
  FreeShippingCouponType,
  PercentageCouponDataType,
  PercentageCouponType,
} from "../types/response";
import { decideHourPeriod, splitTime } from "./time";

export const adaptFixedCoupon = (
  coupon: FixedCouponDataType
): FixedCouponType => {
  const { expirationDate } = coupon;
  const [year, month, day] = expirationDate.split("-");

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
  };
};

export const adaptBuyXGetYCoupon = (
  coupon: BuyXGetYCouponDataType
): BuyXGetYCouponType => {
  const { expirationDate } = coupon;
  const [year, month, day] = expirationDate.split("-");

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
  };
};

export const adaptFreeShippingCoupon = (
  coupon: FreeShippingCouponDataType
): FreeShippingCouponType => {
  const { expirationDate } = coupon;
  const [year, month, day] = expirationDate.split("-");

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
  };
};

export const adaptPercentageCoupon = (
  coupon: PercentageCouponDataType
): PercentageCouponType => {
  const { expirationDate, availableTime } = coupon;
  const [year, month, day] = expirationDate.split("-");
  const { hour: startHour, minute: startMinute } = splitTime(
    availableTime.start
  );
  const { hour: endHour, minute: endMinute } = splitTime(availableTime.end);
  const startPeriod = decideHourPeriod(startHour);
  const endPeriod = decideHourPeriod(endHour);

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
    availableTime: {
      start: { hourPeriod: startPeriod, hour: startHour, minute: startMinute },
      end: { hourPeriod: endPeriod, hour: endHour, minute: endMinute },
    },
  };
};
