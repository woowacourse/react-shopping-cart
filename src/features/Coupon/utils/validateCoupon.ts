import { couponStrategies } from '../strategies/couponStrategies';
import { Coupon } from '../types/Coupon.types';
import { CartItem } from '../../../features/Cart/types/Cart.types';

type PriceContext = {
  isRemoteArea: boolean;
  totalPrice: number;
};

export const isCouponValid = (
  coupon: Coupon,
  selectedCartItems: CartItem[],
  priceContext: PriceContext
): boolean => {
  const strategy = couponStrategies[coupon.discountType];

  if (!strategy) return false;

  return strategy.validate(coupon, selectedCartItems, priceContext);
};
