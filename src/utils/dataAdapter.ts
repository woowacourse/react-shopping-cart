import {
  BuyXGetYCouponType,
  FixedCouponType,
  FreeShippingCouponType,
  PercentageCouponType,
} from "../components/Coupon/types";
import { splitTime } from "../components/Coupon/utils";
import { DISCOUNT_TYPE_KEY } from "../constants/coupon";
import {
  BuyXGetYCouponDataType,
  CouponDataType,
  FixedCouponDataType,
  FreeShippingCouponDataType,
  PercentageCouponDataType,
} from "../types/response";

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

  return {
    ...coupon,
    expirationDate: {
      year,
      month,
      day,
    },
    availableTime: {
      start: { hour: startHour, minute: startMinute },
      end: { hour: endHour, minute: endMinute },
    },
  };
};

export const adaptCoupon = (coupon: CouponDataType) => {
  const { discountType } = coupon;
  switch (discountType) {
    case DISCOUNT_TYPE_KEY.fixed:
      return adaptFixedCoupon(coupon);

    case DISCOUNT_TYPE_KEY.buyXgetY:
      return adaptBuyXGetYCoupon(coupon);

    case DISCOUNT_TYPE_KEY.freeShipping:
      return adaptFreeShippingCoupon(coupon);

    case DISCOUNT_TYPE_KEY.percentage:
      return adaptPercentageCoupon(coupon);

    default:
      throw new Error(
        "존재하지 않는 쿠폰 타입입니다. discountType을 확인해주세요."
      );
  }
};
