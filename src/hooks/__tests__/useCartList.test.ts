import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCartList from '../useCartList';
import mockCart from '../../mocks/mockCart.json';

describe('useCartList 훅 테스트', () => {
  it('초기 cartList의 상태 값은 목 데이터를 받아오고, isError의 상태 값은 "", isLoading의 상태 값은 false', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => null);

    expect(result.current.cartList).toEqual(mockCart);
    expect(result.current.isError).toEqual('');
    expect(result.current.isLoading).toEqual(false);
  });

  it('장바구니 상품의 수량을 추가할 수 있다.', async () => {
    const targetItem = mockCart[0];
    const updatedMockCart = {
      ...targetItem,
      quantity: targetItem.quantity + 1,
    };

    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.increaseCartItem(targetItem);
    });

    expect(result.current.cartList[0]).toEqual(updatedMockCart);
    expect(result.current.isError).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니 상품의 수량을 감소할 수 있다.', async () => {
    const targetItem = mockCart[0];

    const updatedMockCart = {
      ...targetItem,
      quantity: targetItem.quantity - 1,
    };

    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.decreaseCartItem(targetItem);
    });

    expect(result.current.cartList[0]).toEqual(updatedMockCart);
    expect(result.current.isError).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('원하는 상품을 제거할 수 있다.', async () => {
    const targetItem = mockCart[0];

    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.deleteCartItem(targetItem.id);
    });

    expect(result.current.cartList).not.toContain(targetItem);
    expect(result.current.isError).toBe('');
    expect(result.current.isLoading).toBe(false);
  });
});
