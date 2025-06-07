import { useCouponContext } from "../../contexts/CouponProvider";
import { DiscountType } from "../../types/coupon";
import CouponItem from "./CouponItem/CouponItem";

export default function CouponList() {
  const { coupons } = useCouponContext();

  return (
    <div>
      {Object.entries(coupons).map(([type, couponList]) => (
        <CouponItem type={type as DiscountType} couponList={couponList} />
      ))}
    </div>
  );
}
