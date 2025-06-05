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
import { convertTo12Hour, splitTime } from "./time";

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
  const { hour: rowStartHour, minute: startMinute } = splitTime(
    availableTime.start
  );
  const { hour: rowEndHour, minute: endMinute } = splitTime(availableTime.end);
  const { period: startPeriod, hour: startHour } =
    convertTo12Hour(rowStartHour);
  const { period: endPeriod, hour: endHour } = convertTo12Hour(rowEndHour);

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
    availableTime: {
      start: { period: startPeriod, hour: startHour, minute: startMinute },
      end: { period: endPeriod, hour: endHour, minute: endMinute },
    },
  };
};
