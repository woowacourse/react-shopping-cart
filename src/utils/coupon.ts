import { CartItemProps } from '../types/cartItem';
import { Coupon } from '../types/coupon';

export function isExpired(expirationDate: string): boolean {
  const today = new Date();
  const [y, m, d] = expirationDate.split('-').map(Number);
  return today > new Date(y, m - 1, d);
}

export function isMiracleMorning(): boolean {
  const now = new Date();

  const start = new Date(now);
  start.setHours(4, 0, 0, 0);
  const end = new Date(now);
  end.setHours(7, 0, 0, 0);

  return now >= start && now <= end;
}

export function isMinimumAmount(
  minimumAmount: number,
  subTotal: number
): boolean {
  return subTotal >= minimumAmount;
}

export function isQuantity(cartItems: CartItemProps[]): boolean {
  return cartItems.some((item) => item.quantity >= 2);
}

function calFixedDiscount(discount: number): number {
  return discount;
}

function calPercentageDiscount(discount: number, amount: number): number {
  return Math.floor(amount * (discount / 100));
}

function calBuyXgetYDiscount(unitPrice: number): number {
  return unitPrice;
}

export function simulateCombo(
  cartItem: CartItemProps[],
  combo: Coupon[],
  subTotal: number,
  baseShipping: number
): {
  combo: Coupon[];
  breakdown: Record<string, number>;
  totalCouponDiscount: number;
  finalShipping: number;
  finalPayable: number;
} {
  let remaining = subTotal;
  let shipping = baseShipping;
  const breakdown: Record<string, number> = {};

  const maxUnitPrice = Math.max(...cartItem.map((item) => item.product.price));

  for (const c of combo) {
    if (c.discountType === 'fixed') {
      remaining -= calFixedDiscount(c.discount);
    } else if (c.discountType === 'percentage') {
      remaining -= calPercentageDiscount(c.discount, remaining);
    } else if (c.discountType === 'buyXgetY') {
      remaining -= calBuyXgetYDiscount(maxUnitPrice);
    }

    breakdown[c.code] = remaining;
  }

  const fs = combo.find((c) => c.discountType === 'freeShipping');
  if (fs) {
    shipping = 0;
  }

  const totalCouponDiscount = Math.min(...Object.values(breakdown));
  return {
    combo,
    breakdown,
    totalCouponDiscount,
    finalShipping: shipping,
    finalPayable: remaining + shipping,
  };
}
