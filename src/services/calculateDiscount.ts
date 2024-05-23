import { DISCOUNT_TYPES } from '../constants/discount';
import { DiscountType, FormattedCoupon, CartItemData } from '@/types';
import ORDER_CONDITION from '@/constants/order';

type FixedDiscountCalculator = (coupon: FormattedCoupon) => number;
type PercentageDiscountCalculator = (coupon: FormattedCoupon, orderAmount: number) => number;
type BuyXGetYDiscountCalculator = (coupon: FormattedCoupon, allCartItems: CartItemData[]) => number;
type FreeShippingDiscountCalculator = () => number;

type DiscountCalculator =
  | FixedDiscountCalculator
  | PercentageDiscountCalculator
  | BuyXGetYDiscountCalculator
  | FreeShippingDiscountCalculator;

const discountCalculators: Record<DiscountType, DiscountCalculator> = {
  [DISCOUNT_TYPES.FIXED]: (coupon: FormattedCoupon): number => coupon.discount || 0,

  [DISCOUNT_TYPES.PERCENTAGE]: (coupon: FormattedCoupon, orderAmount: number): number =>
    ((coupon.discount || 0) / 100) * orderAmount,

  [DISCOUNT_TYPES.BUY_X_GET_Y]: (
    _coupon: FormattedCoupon,
    allCartItems: CartItemData[],
  ): number => {
    const MIN_QUANTITY = 3;
    const mostExpensiveItemWithMinQuantity = allCartItems
      .filter((cartItem) => cartItem.quantity >= MIN_QUANTITY)
      .sort((a, b) => b.product.price - a.product.price)[0];

    if (mostExpensiveItemWithMinQuantity) {
      return mostExpensiveItemWithMinQuantity.product.price;
    }
    return 0;
  },

  [DISCOUNT_TYPES.FREE_SHIPPING]: (): number => {
    return ORDER_CONDITION.SHIPPING_FEE;
  },
};

const calculateTotalDiscountPrice = (
  coupon: FormattedCoupon,
  orderAmount: number,
  allCartItems: CartItemData[],
): number => {
  if (!coupon.isAvailable) {
    return 0;
  }

  const calculator = discountCalculators[coupon.discountType];

  if (calculator) {
    if (coupon.discountType === DISCOUNT_TYPES.FIXED) {
      return (calculator as FixedDiscountCalculator)(coupon);
    } else if (coupon.discountType === DISCOUNT_TYPES.PERCENTAGE) {
      return (calculator as PercentageDiscountCalculator)(coupon, orderAmount);
    } else if (coupon.discountType === DISCOUNT_TYPES.BUY_X_GET_Y) {
      return (calculator as BuyXGetYDiscountCalculator)(coupon, allCartItems);
    } else if (coupon.discountType === DISCOUNT_TYPES.FREE_SHIPPING) {
      return (calculator as FreeShippingDiscountCalculator)();
    }
  }
  return 0;
};

export default calculateTotalDiscountPrice;
