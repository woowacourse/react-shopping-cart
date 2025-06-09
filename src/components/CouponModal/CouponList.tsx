import { useCouponContext } from "../../contexts/CouponProvider";
import { CartItemType } from "../../types/response";
import CouponItem from "./CouponItem/CouponItem";

interface CouponListProps {
  orderCost: number;
  cartItems: CartItemType[];
  deliveryCost: number;
}

export default function CouponList({
  orderCost,
  cartItems,
  deliveryCost,
}: CouponListProps) {
  const { coupons } = useCouponContext();

  return (
    <div>
      {coupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          type={coupon.discountType}
          couponData={coupon}
          cartItems={cartItems}
          orderCost={orderCost}
          deliveryCost={deliveryCost}
        />
      ))}
    </div>
  );
}
