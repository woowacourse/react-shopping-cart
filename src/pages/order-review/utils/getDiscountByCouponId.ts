import { Cart } from '@/api/cart';
import { CouponContent } from '@/api/type';
import { couponDiscountCalculators } from './couponDiscountCalculators';

export const getDiscountByCouponId = (
  coupon: CouponContent,
  orderPrice: number,
  bogoItems?: Cart[],
  isJejuOrRemoteArea?: boolean
): number => {
  const calculator =
    couponDiscountCalculators[
      coupon.code as keyof typeof couponDiscountCalculators
    ];
  if (!calculator) return 0;

  switch (coupon.code) {
    case 'FIXED5000':
    case 'MIRACLESALE':
      return (calculator as (orderPrice: number) => number)(orderPrice) ?? 0;
    case 'FREESHIPPING':
      if (isJejuOrRemoteArea === undefined) return 0;
      return (
        (
          calculator as (
            orderPrice: number,
            isJejuOrRemoteArea: boolean
          ) => number
        )(orderPrice, isJejuOrRemoteArea) ?? 0
      );
    case 'BOGO':
      if (!bogoItems) return 0;
      return (calculator as (bogoItems: Cart[]) => number)(bogoItems) ?? 0;
    default:
      return 0;
  }
};
