import { useEffect, useState } from 'react';
import { Coupon } from '../types';
import { CartItemType } from '../../cart/types';

interface UseBestCouponsProps {
  coupons: Coupon[];
  products: CartItemType[];
}

interface CouponDiscount {
  coupon: Coupon;
  discount: number;
}

export function useBestCoupons({ coupons, products }: UseBestCouponsProps) {
  const couponDiscounts: CouponDiscount[] = coupons.map((coupon) => ({
    coupon,
    discount: calculateCouponDiscount(coupon, products),
  }));

  const bestTwoIds = couponDiscounts
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 2)
    .map((d) => d.coupon.id);

  const [selected, setSelected] = useState<number[]>(bestTwoIds);

  useEffect(() => {
    setSelected(bestTwoIds);
  }, [
    JSON.stringify(coupons.map((c) => c.id)),
    JSON.stringify(products.map((i) => [i.id, i.quantity])),
  ]);

  return { selected, setSelected, couponDiscounts };
}

function calculateCouponDiscount(
  coupon: Coupon,
  products: CartItemType[]
): number {
  const cartTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  switch (coupon.discountType) {
    case 'fixed': {
      return cartTotal >= (coupon.minimumAmount ?? 0) ? coupon.discount : 0;
    }
    case 'percentage': {
      return Math.floor((cartTotal * (coupon.discount ?? 0)) / 100);
    }
    case 'buyXgetY': {
      const eligibleItems = products.filter(
        (item) => item.quantity >= (coupon.buyQuantity ?? 0)
      );

      if (eligibleItems.length > 0) {
        const maxPrice = Math.max(
          ...eligibleItems.map((item) => item.product.price)
        );
        return maxPrice;
      }
      return 0;
    }

    case 'freeShipping': {
      return cartTotal >= (coupon.minimumAmount ?? 0) ? 3000 : 0;
    }
    default: {
      return 0;
    }
  }
}
