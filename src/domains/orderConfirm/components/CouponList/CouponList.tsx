import React from "react";
import { Line } from "../../../../components/Line/Line";

import { CouponCode, CouponType } from "../../types/coupon";
import { Coupon } from "../Coupon/Coupon";

type validateCouponType = Record<CouponCode, boolean>;
interface CouponListProps {
  handleCouponSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCoupons: string[];
  isValidCoupon: validateCouponType;
  coupons: CouponType[];
}

export function CouponList({
  handleCouponSelect,
  selectedCoupons,
  isValidCoupon,
  coupons,
}: CouponListProps) {
  return (
    <>
      {coupons.map((coupon: CouponType) => {
        return (
          <>
            <Line key="line" />
            <Coupon
              key={coupon.code}
              item={coupon}
              isSelected={selectedCoupons.includes(coupon.code)}
              handleCouponSelect={handleCouponSelect}
              isDisabled={!isValidCoupon[coupon.code]}
            />
          </>
        );
      })}
    </>
  );
}
