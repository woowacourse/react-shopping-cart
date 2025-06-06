import type {
  CartItemType,
  CouponType,
  BogoCoupon,
} from "../../types/response";

export const validateExpirationDate = (expirationDate: string) => {
  const today = new Date();
  const expirationDateObj = new Date(expirationDate);

  return expirationDateObj > today;
};

export const validateMinimumAmount = (
  originTotalPrice: number,
  minimumOrderAmount: number
) => {
  return originTotalPrice >= minimumOrderAmount;
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
  originTotalPrice: number
) => {
  return couponList.filter((coupon) => {
    if (!("minimumAmount" in coupon)) return true;
    return validateMinimumAmount(originTotalPrice, coupon.minimumAmount);
  });
};

const getValidBogoCoupons = (
  couponList: CouponType[],
  orderItems: CartItemType[]
) => {
  return couponList.filter((coupon) => {
    if (!("buyQuantity" in coupon)) return true;
    return validateBogoCoupon(orderItems, coupon);
  });
};

export const getValidCoupons = (
  couponList: CouponType[],
  originTotalPrice: number,
  orderItems: CartItemType[]
) => {
  const validExpirationDateCouponList = getValidExpirationCoupons(couponList);
  const validMinimumAmountCouponList = getValidMinimumAmountCoupons(
    validExpirationDateCouponList,
    originTotalPrice
  );
  const validBogoCouponList = getValidBogoCoupons(
    validMinimumAmountCouponList,
    orderItems
  );

  return validBogoCouponList;
};
