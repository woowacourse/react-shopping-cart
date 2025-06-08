import { CartItemProps } from '../../../../types/cartItem';

export interface Coupon {
  id: 'FIXED5000' | 'FREESHIPPING' | 'BOGO' | 'MIRACLESALE';
  name: string;
  isValid: (
    totalPrice: number,
    deliveryFee: number,
    cart: CartItemProps[],
    date: Date
  ) => boolean;
  calculateDiscount: (
    totalPrice: number,
    deliveryFee: number,
    cart: CartItemProps[]
  ) => number;
}

// --- 쿠폰 정책 정의 ---
export const COUPONS: Coupon[] = [
  {
    id: 'FIXED5000',
    name: '5,000원 할인 쿠폰',
    isValid: (totalPrice) => totalPrice >= 100000,
    calculateDiscount: () => 5000,
  },
  {
    id: 'FREESHIPPING',
    name: '무료 배송 쿠폰',
    isValid: (totalPrice, deliveryFee) =>
      totalPrice >= 50000 && deliveryFee > 0,
    calculateDiscount: (_, deliveryFee) => deliveryFee,
  },
  {
    id: 'BOGO',
    name: '2+1 쿠폰',
    isValid: (_, __, cart) => cart.some((item) => item.quantity >= 3),
    calculateDiscount: (_, __, cart) => {
      const bogoCandidates = cart.filter((item) => item.quantity >= 3);
      if (bogoCandidates.length === 0) return 0;
      return Math.max(...bogoCandidates.map((item) => item.product.price));
    },
  },
  {
    id: 'MIRACLESALE',
    name: '30% 시간제 할인 쿠폰',
    isValid: (_, __, ___, date) => {
      const hours = date.getHours();
      return hours >= 4 && hours <= 7;
    },
    calculateDiscount: (totalPrice) => totalPrice * 0.3,
  },
];

// --- 순수 함수 로직 ---

export function getAvailableCoupons(
  totalPrice: number,
  deliveryFee: number,
  cart: CartItemProps[],
  date: Date
): Coupon[] {
  return COUPONS.filter((coupon) =>
    coupon.isValid(totalPrice, deliveryFee, cart, date)
  );
}

export function calculateTotalDiscount(
  combination: Coupon[],
  totalPrice: number,
  deliveryFee: number,
  cart: CartItemProps[]
): number {
  let discount = 0;
  const sortedCombination = [...combination].sort((a) =>
    a.id === 'MIRACLESALE' ? -1 : 1
  );

  let currentPrice = totalPrice;

  for (const coupon of sortedCombination) {
    const discountAmount = coupon.calculateDiscount(
      currentPrice,
      deliveryFee,
      cart
    );
    discount += discountAmount;
    if (coupon.id === 'MIRACLESALE') {
      currentPrice -= discountAmount;
    }
  }
  return discount;
}
