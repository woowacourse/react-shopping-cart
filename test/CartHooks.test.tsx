import { describe, it, expect } from 'vitest';
import { useOrderInfo } from '@/features/Cart/hooks/useOrderInfo';
import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { useCartInfo } from '@/features/Cart/hooks/useCartInfo';
import { cartItems } from './Cart.data';
import { CartProvider } from '@/features/Cart/context/CartProvider';
import { renderHook } from '@testing-library/react';

const mutableCartItems = cartItems.map((item) => ({
  ...item,
  product: { ...item.product },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useCartInfo', () => {
  it('장바구니 정보를 계산한다', () => {
    const { result } = renderHook(() => useCartInfo(mutableCartItems), { wrapper });

    expect(result.current.allChecked).toBe(true);
    expect(result.current.cartItemCount).toBe(2);
    expect(result.current.selectedCartItemCount).toBe(2);
    expect(result.current.selectedTotalAmount).toBe(10000 * 2 + 30000 * 1);
  });
});

describe('useOrderInfo', () => {
  it('선택된 상품의 수량과 총액을 계산한다', () => {
    const { result } = renderHook(() => useOrderInfo(mutableCartItems), { wrapper });

    expect(result.current.hasCheckCartLength).toBe(2);
    expect(result.current.totalQuantity).toBe(3);
    expect(result.current.totalPrice).toBe(10000 * 2 + 30000 * 1);
  });

  it('선택된 상품이 없으면 0을 반환한다', () => {
    const uncheckedItems = mutableCartItems.map((item) => ({
      ...item,
      isChecked: false,
    }));

    const { result } = renderHook(() => useOrderInfo(uncheckedItems), { wrapper });

    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.hasCheckCartLength).toBe(0);
  });
});

describe('usePriceInfo', () => {
  it('주문 금액, 배송비, 총액을 계산한다', () => {
    const cartItems = [
      {
        id: 1,
        quantity: 2,
        isChecked: true,
        product: {
          id: 1,
          name: '상품1',
          price: 10000,
          quantity: 10,
          imageUrl: '/image1.jpg',
          category: '식료품',
        },
      },
      {
        id: 2,
        quantity: 1,
        isChecked: true,
        product: {
          id: 2,
          name: '상품2',
          price: 30000,
          quantity: 10,
          imageUrl: '/image2.jpg',
          category: '식료품',
        },
      },
    ];

    const { result } = renderHook(() => usePriceInfo(cartItems), { wrapper });

    const expectedOrderPrice = 10000 * 2 + 30000;
    expect(result.current.orderPrice).toBe(expectedOrderPrice);
    expect(result.current.deliveryFee).toBe(3000);
    expect(result.current.totalPrice).toBe(expectedOrderPrice + 3000);
  });

  it('무료배송 기준을 초과하면 배송비는 0원이다', () => {
    const expensiveItems = [
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
    ];

    const { result } = renderHook(() => usePriceInfo(expensiveItems), { wrapper });

    const expectedOrderPrice = 40000 * 3;
    expect(result.current.orderPrice).toBe(expectedOrderPrice);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.totalPrice).toBe(expectedOrderPrice);
  });
});