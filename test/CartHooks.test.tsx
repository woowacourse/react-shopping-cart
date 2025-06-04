import { describe, it, expect } from 'vitest';
import { useOrderInfo } from '@/features/Cart/hooks//useOrderInfo';
import { usePriceInfo } from '@/features/Cart/hooks//usePriceInfo';
import { useCartInfo } from '@/features/Cart/hooks/useCartInfo';
import { cartItems } from './Cart.data';

const mutableCartItems = cartItems.map((item) => ({
  ...item,
  product: { ...item.product },
}));

describe('useCartInfo', () => {
  it('장바구니 정보를 계산한다', () => {
    const result = useCartInfo(mutableCartItems);

    expect(result.allChecked).toBe(true);
    expect(result.cartItemCount).toBe(2);
    expect(result.selectedCartItemCount).toBe(2);
    expect(result.selectedTotalAmount).toBe(10000 * 2 + 30000 * 1);
  });
});

describe('useOrderInfo', () => {
  it('선택된 상품의 수량과 총액을 계산한다', () => {
    const result = useOrderInfo(mutableCartItems);

    expect(result.hasCheckCartLength).toBe(2);
    expect(result.totalQuantity).toBe(3);
    expect(result.totalPrice).toBe(10000 * 2 + 30000 * 1);
  });

  it('선택된 상품이 없으면 0을 반환한다', () => {
    const uncheckedItems = mutableCartItems.map((item) => ({
      ...item,
      isChecked: false,
    }));

    const result = useOrderInfo(uncheckedItems);

    expect(result.totalQuantity).toBe(0);
    expect(result.totalPrice).toBe(0);
    expect(result.hasCheckCartLength).toBe(0);
  });
});

describe('usePriceInfo', () => {
  it('주문 금액, 배송비, 총액을 계산한다', () => {
    const mutableCartItems = cartItems.map((item) => ({
      ...item,
      product: { ...item.product },
    }));

    const result = usePriceInfo(mutableCartItems);

    const expectedOrderPrice = 10000 * 2 + 30000 * 1;
    expect(result.orderPrice).toBe(expectedOrderPrice);
    expect(result.deliveryFee).toBe(3000);
    expect(result.totalPrice).toBe(expectedOrderPrice + 3000);
  });

  it('무료배송 기준을 초과하면 배송비는 0원이다', () => {
    const result = usePriceInfo([
      {
        id: 3,
        quantity: 3,
        isChecked: true,
        product: {
          id: 3,
          name: '상품 C',
          price: 40000,
          quantity: 10,
          imageUrl: '/image3.jpg',
          category: '식료품',
        },
      },
    ]);

    const expectedOrderPrice = 40000 * 3;
    expect(result.orderPrice).toBe(expectedOrderPrice);
    expect(result.deliveryFee).toBe(0);
    expect(result.totalPrice).toBe(expectedOrderPrice);
  });
});
