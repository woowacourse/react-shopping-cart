import { CartItem } from '../../../features/Cart/types/Cart.types';
import { Coupon } from '../types/Coupon.types';
import { couponStrategies } from '../strategies/couponStrategies';

type PriceContext = {
  isRemoteArea: boolean;
  totalPrice: number;
};

export const calculateTotalDiscount = (
  selectedCartItems: CartItem[],
  coupons: Coupon[],
  priceContext: PriceContext
): number => {
  return coupons.reduce((acc, coupon) => {
    const strategy = couponStrategies[coupon.discountType];
    if (!strategy) return acc;

    return acc + strategy.calculate(coupon, selectedCartItems, priceContext);
  }, 0);
};
