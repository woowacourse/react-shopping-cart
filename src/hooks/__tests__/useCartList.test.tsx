import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useCartList from '../useCartList';
import mockCart from '../../mocks/mockCart.json';
import cart from '../../apis/cart';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import { ToastProvider } from '../../context/ToastContext';
import { CartProvider } from '../../context/CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe('useCartList 훅 테스트', () => {
  it('초기 cartList의 상태 값은 목 데이터를 받아오고, isError의 상태 값은 "", isLoading의 상태 값은 false', async () => {
    const { result } = renderHook(() => useCartList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCart);
    expect(result.current.error).toEqual('');
  });

  it('장바구니 상품의 수량을 추가할 수 있다.', async () => {
    const targetItem = mockCart[0];
    const updatedMockCart = {
      ...targetItem,
      quantity: targetItem.quantity + 1,
    };

    const { result } = renderHook(() => useCartList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.increaseCartItem(targetItem);
    });

    expect(result.current.data[0]).toEqual(updatedMockCart);
    expect(result.current.error).toBe('');
  });

  it('장바구니 상품의 수량을 감소할 수 있다.', async () => {
    const targetItem = mockCart[0];

    const updatedMockCart = {
      ...targetItem,
      quantity: targetItem.quantity - 1,
    };

    const { result } = renderHook(() => useCartList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.decreaseCartItem(targetItem);
    });

    expect(result.current.data[0]).toEqual(updatedMockCart);
    expect(result.current.error).toBe('');
  });

  it('원하는 상품을 제거할 수 있다.', async () => {
    const targetItem = mockCart[0];

    const { result } = renderHook(() => useCartList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.deleteCartItem(targetItem.id);
    });

    expect(result.current.data).not.toContain(targetItem);
    expect(result.current.error).toBe('');
  });
});

describe('useCartList 훅 예외 테스트', () => {
  it('장바구니 상품 목록을 불러올 때 에러가 발생하면 error 상태 값이 변경된다.', async () => {
    vi.spyOn(cart, 'getCartList').mockRejectedValueOnce(
      new Error('장바구니 목록 조회 실패')
    );

    const { result } = renderHook(() => useCartList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(ERROR_MESSAGE.CART_LIST);
  });

  it('장바구니 상품의 수량을 추가할 때 에러가 발생하면 error 상태 값이 변경된다.', async () => {
    vi.spyOn(cart, 'increaseCartItem').mockRejectedValueOnce(
      new Error('장바구니 상품 수량 증가 실패')
    );

    const { result } = renderHook(() => useCartList(), { wrapper });

    await act(async () => {
      await result.current.increaseCartItem(mockCart[0]);
    });

    expect(result.current.error).toBe(ERROR_MESSAGE.INCREASE_CART_ITEM);
  });

  it('장바구니 상품의 수량을 감소할 때 에러가 발생하면 error 상태 값이 변경된다.', async () => {
    vi.spyOn(cart, 'decreaseCartItem').mockRejectedValueOnce(
      new Error('장바구니 상품 수량 감소 실패')
    );

    const { result } = renderHook(() => useCartList(), { wrapper });

    await act(async () => {
      await result.current.decreaseCartItem(mockCart[0]);
    });

    expect(result.current.error).toBe(ERROR_MESSAGE.DECREASE_CART_ITEM);
  });

  it('원하는 상품을 제거할 때 에러가 발생하면 error 상태 값이 변경된다.', async () => {
    vi.spyOn(cart, 'deleteCartItem').mockRejectedValueOnce(
      new Error('장바구니 상품 삭제 실패')
    );

    const { result } = renderHook(() => useCartList(), { wrapper });

    await act(async () => {
      await result.current.deleteCartItem(mockCart[0].id);
    });

    expect(result.current.error).toBe(ERROR_MESSAGE.DELETE_CART_ITEM);
  });
});
