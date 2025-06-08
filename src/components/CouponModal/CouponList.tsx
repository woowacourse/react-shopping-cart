import { useCouponContext } from "../../contexts/CouponProvider";
import { CartItemType } from "../../types/response";
import CouponItem from "./CouponItem/CouponItem";

interface CouponListProps {
  orderCost: number;
  cartItems: CartItemType[];
}

export default function CouponList({ orderCost, cartItems }: CouponListProps) {
  const { coupons } = useCouponContext();

  return (
    <div>
      {coupons.map((coupon) => (
        <CouponItem
          type={coupon.discountType}
          couponData={coupon}
          cartItems={cartItems}
          orderCost={orderCost}
        />
      ))}
    </div>
  );
}
