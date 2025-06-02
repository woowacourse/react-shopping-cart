import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCartList from '../useCartList';
import mockCart from '../../mocks/mockCart.json';

describe('useCartList 훅 테스트', () => {
  const targetId = mockCart[0].id;

  it('초기 cartList의 상태 값은 목 데이터를 받아오고, isError의 상태 값은 null, isLoading의 상태 값은 false', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => null);

    expect(result.current.cartList).toEqual(mockCart);
    expect(result.current.isError).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니 상품의 수량을 추가할 수 있다.', async () => {
    const targetItem = mockCart.find((item) => item.id === targetId);
    const expectedQuantity = targetItem!.quantity + 1;

    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.handleIncreaseCartItem({
        cartItemId: targetId,
        quantity: expectedQuantity,
      });
    });

    expect(
      result.current.cartList.find((item) => item.id === targetId)?.quantity
    ).toEqual(expectedQuantity);
    expect(result.current.isError).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니에 없는 상품의 수량을 추가하려고 하면 에러가 발생한다', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.handleIncreaseCartItem({
        cartItemId: 1000000000,
        quantity: 1,
      });
    });

    expect(result.current.isError).not.toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니 상품의 수량을 감소할 수 있다.', async () => {
    const targetItem = mockCart.find((item) => item.id === targetId);
    const expectedQuantity = targetItem!.quantity - 1;

    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.handleDecreaseCartItem({
        cartItemId: targetId,
        quantity: expectedQuantity,
      });
    });

    expect(
      result.current.cartList.find((item) => item.id === targetId)?.quantity
    ).toEqual(expectedQuantity);
    expect(result.current.isError).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니에 없는 상품의 수량을 감소시키려고 하면 에러가 발생한다', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.handleDecreaseCartItem({
        cartItemId: 100000000,
        quantity: 0,
      });
    });

    expect(result.current.isError).not.toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('원하는 상품을 제거할 수 있다.', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => null);

    const targetItem = result.current.cartList.find(
      (item) => item.id === targetId
    );

    expect(targetItem).toBeDefined();

    await act(async () => {
      await result.current.handleDeleteCartItem(targetId);
    });

    const deletedItem = result.current.cartList.find(
      (item) => item.id === targetId
    );

    expect(deletedItem).toBeUndefined();
    expect(result.current.isError).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니에 없는 상품을 제거하려고 하면 에러가 발생한다', async () => {
    const { result } = renderHook(() => useCartList());

    await act(async () => {
      await result.current.handleDeleteCartItem(targetId);
    });

    await act(async () => {
      await result.current.handleDeleteCartItem(targetId);
    });

    expect(result.current.isError).not.toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
