import { CartItemProps } from '../types/cartItem';
import { Coupon, validatedCouponList } from '../types/coupon';

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
      totalDiscount += c.discount;
      remaining -= c.discount;
    } else if (c.discountType === 'percentage') {
      totalDiscount += Math.floor(remaining * (c.discount / 100));
      remaining -= Math.floor(remaining * (c.discount / 100));
    } else if (c.discountType === 'buyXgetY') {
      totalDiscount += maxUnitPrice;
      remaining -= maxUnitPrice;
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

  for (const coupon of couponList) {
    combos.push([coupon]);
  }

  for (let i = 0; i < couponList.length; i++) {
    for (let j = 0; j < couponList.length; j++) {
      if (i === j) continue;
      combos.push([couponList[i], couponList[j]]);
    }
  }

  return combos;
}

export function getBestCouponCombo(
  checkedCoupons: number[] | null,
  cartItems: CartItemProps[],
  couponList: Coupon[],
  subTotal: number,
  baseShippingFee: number
): SimulationResult {
  let combos: Coupon[][] = [];
  if (checkedCoupons === null) {
    combos = generateCombos(couponList);
  } else if (checkedCoupons.length > 0) {
    const manualList = couponList.filter((c) => checkedCoupons.includes(c.id));
    combos = generateCombos(manualList).filter(
      (combo) => combo.length === manualList.length
    );
  } else {
    combos = [[]];
  }
  const results = combos.map((combo) =>
    simulateCombo(cartItems, combo, subTotal, baseShippingFee)
  );
  results.sort((a, b) => a.finalPayable - b.finalPayable);
  return results[0];
}

export function getAvailableCoupons(
  validatedList: validatedCouponList[]
): validatedCouponList[] {
  return validatedList.filter((c) => !c.isExpired);
}

export function hasFreeShippingCoupon(combo: Coupon[]): boolean {
  return combo.some((c) => c.discountType === 'freeShipping');
}

export function calculateShippingFee(
  baseFee: number,
  hasFreeShipping: boolean,
  isRemoteAreaChecked: boolean,
  remoteExtra = 3000
): number {
  if (hasFreeShipping) return 0;
  return isRemoteAreaChecked ? baseFee + remoteExtra : baseFee;
}

export function calculateFinalPrice(
  priceWithDiscount: number,
  shippingFee: number
): number {
  return priceWithDiscount + shippingFee;
}
