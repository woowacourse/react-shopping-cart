import { describe, it, expect } from 'vitest';
import { CartItemProps } from '../../../../types/cartItem';
import {
  COUPONS,
  getAvailableCoupons,
  calculateTotalDiscount,
  Coupon,
} from '../utils/coupon';

// --- Mock Data ---
const mockCart: (quantity: number, price: number) => CartItemProps[] = (
  quantity,
  price
) => [
  {
    id: 1,
    quantity,
    product: {
      id: 101,
      name: 'T-Shirt',
      price,
      imageUrl: '',
      category: 'Tops',
    },
  },
];

const mockComplexCart: CartItemProps[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 101,
      name: 'T-Shirt',
      price: 20000,
      imageUrl: '',
      category: 'Tops',
    },
  },
  {
    id: 2,
    quantity: 3,
    product: {
      id: 102,
      name: 'Jeans',
      price: 50000,
      imageUrl: '',
      category: 'Bottoms',
    },
  },
];

describe('쿠폰 로직 테스트', () => {
  describe('getAvailableCoupons: 사용 가능한 쿠폰 필터링', () => {
    it('오전 5시에는 미라클 모닝 쿠폰이 포함되어야 한다', () => {
      const available = getAvailableCoupons(
        1000,
        3000,
        [],
        new Date('2025-07-31T05:00:00')
      );
      expect(available.some((c) => c.id === 'MIRACLESALE')).toBe(true);
    });

    it('오전 8시에는 미라클 모닝 쿠폰이 포함되지 않아야 한다', () => {
      const available = getAvailableCoupons(
        1000,
        3000,
        [],
        new Date('2025-07-31T08:00:00')
      );
      expect(available.some((c) => c.id === 'MIRACLESALE')).toBe(false);
    });

    it('10만원 이상 구매 시 5,000원 할인 쿠폰이 포함되어야 한다', () => {
      const available = getAvailableCoupons(100000, 3000, [], new Date());
      expect(available.some((c) => c.id === 'FIXED5000')).toBe(true);
    });

    it('2개 이상 담은 상품이 있으면 BOGO 쿠폰이 포함되어야 한다', () => {
      const available = getAvailableCoupons(
        10000,
        3000,
        mockCart(3, 5000),
        new Date()
      );
      expect(available.some((c) => c.id === 'BOGO')).toBe(true);
    });
  });

  describe('calculateTotalDiscount: 선택된 쿠폰의 최적 할인액 계산', () => {
    const getCoupon = (id: Coupon['id']) => COUPONS.find((c) => c.id === id)!;

    it('할인율 쿠폰과 정액 쿠폰이 함께 있을 때, 할인율 쿠폰을 먼저 적용하여 최대 할인액을 계산한다', () => {
      const selectedCoupons = [
        getCoupon('FIXED5000'),
        getCoupon('MIRACLESALE'),
      ];
      const discount = calculateTotalDiscount(
        selectedCoupons,
        120000,
        3000,
        mockCart(1, 120000)
      );
      // 120,000 * 0.3 = 36,000원 할인. 그 후 5,000원 추가 할인. 총 41,000원.
      const expectedDiscount = 120000 * 0.3 + 5000;
      expect(discount).toBe(expectedDiscount);
    });

    it('BOGO 쿠폰과 무료배송 쿠폰이 함께 있을 때, 할인을 올바르게 합산한다', () => {
      const selectedCoupons = [getCoupon('BOGO'), getCoupon('FREESHIPPING')];
      const discount = calculateTotalDiscount(
        selectedCoupons,
        190000,
        3000,
        mockComplexCart
      );
      // BOGO(50,000원) + 배송비(3,000원) = 53,000원
      expect(discount).toBe(53000);
    });

    it('쿠폰이 하나만 있을 때도 정확한 할인액을 계산한다', () => {
      const selectedCoupons = [getCoupon('FIXED5000')];
      const discount = calculateTotalDiscount(
        selectedCoupons,
        100000,
        3000,
        mockCart(1, 100000)
      );
      expect(discount).toBe(5000);
    });

    it('쿠폰이 없을 때 0을 반환한다', () => {
      const discount = calculateTotalDiscount([], 100000, 3000, []);
      expect(discount).toBe(0);
    });
  });
});
