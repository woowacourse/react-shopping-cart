import { CartItemProps } from '../types/cartItem';
import { Coupon, validatedCouponList } from '../types/coupon';

interface DiscountType {
  discountAmount: number;
  remainingPrice: number;
  cartItems: CartItemProps[];
}

const fixedDiscount = ({ discountAmount }: DiscountType) => {
  return discountAmount;
};

const percentageDiscount = ({
  discountAmount,
  remainingPrice,
}: DiscountType) => {
  return Math.floor(remainingPrice * (discountAmount / 100));
};

const buyXgetYDiscount = ({ cartItems }: DiscountType) => {
  return Math.max(...cartItems.map((item) => item.product.price));
};

const discountStrategy = {
  fixed: fixedDiscount,
  percentage: percentageDiscount,
  buyXgetY: buyXgetYDiscount,
};

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

  for (const c of combo) {
    if (c.discountType === 'freeShipping') {
      shipping = 0;
      continue;
    }
    const discountAmount = discountStrategy[
      c.discountType as keyof typeof discountStrategy
    ]({
      discountAmount: c.discount,
      remainingPrice: remaining,
      cartItems: cartItem,
    });
    totalDiscount += discountAmount;
    remaining -= discountAmount;
    breakdown[c.code] = remaining;
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

  // const singleCombos = couponList.map((coupon) => [coupon]);
  for (const coupon of couponList) {
    combos.push([coupon]);
  }

  // const doubleCombos = couponList.flatMap((c1, i) =>
  //   couponList.slice(i + 1).map((c2) => [c1, c2])
  // );

  for (let i = 0; i < couponList.length; i++) {
    for (let j = 0; j < couponList.length; j++) {
      if (i === j) continue;
      combos.push([couponList[i], couponList[j]]);
    }
  }

  // console.log('combos', [...singleCombos, ...doubleCombos]);
  // return [...singleCombos, ...doubleCombos];
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
