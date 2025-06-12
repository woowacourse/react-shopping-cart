import { MAX_COUPON_COUNT } from '../constants/coupon';
import { BASE_SHIPPING_FEE } from '../constants/payments';
import { CartProduct, CouponType } from '../types/cart';

interface CartType {
  total: number;
  items: CartProduct[];
  shippingFee: number;
  isExtraShippingFee: boolean;
  totalCount: number;
}

export function generateCombos<T>(items: T[], maxLen: number): T[][] {
  const results: T[][] = [];
  const recurse = (start: number, combo: T[]) => {
    if (combo.length > 0 && combo.length <= maxLen) results.push([...combo]);
    if (combo.length === maxLen) return;
    for (let i = start; i < items.length; i++) {
      combo.push(items[i]);
      recurse(i + 1, combo);
      combo.pop();
    }
  };
  recurse(0, []);
  return results;
}

export function calcCouponDiscount(
  coupon: CouponType,
  cart: CartType,
  selectedIds: number[],
): number {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;

    case 'percentage':
      return cart.total * ((coupon.discount ?? 0) / 100);

    case 'freeShipping': {
      const totalShipping = cart.shippingFee + (cart.isExtraShippingFee ? BASE_SHIPPING_FEE : 0);
      return totalShipping;
    }

    case 'buyXgetY': {
      const { buyQuantity = 0, getQuantity = 0 } = coupon;
      const groupSize = buyQuantity + getQuantity;

      const selectedItems = cart.items.filter((item) => selectedIds.includes(item.id));
      // 가장 비싼 상품 순으로 정렬
      const sorted = [...selectedItems].sort((a, b) => b.product.price - a.product.price);

      const freeSets = Math.floor(sorted[0].quantity / groupSize);
      return freeSets * getQuantity * sorted[0].product.price;
    }

    default:
      return 0;
  }
}

export function calcComboDiscount(
  combo: CouponType[],
  cart: CartType,
  selectedIds: number[],
): number {
  return combo.map((c) => calcCouponDiscount(c, cart, selectedIds)).reduce((sum, v) => sum + v, 0);
}

export function findBestCombo(
  combos: CouponType[][],
  cart: CartType,
  selectedIds: number[],
): number {
  let maxDisc = 0;
  combos.forEach((combo) => {
    const disc = calcComboDiscount(combo, cart, selectedIds);
    if (disc > maxDisc) maxDisc = disc;
  });
  return maxDisc;
}

type Validator = (
  coupon: CouponType,
  cart: CartType,
  price: number,
  selectedCount: number,
) => boolean;

const couponValidators: Record<CouponType['discountType'], Validator> = {
  fixed: (coupon, cart, price) => !(coupon.minimumAmount != null && price < coupon.minimumAmount),

  percentage: (coupon, cart, price) =>
    !(coupon.minimumAmount != null && price < coupon.minimumAmount),

  freeShipping: (_, cart) =>
    cart.shippingFee + (cart.isExtraShippingFee ? BASE_SHIPPING_FEE : 0) > 0,

  buyXgetY: (coupon, cart, _, selectedCount) => selectedCount >= (coupon.buyQuantity ?? 0),
};

export function checkCouponAvailability(
  coupon: CouponType,
  price: number,
  selectedCount: number,
  cart: CartType,
): boolean {
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);

  if (coupon.expirationDate) {
    const expires = new Date(coupon.expirationDate);
    if (now > expires) return true;
  }

  if (coupon.availableTime) {
    const { start, end } = coupon.availableTime;
    if (timeStr < start || timeStr >= end) return true;
  }

  if (coupon.minimumAmount && price < coupon.minimumAmount) return true;

  const canApply = couponValidators[coupon.discountType](coupon, cart, price, selectedCount);
  return !canApply;
}

export function calculateTotalDiscount(selectedCoupons: CouponType[], cart: CartType): number {
  if (selectedCoupons.length === 0) return 0;
  const combos = generateCombos(selectedCoupons, MAX_COUPON_COUNT);
  return findBestCombo(
    combos,
    cart,
    cart.items.map((item) => item.id),
  );
}
