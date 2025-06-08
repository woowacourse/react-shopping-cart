import { CartItemProps } from '../types/cartItem';
import { Coupon, validatedCouponList } from '../types/coupon';

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

export type SimulationResult = ReturnType<typeof simulateCombo>;

export function generateCombos(couponList: Coupon[]): Coupon[][] {
  const combos: Coupon[][] = [];
  for (let i = 0; i < couponList.length; i++) {
    combos.push([couponList[i]]);

    for (let j = i + 1; j < couponList.length; j++) {
      combos.push([couponList[i], couponList[j]]);
    }
  }
  return combos;
}

export function getBestCouponCombo(
  checkedCoupons: number[],
  cartItems: CartItemProps[],
  couponList: Coupon[],
  subTotal: number,
  baseShippingFee: number
): SimulationResult {
  if (checkedCoupons.length > 0) {
    const manualCoupons = couponList.filter((c) =>
      checkedCoupons.includes(c.id)
    );
    return simulateCombo(cartItems, manualCoupons, subTotal, baseShippingFee);
  }

  const combos = generateCombos(couponList);
  const results = combos.map((combo) =>
    simulateCombo(cartItems, combo, subTotal, baseShippingFee)
  );
  results.sort((a, b) => a.finalPayable - b.finalPayable);
  return results[0];
}
