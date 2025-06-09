import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCartContext } from '@/features/Cart/context/CartProvider';
import { usePriceInfo } from '@/features/Cart/hooks/usePriceInfo';
import { ToastContext } from '@/shared/context/ToastProvider';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastContext.Provider value={{ showToast: () => {} }}>
    <CartProvider>{children}</CartProvider>
  </ToastContext.Provider>
);

const makeCartItem = ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}) => ({
  id: 1,
  quantity,
  isChecked: true,
  product: {
    id: 1,
    name: '상품',
    price,
    quantity: 99,
    imageUrl: '',
    category: '카테고리',
  },
});

describe('배송비 정책 계산', () => {
  it('1. 주문 금액 < 10만원, 도서산간 ❌ → 배송비 3,000원', () => {
    const cartItems = [makeCartItem({ price: 30000, quantity: 3 })];
    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });

    const { result: price } = renderHook(() => usePriceInfo({ cartItems, isRemoteArea: ctx.current.isRemoteArea }), {
      wrapper,
    });

    expect(ctx.current.isRemoteArea).toBe(false);
    expect(price.current.deliveryFee).toBe(3000);
  });

  it('2. 주문 금액 < 10만원, 도서산간 ✅ → 배송비 6,000원', () => {
    const cartItems = [makeCartItem({ price: 30000, quantity: 3 })];
    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      ctx.current.toggleIsRemoteArea();
    });

    const { result: price } = renderHook(() => usePriceInfo({ cartItems, isRemoteArea: ctx.current.isRemoteArea }), {
      wrapper,
    });

    expect(ctx.current.isRemoteArea).toBe(true);
    expect(price.current.deliveryFee).toBe(6000);
  });

  it('3. 주문 금액 ≥ 10만원, 도서산간 ❌ → 배송비 0원', () => {
    const cartItems = [makeCartItem({ price: 50000, quantity: 2 })];
    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });

    const { result: price } = renderHook(() => usePriceInfo({ cartItems, isRemoteArea: ctx.current.isRemoteArea }), {
      wrapper,
    });

    expect(ctx.current.isRemoteArea).toBe(false);
    expect(price.current.deliveryFee).toBe(0);
  });

  it('4. 주문 금액 ≥ 10만원, 도서산간 ✅ → 배송비 0원', () => {
    const cartItems = [makeCartItem({ price: 50000, quantity: 2 })];
    const { result: ctx } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      ctx.current.toggleIsRemoteArea();
    });

    const { result: price } = renderHook(() => usePriceInfo({ cartItems, isRemoteArea: ctx.current.isRemoteArea }), {
      wrapper,
    });

    expect(ctx.current.isRemoteArea).toBe(true);
    expect(price.current.deliveryFee).toBe(0);
  });
});
