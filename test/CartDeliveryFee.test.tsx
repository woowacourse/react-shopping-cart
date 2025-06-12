import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCartContext } from '@/features/Cart/context/CartProvider';
import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { cartItemsForShippingFee } from './Cart.data';
import { MockCartProvider } from './MockCartProvider';

describe('배송비 정책 계산', () => {
  it('1. 주문 금액 < 10만원, 도서산간 ❌ → 배송비 3,000원', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockCartProvider cartItems={cartItemsForShippingFee.under100k_nonRemote}>
        {children}
      </MockCartProvider>
    );
useCartContext
    const { result } = renderHook(() => usePriceInfo(), { wrapper });
    expect(result.current.deliveryFee).toBe(3000);
  });

  it('2. 주문 금액 < 10만원, 도서산간 ✅ → 배송비 6,000원', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockCartProvider cartItems={cartItemsForShippingFee.under100k_remote} isRemoteArea={true}>
        {children}
      </MockCartProvider>
    );

    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      ctx.current.toggleIsRemoteArea();
    });

    const { result } = renderHook(() => usePriceInfo(), { wrapper });
    expect(result.current.deliveryFee).toBe(6000);
  });

  it('3. 주문 금액 ≥ 10만원, 도서산간 ❌ → 배송비 0원', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockCartProvider cartItems={cartItemsForShippingFee.over100k_nonRemote}>
        {children}
      </MockCartProvider>
    );

    const { result } = renderHook(() => usePriceInfo(), { wrapper });
    expect(result.current.deliveryFee).toBe(0);
  });

  it('4. 주문 금액 ≥ 10만원, 도서산간 ✅ → 배송비 0원', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockCartProvider cartItems={cartItemsForShippingFee.over100k_remote}>
        {children}
      </MockCartProvider>
    );

    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      ctx.current.toggleIsRemoteArea();
    });

    const { result } = renderHook(() => usePriceInfo(), { wrapper });
    expect(result.current.deliveryFee).toBe(0);
  });
});
