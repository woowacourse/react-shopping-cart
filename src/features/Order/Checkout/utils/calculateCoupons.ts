import { CartItem, CartItemList } from '@/features/Cart/types/Cart.types';

import { CouponResponse, Coupons } from '../type/coupon.type';

type CalculateCouponsProps = {
  totalPrice: number;
} & Coupons &
  CartItemList;

export const getAvailableCoupons = ({ coupons, totalPrice, cartItems }: CalculateCouponsProps) => {
  const today = new Date();
  const selectedCoupons: CouponResponse[] = [];

  const availableCoupons = coupons.filter((item) => {
    return new Date(item.expirationDate) > today;
  });

  availableCoupons.forEach((coupon) => {
    if (coupon.code === 'MIRACLESALE' && [4, 5, 6, 7].includes(today.getHours())) {
      selectedCoupons.push(coupon);
    }

    if (coupon.code === 'FIXED5000' && totalPrice >= 100000) {
      selectedCoupons.push(coupon);
    }

    if (coupon.code === 'FREESHIPPING' && totalPrice < 100000 && totalPrice >= 50000) {
      selectedCoupons.push(coupon);
    }

    if (coupon.code === 'BOGO') {
      const hasEligibleItem = cartItems?.some((item) => item.quantity >= 3);
      if (hasEligibleItem) selectedCoupons.push(coupon);
    }
  });

  return selectedCoupons;
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
  if (coupons.code === 'FIXED5000') return 5000;
  if (coupons.code === 'BOGO') return bogoDiscount;
  if (coupons.code === 'FREESHIPPING')
    return totalPrice >= 100000
      ? specialDeliveryZone
        ? 3000
        : 0
      : specialDeliveryZone
      ? 6000
      : 3000;
  if (coupons.code === 'MIRACLESALE') return totalPrice * 0.3;

  return 0;
};

export const calculateBOGODiscount = (cartItems: CartItem[]): number => {
  const eligibleItems = cartItems.filter((item) => item.quantity >= 3);
  if (eligibleItems.length === 0) return 0;

  return Math.max(...eligibleItems.map((item) => item.product.price));
};
