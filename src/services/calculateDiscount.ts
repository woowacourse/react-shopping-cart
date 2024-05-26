import { DISCOUNT_TYPES } from '@/constants/discount';
import { FormattedCoupon, CartItemData } from '@/types';
import ORDER_CONDITION from '@/constants/order';

interface FixedDiscountCalculator {
  (coupon: FormattedCoupon): number;
}

interface PercentageDiscountCalculator {
  (coupon: FormattedCoupon, orderAmount: number): number;
}

interface BuyXGetYDiscountCalculator {
  (coupon: FormattedCoupon, allCartItems: CartItemData[]): number;
}

interface FreeShippingDiscountCalculator {
  (): number;
}

interface DiscountCalculators {
  [DISCOUNT_TYPES.FIXED]: FixedDiscountCalculator;
  [DISCOUNT_TYPES.PERCENTAGE]: PercentageDiscountCalculator;
  [DISCOUNT_TYPES.BUY_X_GET_Y]: BuyXGetYDiscountCalculator;
  [DISCOUNT_TYPES.FREE_SHIPPING]: FreeShippingDiscountCalculator;
}

const discountCalculators: DiscountCalculators = {
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

  switch (coupon.discountType) {
    case DISCOUNT_TYPES.FIXED:
      return discountCalculators.fixed(coupon);
    case DISCOUNT_TYPES.PERCENTAGE:
      return discountCalculators.percentage(coupon, orderAmount);
    case DISCOUNT_TYPES.BUY_X_GET_Y:
      return discountCalculators.buyXgetY(coupon, allCartItems);
    case DISCOUNT_TYPES.FREE_SHIPPING:
      return discountCalculators.freeShipping();
    default:
      return 0;
  }
};

export default calculateTotalDiscountPrice;
