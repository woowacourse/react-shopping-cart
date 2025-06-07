import type {
  CartItemType,
  CouponType,
  BogoCoupon,
  AvailableTime,
} from "../../types/response";

const validateExpirationDate = (expirationDate: string) => {
  const today = new Date();
  const expirationDateObj = new Date(expirationDate);

  return expirationDateObj > today;
};

const validateMinimumAmount = (
  originTotalPrice: number,
  minimumOrderAmount: number
) => {
  return originTotalPrice >= minimumOrderAmount;
};

const validateMiracleHour = (availableTime: AvailableTime) => {
  const now = new Date();
  const start = new Date(availableTime.start);
  const end = new Date(availableTime.end);

  return now >= start && now <= end;
};

export const validateFreeShippingCoupon = (deliveryFee: number) => {
  return deliveryFee > 0;
};

export const validateBogoCoupon = (
  orderItems: CartItemType[],
  coupon: BogoCoupon
) => {
  return orderItems.some((item) => item.quantity >= coupon.buyQuantity);
};

export const getValidExpirationCoupons = (couponList: CouponType[]) => {
  return couponList.filter((coupon) => {
    if (!("expirationDate" in coupon)) return true;
    return validateExpirationDate(coupon.expirationDate);
  });
};

const getValidMinimumAmountCoupons = (
  couponList: CouponType[],
  { originOrderPrice }: { originOrderPrice: number }
) => {
  return couponList.filter((coupon) => {
    if (!("minimumAmount" in coupon)) return true;
    return validateMinimumAmount(originOrderPrice, coupon.minimumAmount);
  });
};

const getValidMiracleHourCoupons = (couponList: CouponType[]) => {
  return couponList.filter((coupon) => {
    if (!("availableTime" in coupon)) return true;
    return validateMiracleHour(coupon.availableTime);
  });
};

const getValidFreeShippingCoupons = (
  couponList: CouponType[],
  { deliveryFee }: { deliveryFee: number }
) => {
  return couponList.filter((coupon: CouponType) => {
    if (coupon.discountType !== "freeShipping") return true;
    return validateFreeShippingCoupon(deliveryFee);
  });
};

export const getValidBogoCoupons = (
  couponList: CouponType[],
  { orderItems }: { orderItems: CartItemType[] }
) => {
  return couponList.filter((coupon) => {
    if (!("buyQuantity" in coupon)) return true;
    return validateBogoCoupon(orderItems, coupon);
  });
};

interface CouponValidatorContext {
  originOrderPrice: number;
  orderItems: CartItemType[];
  deliveryFee: number;
}

type CouponValidator = (
  couponList: CouponType[],
  context: CouponValidatorContext
) => CouponType[];

export const getAllValidCoupons = (
  couponList: CouponType[],
  { originOrderPrice, orderItems, deliveryFee }: CouponValidatorContext
): CouponType[] => {
  const validators: CouponValidator[] = [
    getValidExpirationCoupons,
    getValidMinimumAmountCoupons,
    getValidBogoCoupons,
    getValidMiracleHourCoupons,
    getValidFreeShippingCoupons,
  ];

  return validators.reduce(
    (filtered, validate) =>
      validate(filtered, { originOrderPrice, orderItems, deliveryFee }),
    couponList
  );
};
