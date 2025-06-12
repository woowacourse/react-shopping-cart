import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCartAmountCount } from '@/features/Cart/hooks/useCartAmountCount';
import { useSelectedCart } from '@/features/Cart/hooks/useSelectedCart';
import { useOrderInfo } from '@/features/Cart/hooks/useOrderInfo';
import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { MockCartProvider } from './MockCartProvider';
import { mockCartItems } from './Cart.data';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockCartProvider cartItems={mockCartItems}>
    {children}
  </MockCartProvider>
);

describe('useCartAmountCount', () => {
  it('선택된 수량을 반환한다', () => {
    const { result } = renderHook(() => useCartAmountCount(), { wrapper });
    expect(result.current.selectedCartItemCount).toBe(1);
  });
});

describe('useSelectedCart', () => {
  it('선택된 상품만 반환한다', () => {
    const { result } = renderHook(() => useSelectedCart(), { wrapper });

    expect(result.current.length).toBe(1);
    expect(result.current.every((item) => item.isChecked)).toBe(true);
    expect(result.current.some((item) => !item.isChecked)).toBe(false);
  });
});

describe('useOrderInfo', () => {
  it('선택된 상품의 수량과 총액을 계산한다', () => {
    const { result } = renderHook(() => useOrderInfo(), { wrapper });

    expect(result.current.hasCheckCartLength).toBe(1);
    expect(result.current.totalQuantity).toBe(2);
    expect(result.current.totalPrice).toBe(10000 * 2);
  });
});

describe('usePriceInfo', () => {
  it('주문 금액, 배송비, 총액을 계산한다', () => {
    const { result } = renderHook(() => usePriceInfo(), { wrapper });

    const expectedOrderPrice = 10000 * 2;
    expect(result.current.orderPrice).toBe(expectedOrderPrice);
    expect(result.current.deliveryFee).toBe(3000);
    expect(result.current.totalPrice).toBe(expectedOrderPrice + 3000);
  });
});
