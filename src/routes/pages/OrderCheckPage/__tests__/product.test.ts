import { describe, it, expect } from 'vitest';
import {
  getTotalProductQuantity,
  getDeliveryFee,
  getProductsWithQuantityThreeOrMore,
} from '../utils/product';
import { CartItemProps } from '../../../../types/cartItem';

const mockCart: CartItemProps[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: '티셔츠',
      price: 10000,
      imageUrl: 't-shirt.jpg',
      category: '의류',
    },
    quantity: 2,
  },
  {
    id: 2,
    product: {
      id: 2,
      name: '청바지',
      price: 30000,
      imageUrl: 'jeans.jpg',
      category: '의류',
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      id: 3,
      name: '신발',
      price: 50000,
      imageUrl: 'shoes.jpg',
      category: '잡화',
    },
    quantity: 4,
  },
];

describe('product 유틸리티 함수 테스트', () => {
  describe('getTotalProductQuantity', () => {
    it('장바구니가 비어있으면 총 수량은 0이어야 합니다.', () => {
      expect(getTotalProductQuantity([])).toBe(0);
    });

    it('장바구니에 담긴 상품들의 총 수량을 정확하게 계산해야 합니다.', () => {
      expect(getTotalProductQuantity(mockCart)).toBe(7);
    });
  });

  describe('getDeliveryFee', () => {
    it('총 가격이 10만원 미만이고, 일반 지역일 경우 배송비는 3000원이어야 합니다.', () => {
      expect(getDeliveryFee(99999, false)).toBe(3000);
    });

    it('총 가격이 10만원 미만이고, 도서산간 지역일 경우 배송비는 6000원이어야 합니다.', () => {
      expect(getDeliveryFee(99999, true)).toBe(6000);
    });

    it('총 가격이 10만원 이상이고, 일반 지역일 경우 배송비는 0원이어야 합니다.', () => {
      expect(getDeliveryFee(100000, false)).toBe(0);
    });

    it('총 가격이 10만원 이상이고, 도서산간 지역일 경우 배송비는 3000원이어야 합니다.', () => {
      expect(getDeliveryFee(100000, true)).toBe(3000);
    });
  });

  describe('getProductsWithQuantityThreeOrMore', () => {
    it('장바구니가 비어있으면 빈 배열을 반환해야 합니다.', () => {
      expect(getProductsWithQuantityThreeOrMore([])).toEqual([]);
    });

    it('수량이 3 이상인 상품이 없으면 빈 배열을 반환해야 합니다.', () => {
      const cartWithLowQuantity = [mockCart[0], mockCart[1]]; // quantities are 2 and 1
      expect(getProductsWithQuantityThreeOrMore(cartWithLowQuantity)).toEqual(
        []
      );
    });

    it('수량이 3 이상인 상품만 정확하게 필터링해야 합니다.', () => {
      const result = getProductsWithQuantityThreeOrMore(mockCart);
      expect(result).toHaveLength(1);
      expect(result[0].product.name).toBe('신발');
    });

    it('수량이 정확히 3인 상품을 포함해야 합니다.', () => {
      const cartWithExactQuantity: CartItemProps[] = [
        ...mockCart,
        {
          id: 4,
          product: {
            id: 4,
            name: '양말',
            price: 3000,
            imageUrl: 'socks.jpg',
            category: '잡화',
          },
          quantity: 3,
        },
      ];
      const result = getProductsWithQuantityThreeOrMore(cartWithExactQuantity);
      expect(result).toHaveLength(2);
      expect(result.some((item) => item.product.name === '신발')).toBe(true);
      expect(result.some((item) => item.product.name === '양말')).toBe(true);
    });
  });
});
