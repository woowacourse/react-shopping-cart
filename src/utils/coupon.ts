import { CartItemProps } from '../types/cartItem';
import { Coupon } from '../types/coupon';

export function isExpired(expirationDate: string): boolean {
  const today = new Date();
  const [y, m, d] = expirationDate.split('-').map(Number);
  return today <= new Date(y, m - 1, d);
}

export function isMiracleMorning(start: string, end: string): boolean {
  const now = new Date();

  const startDate = new Date(now);
  startDate.setHours(
    Number(start.split(':')[0]),
    Number(start.split(':')[1]),
    0,
    0
  );
  const endDate = new Date(now);
  endDate.setHours(Number(end.split(':')[0]), Number(end.split(':')[1]), 0, 0);

  return now >= startDate && now <= endDate;
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
  totalDiscount: number;
  PriceWithDiscount: number;
  finalShipping: number;
  finalPayable: number;
} {
  let remaining = subTotal;
  let totalDiscount = 0;
  let shipping = baseShipping;
  const breakdown: Record<string, number> = {};

  const maxUnitPrice = Math.max(...cartItem.map((item) => item.product.price));

  for (const c of combo) {
    if (c.discountType === 'fixed') {
      totalDiscount += calFixedDiscount(c.discount);
      remaining -= calFixedDiscount(c.discount);
    } else if (c.discountType === 'percentage') {
      totalDiscount += calPercentageDiscount(c.discount, subTotal);
      remaining -= calPercentageDiscount(c.discount, subTotal);
    } else if (c.discountType === 'buyXgetY') {
      totalDiscount += calBuyXgetYDiscount(maxUnitPrice);
      remaining -= calBuyXgetYDiscount(maxUnitPrice);
    }

    breakdown[c.code] = remaining;
  }

  const fs = combo.find((c) => c.discountType === 'freeShipping');
  if (fs) {
    shipping = 0;
  }

  const PriceWithDiscount = Math.min(...Object.values(breakdown));
  return {
    combo,
    breakdown,
    totalDiscount,
    PriceWithDiscount,
    finalShipping: shipping,
    finalPayable: remaining + shipping,
  };
}
