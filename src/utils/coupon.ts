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
  selectedItems: number[],
): number {
  if (coupon.availableTime) {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:00`;

    if (currentTime < coupon.availableTime.start || currentTime >= coupon.availableTime.end) {
      return 0;
    }
  }

  if (coupon.minimumAmount && cart.total < coupon.minimumAmount) {
    return 0;
  }

  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'percentage': {
      return cart.total * ((coupon.discount ?? 0) / 100);
    }
    case 'freeShipping': {
      const totalShippingFee = cart.shippingFee + (cart.isExtraShippingFee ? BASE_SHIPPING_FEE : 0);
      return totalShippingFee;
    }
    case 'buyXgetY': {
      // console.log(hasMultipleSelectedItems(cart, selectedItems));
      const { buyQuantity = 0, getQuantity = 0 } = coupon;
      const groupSize = buyQuantity + getQuantity;

      const selectedCartItems = cart.items.filter((item) => selectedItems.includes(item.id));
      const sortedItems = [...selectedCartItems].sort((a, b) => b.product.price - a.product.price);

      const freeCount = Math.floor(selectedCartItems[0].quantity / groupSize) * getQuantity;
      const totalDiscount = freeCount * sortedItems[0].product.price;

      return totalDiscount;
    }
    default:
      return 0;
  }
}

export function calcComboDiscount(
  combo: CouponType[],
  cart: CartType,
  selectedItems: number[],
): number {
  return combo
    .map((c) => calcCouponDiscount(c, cart, selectedItems))
    .reduce((sum, v) => sum + v, 0);
}

export function findBestCombo(combos: CouponType[][], cart: CartType, selectedItems: number[]) {
  let maxDisc = 0;
  combos.forEach((combo) => {
    const d = calcComboDiscount(combo, cart, selectedItems);
    if (d > maxDisc) {
      maxDisc = d;
    }
  });
  return maxDisc;
}

export function checkCouponAvailability(
  coupon: CouponType,
  price: number,
  selectedCount: number,
): boolean {
  if (selectedCount < 3) {
    return true;
  }

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 8);

  if (coupon.expirationDate) {
    const expirationDate = new Date(coupon.expirationDate);
    if (now > expirationDate) {
      return true;
    }
  }

  if (coupon.availableTime) {
    const { start, end } = coupon.availableTime;
    if (currentTime < start || currentTime > end) {
      return true;
    }
  }

  if (coupon.minimumAmount && coupon.minimumAmount > price) {
    return true;
  }

  return false;
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
