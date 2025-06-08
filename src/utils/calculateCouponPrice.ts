import { CartItemTypes } from '../types/cartItem';
import { Coupon } from '../types/coupon';

interface calculateCouponPriceProps {
  couponIds: string[];
  coupons: Coupon[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
}
export const calculateCouponPrice = ({
  couponIds,
  coupons,
  selectedCartItems,
  deliveryFee,
}: calculateCouponPriceProps) => {
  const totalPrice = selectedCartItems.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  );

  let sum = 0;

  couponIds.forEach((id) => {
    const coupon = coupons.find((e) => e.id === Number(id));

    if (!coupon) return;

    switch (coupon.id) {
      case 1:
        if (coupon.discount && totalPrice >= coupon.discount) {
          sum += coupon.discount;
        }
        break;
      case 2: {
        const { buyQuantity, getQuantity } = coupon;

        if (!buyQuantity || !getQuantity) return;

        const over = selectedCartItems.filter(
          (item) => item.quantity >= buyQuantity + getQuantity
        );

        if (over.length > 0) {
          const prices = over.map(
            (e) =>
              Math.floor(e.quantity / (buyQuantity + getQuantity)) *
              e.product.price *
              getQuantity
          );
          const maxPrice = Math.max(...prices);
          sum = maxPrice;
        }
        break;
      }
      case 3:
        if (coupon.minimumAmount && totalPrice >= coupon.minimumAmount) {
          sum += deliveryFee;
        }
        break;
      case 4:
        if (coupon.discount) {
          sum += (totalPrice * coupon.discount) / 100;
        }
        break;
      default:
        break;
    }
  });

  return sum;
};
