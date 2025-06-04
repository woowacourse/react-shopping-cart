import { CouponDataType, CouponType } from "../types/response";

export const adaptCoupons = (coupons: CouponDataType[]): CouponType[] => {
  return coupons.map(
    ({
      id,
      code,
      description,
      expirationDate,
      discountType,
      discount,
      minimumAmount,
    }) => {
      const [year, month, day] = expirationDate.split("-");

      return {
        id,
        code,
        description,
        expirationDate: {
          year,
          month,
          day,
        },
        discountType,
        discount,
        minimumAmount,
      };
    }
  );
};
