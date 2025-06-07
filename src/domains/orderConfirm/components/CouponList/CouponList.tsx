import { Line } from "../../../../components/Line/Line";

import { CouponType } from "../../types/coupon";
import { Coupon } from "../Coupon/Coupon";

interface CouponListProps {
  selectedCoupons: string[];
  handleCouponSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  coupons: CouponType[];
}

export function CouponList({
  selectedCoupons,
  handleCouponSelect,
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
            />
          </>
        );
      })}
    </>
  );
}
