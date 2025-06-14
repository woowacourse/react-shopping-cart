import { describe, it, expect } from 'vitest';
import { getOrderPrice, getPaymentAmount } from '../utils/order';
import { CartItemProps } from '../../../../types/cartItem';

const MOCK_CART_ITEMS: CartItemProps[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'T-Shirt',
      price: 15000,
      imageUrl: 'url1',
      category: 'clothes',
    },
    quantity: 2, // 15000 * 2 = 30000
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Jeans',
      price: 50000,
      imageUrl: 'url2',
      category: 'clothes',
    },
    quantity: 1, // 50000 * 1 = 50000
  },
];

describe('Order Utility Functions', () => {
  describe('getOrderPrice', () => {
    it('장바구니 아이템 목록의 총 주문 금액을 올바르게 계산해야 한다.', () => {
      const totalPrice = getOrderPrice(MOCK_CART_ITEMS);
      expect(totalPrice).toBe(80000); // 30000 + 50000
    });

    it('장바구니가 비어있을 경우 0을 반환해야 한다.', () => {
      const totalPrice = getOrderPrice([]);
      expect(totalPrice).toBe(0);
    });
  });

  describe('getPaymentAmount', () => {
    it('주문 금액, 배송비, 총 할인액을 바탕으로 최종 결제 금액을 올바르게 계산해야 한다.', () => {
      const orderPrice = 80000;
      const deliveryFee = 3000;
      const totalDiscount = 5000;
      const paymentAmount = getPaymentAmount(
        orderPrice,
        deliveryFee,
        totalDiscount
      );
      expect(paymentAmount).toBe(78000); // 80000 + 3000 - 5000
    });
  });
});
