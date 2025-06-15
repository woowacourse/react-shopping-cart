import {
  calculateDeliveryFee,
  calculateOrderAmount,
  calculateTotalQuantity
} from '../src/domain/order/calculateOrderInfo';
import cartItems from '../src/mocks/data/cartItems.json';
import { describe, it, expect } from 'vitest';

import { CartItemType } from '../src/domain/mapper/cartItemMapper';

let items: CartItemType[];

beforeEach(() => {
  items = cartItems.content.map(
    (item): CartItemType => ({
      cartItemId: item.id,
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl
    })
  );
});

describe('주문 금액·배송비·결제 금액 계산 test', () => {
  it('상품 금액을 합산한 총 주문 금액을 계산한다.', () => {
    const orderAmount = calculateOrderAmount(items);
    expect(orderAmount).toBe(1088054867);
  });

  it('상품 금액이 10만원 이상이면 배송비가 무료이다.', () => {
    const orderAmount = calculateOrderAmount(items);
    expect(orderAmount).toBe(1088054867);

    const deliveryFee = calculateDeliveryFee(orderAmount);
    expect(deliveryFee).toBe(0);
  });

  it('상품 금액이 10만원 미만이면 배송비가 3000원이다.', () => {
    const orderAmount = calculateOrderAmount([items[8]]);
    expect(orderAmount).toBe(20);

    const deliveryFee = calculateDeliveryFee(orderAmount);
    expect(deliveryFee).toBe(3000);
  });

  it('총 결제 금액은 주문 금액과 배송비의 합이다.', () => {
    const orderAmount = calculateOrderAmount(items);
    const deliveryFee = calculateDeliveryFee(orderAmount);
    const totalPayment = orderAmount + deliveryFee;

    expect(totalPayment).toBe(1088054867);
  });
});

describe('총 주문 수량 test', () => {
  it('총 주문 수량을 계산한다.', () => {
    const totalQuantity = calculateTotalQuantity(items);
    expect(totalQuantity).toBe(16);
  });
});
