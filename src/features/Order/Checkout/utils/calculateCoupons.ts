import { CartItem } from '@/features/Cart/types/Cart.types';

import {
  COUPON_CODES,
  DELIVERY_FEES,
  DISCOUNT_RATES,
  FIXED_DISCOUNT_AMOUNT,
  MIRACLE_MORNING_HOURS,
  PRICE_THRESHOLDS,
  QUANTITY_LIMITS,
} from '../constants/coupons';
import { CouponResponse } from '../type/coupon.type';

type CalculateCouponsProps = {
  totalPrice: number;
  coupons: CouponResponse[];
  cartItems: CartItem[];
};

export const getAvailableCoupons = ({ coupons, totalPrice, cartItems }: CalculateCouponsProps) => {
  const today = new Date();

  return coupons
    .filter((item) => new Date(item.expirationDate) > today)
    .filter((coupon) => {
      if (
        coupon.code === COUPON_CODES.MIRACLE_SALE &&
        MIRACLE_MORNING_HOURS.includes(today.getHours())
      ) {
        return true;
      }

      if (
        coupon.code === COUPON_CODES.FIXED_5000 &&
        totalPrice >= PRICE_THRESHOLDS.FIXED_DISCOUNT_MIN
      ) {
        return true;
      }

      if (
        coupon.code === COUPON_CODES.FREE_SHIPPING &&
        totalPrice < PRICE_THRESHOLDS.FREE_SHIPPING_MAX &&
        totalPrice >= PRICE_THRESHOLDS.FREE_SHIPPING_MIN
      ) {
        return true;
      }

      if (coupon.code === COUPON_CODES.BUY_ONE_GET_ONE) {
        const hasEligibleItem = cartItems?.some(
          (item) =>
            item.quantity >= QUANTITY_LIMITS.BOGO_MIN_QUANTITY &&
            item.quantity % QUANTITY_LIMITS.BOGO_MIN_QUANTITY === 0
        );
        return hasEligibleItem;
      }

      return false;
    });
};

export const getOptimalCoupons = ({
  availableCoupons,
  totalPrice,
  cartItems,
  specialDeliveryZone,
}: {
  availableCoupons: CouponResponse[];
  totalPrice: number;
  cartItems: CartItem[];
  specialDeliveryZone: boolean;
}) => {
  const bogoDiscount = calculateBOGODiscount(cartItems);

  return availableCoupons
    .sort(
      (a, b) =>
        getDiscountAmount(b, totalPrice, bogoDiscount, specialDeliveryZone) -
        getDiscountAmount(a, totalPrice, bogoDiscount, specialDeliveryZone)
    )
    .slice(0, 2);
};

export const getDiscountAmount = (
  coupons: CouponResponse,
  totalPrice: number,
  bogoDiscount: number,
  specialDeliveryZone: boolean
) => {
  if (coupons.code === 'FIXED5000') return FIXED_DISCOUNT_AMOUNT;
  if (coupons.code === 'BOGO') return bogoDiscount;
  if (coupons.code === 'FREESHIPPING')
    return totalPrice >= PRICE_THRESHOLDS.FREE_SHIPPING_MAX
      ? specialDeliveryZone
        ? DELIVERY_FEES.STANDARD
        : 0
      : specialDeliveryZone
      ? DELIVERY_FEES.SPECIAL_ZONE
      : DELIVERY_FEES.STANDARD;
  if (coupons.code === 'MIRACLESALE') return totalPrice * DISCOUNT_RATES.MIRACLE_SALE;

  return 0;
};

export const calculateBOGODiscount = (cartItems: CartItem[]): number => {
  const eligibleItems = cartItems.filter(
    (item) => item.quantity >= QUANTITY_LIMITS.BOGO_MIN_QUANTITY
  );
  if (eligibleItems.length === 0) return 0;

  return Math.max(...eligibleItems.map((item) => item.product.price));
};
