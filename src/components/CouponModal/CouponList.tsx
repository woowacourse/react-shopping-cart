import { useCouponContext } from "../../stores/CouponContext";
import { ResponseCartItem } from "../../types/types";
import CouponItem from "./CouponItem";

export default function CouponList({
  orderPrice,
  orderProducts,
  deliveryPrice,
}: {
  orderPrice: number;
  orderProducts: ResponseCartItem[];
  deliveryPrice: number;
}) {
  const { coupons, isLoading } = useCouponContext();

  if (isLoading) {
    return <div>쿠폰 로딩중</div>;
  }

  return (
    <div>
      {coupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          data={coupon}
          orderPrice={orderPrice}
          orderProducts={orderProducts}
          deliveryPrice={deliveryPrice}
        />
      ))}
    </div>
  );
}
