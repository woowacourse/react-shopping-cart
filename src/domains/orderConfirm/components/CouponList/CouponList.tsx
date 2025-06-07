import { useEffect, useState } from "react";
import { Line } from "../../../../components/Line/Line";
import { getCouponItems } from "../../api/coupon";

import { CouponType } from "../../types/coupon";
import { Coupon } from "../Coupon/Coupon";

interface CouponListProps {
  selectedCoupons: string[];
  handleCouponSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CouponList({
  selectedCoupons,
  handleCouponSelect,
}: CouponListProps) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCouponItems();
      setCoupons(data);
    })();
  }, []);

  return (
    <>
      {coupons.map((coupon: CouponType) => {
        return (
          <>
            <Line />
            <Coupon
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
