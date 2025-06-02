import { describe, it, expect } from 'vitest';
import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '../src/components/features/cart/utils/cartCalculations';
import { CartItemType } from '../src/components/features/cart/types';

describe('장바구니 계산 유틸리티', () => {
  const mockCartItems: CartItemType[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: '상품1',
        price: 1000,
        imageUrl: 'image1.jpg',
        category: '음식',
      },
      quantity: 2,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: '상품2',
        price: 2000,
        imageUrl: 'image2.jpg',
        category: '음식',
      },
      quantity: 3,
    },
  ];

  describe('calculateOrderPrice', () => {
    it('장바구니 상품들의 총 주문 금액을 계산한다', () => {
      const totalPrice = calculateOrderPrice(mockCartItems);
      expect(totalPrice).toBe(8000);
    });

    it('장바구니가 비어있을 때 0을 반환한다', () => {
      const totalPrice = calculateOrderPrice([]);
      expect(totalPrice).toBe(0);
    });
  });

  describe('calculateTotalProductQuantity', () => {
    it('장바구니 상품들의 총 수량을 계산한다', () => {
      const totalQuantity = calculateTotalProductQuantity(mockCartItems);
      expect(totalQuantity).toBe(5);
    });

    it('장바구니가 비어있을 때 0을 반환한다', () => {
      const totalQuantity = calculateTotalProductQuantity([]);
      expect(totalQuantity).toBe(0);
    });
  });
});
