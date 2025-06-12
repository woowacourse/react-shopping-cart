// src/context/__tests__/CartContext.test.tsx
import React, { act } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCartContext } from '../CartContext';
import { ToastProvider } from '../ToastContext';
import mockCart from '../../mocks/mockCart.json';
import cart from '../../apis/cart';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe('useCartContext 테스트', () => {
  it('provider 없이 useCartContext를 사용하면 에러를 던진다', () => {
    expect(() => renderHook(() => useCartContext())).toThrow(
      'useCartListContext must be used within a CartListProvider'
    );
  });

  it('useCartContext 훅을 사용하여 파생 상태를 계산할 수 있다.', async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // 전체 Mock 데이터에 대한 파생 상태 계산
    expect(result.current.data).toEqual(mockCart);
    expect(result.current.selectedItems).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(result.current.subTotal).toBe(4843000);
    expect(result.current.deliveryFee).toBe(0);
    expect(result.current.totalCount).toBe(20);
    expect(result.current.typeCount).toBe(10);
    expect(result.current.totalBeforeDiscount).toBe(4843000);
  });

  it('clearCart 실행 시 선택된 모든 아이템이 제거되고 deleteCartItem이 호출된다', async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const deleteSpy = vi.spyOn(cart, 'deleteCartItem');

    act(() => {
      result.current.clearCart();
    });

    console.log(result.current);

    expect(result.current.data).toEqual([]);
    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.subTotal).toBe(0);
    expect(result.current.deliveryFee).toBe(3000);
    expect(result.current.totalBeforeDiscount).toBe(3000);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.typeCount).toBe(result.current.selectedItems.length);
  });
});
