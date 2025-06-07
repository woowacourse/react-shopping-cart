import { useCouponContext } from "../../stores/CouponContext";
import CouponItem from "./CouponItem";

export default function CouponList() {
  const { coupons, isLoading } = useCouponContext();

  if (isLoading) {
    return <div>쿠폰 로딩중</div>;
  }

  return (
    <div>
      {coupons.map((coupon) => (
        <CouponItem key={coupon.id} data={coupon} />
      ))}
    </div>
  );
}
