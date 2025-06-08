import { describe, it, expect } from 'vitest';
import {
  filterCheckedItems,
  calculateTotalPrice,
  calculateTotalQuantity,
  calculateShippingFee,
  getCartDescription,
} from '../../src/utils/cartCalculations';
import { CartProduct } from '../../src/types/cart';
import {
  SHIPPING_FEE,
  FREE_SHIPPING_FEE,
  SHIPPING_FEE_THRESHOLD,
} from '../../src/constants/cartConfig';

const mockCartItems: CartProduct[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: '상품A',
      price: 10000,
      imageUrl: 'test.jpg',
      category: '식품',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: '상품B',
      price: 20000,
      imageUrl: 'test2.jpg',
      category: '패션잡화',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 3,
      name: '상품C',
      price: 15000,
      imageUrl: 'test3.jpg',
      category: '패션잡화',
    },
  },
];

describe('cartCalculations 테스트', () => {
  describe('filterCheckedItems', () => {
    it('선택된 ID에 해당하는 상품만 필터링한다', () => {
      const checkedIds = [1, 3];
      const result = filterCheckedItems(mockCartItems, checkedIds);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(3);
    });

    it('선택된 ID가 없으면 빈 배열을 반환한다', () => {
      const result = filterCheckedItems(mockCartItems, []);
      expect(result).toHaveLength(0);
    });
  });

  describe('calculateTotalPrice', () => {
    it('상품들의 총 가격을 올바르게 계산한다', () => {
      const result = calculateTotalPrice(mockCartItems);
      // (10000 * 2) + (20000 * 1) + (15000 * 3) = 20000 + 20000 + 45000 = 85000
      expect(result).toBe(85000);
    });

    it('빈 배열의 경우 0을 반환한다', () => {
      const result = calculateTotalPrice([]);
      expect(result).toBe(0);
    });

    it('단일 상품의 가격을 올바르게 계산한다', () => {
      const result = calculateTotalPrice([mockCartItems[0]]);
      expect(result).toBe(20000); // 10000 * 2
    });
  });

  describe('calculateTotalQuantity', () => {
    it('상품들의 총 수량을 올바르게 계산한다', () => {
      const result = calculateTotalQuantity(mockCartItems);
      expect(result).toBe(6); // 2 + 1 + 3
    });

    it('빈 배열의 경우 0을 반환한다', () => {
      const result = calculateTotalQuantity([]);
      expect(result).toBe(0);
    });

    it('단일 상품의 수량을 올바르게 계산한다', () => {
      const result = calculateTotalQuantity([mockCartItems[1]]);
      expect(result).toBe(1);
    });
  });

  describe('calculateShippingFee', () => {
    it('상품이 있고 주문 금액이 기준 이하일 때 배송비를 부과한다', () => {
      const result = calculateShippingFee(50000, true);
      expect(result).toBe(SHIPPING_FEE);
    });

    it('상품이 있고 주문 금액이 기준 이상일 때 무료 배송한다', () => {
      const result = calculateShippingFee(SHIPPING_FEE_THRESHOLD, true);
      expect(result).toBe(FREE_SHIPPING_FEE);
    });

    it('기준 금액보다 1원 적을 때 배송비를 부과한다', () => {
      const result = calculateShippingFee(99999, true);
      expect(result).toBe(SHIPPING_FEE);
    });
  });

  describe('getCartDescription', () => {
    it('상품이 있을 때 올바른 설명을 반환한다', () => {
      expect(getCartDescription(1)).toBe('현재 1종류의 상품이 담겨있습니다.');
      expect(getCartDescription(5)).toBe('현재 5종류의 상품이 담겨있습니다.');
    });

    it('상품이 없을 때 undefined를 반환한다', () => {
      expect(getCartDescription(0)).toBeUndefined();
    });
  });
});
