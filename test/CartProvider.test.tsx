import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from '@/features/Cart/context/CartProvider';
import { ToastContext } from '@/shared/context/ToastProvider';
import { mockCartItems } from './Cart.data';

const mutateMock = vi.fn();

vi.mock('@/shared/hooks/useFetchData', () => ({
  useFetchData: () => ({
    data: mockCartItems,
    error: null,
    mutate: mutateMock,
  }),
}));

describe('CartProvider', () => {
  let showToastMock: ReturnType<typeof vi.fn>;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToastContext.Provider value={{ showToast: showToastMock }}>
      <CartProvider>{children}</CartProvider>
    </ToastContext.Provider>
  );

  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => '{}');
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {});
    showToastMock = vi.fn();
    mutateMock.mockClear();
  });

  it('toggleCheck으로 체크 상태를 토글할 수 있다.', async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.toggleCheck(1);
    });

    expect(result.current.cartItems.find((item) => item.id === 1)?.isChecked).toBe(true);

    await act(async () => {
      result.current.toggleCheck(1);
    });

    expect(result.current.cartItems.find((item) => item.id === 1)?.isChecked).toBe(false);
  });

  it('toggleAllCheck으로 전체 체크 상태를 토글할 수 있다.', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.toggleAllCheck();
    });

    expect(result.current.cartItems.every((item) => item.isChecked)).toBe(true);

    act(() => {
      result.current.toggleAllCheck();
    });

    expect(result.current.cartItems.every((item) => !item.isChecked)).toBe(true);
  });

  it('updateQuantity 호출 시 mutate가 실행된다.', async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await result.current.updateQuantity(1, 5);
    });

    expect(mutateMock).toHaveBeenCalled();
  });

  it('updateQuantity 실패 시 showToast가 호출된다.', async () => {
    mutateMock.mockRejectedValueOnce(new Error('수량 변경 실패'));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await result.current.updateQuantity(1, 999);
    });

    expect(showToastMock).toHaveBeenCalledWith('"상품1" 상품의 최대 구매 수량은 10개 입니다.');
  });

  it('removeCartItem 호출 시 mutate와 checkedItems 갱신이 실행된다.', async () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await result.current.removeCartItem(1);
    });

    expect(mutateMock).toHaveBeenCalled();
    expect(result.current.cartItems.find((item) => item.id === 1)?.isChecked).toBeFalsy();
  });

  it('removeCartItem 실패 시 showToast가 호출된다.', async () => {
    mutateMock.mockRejectedValueOnce(new Error('삭제 실패'));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      await result.current.removeCartItem(1);
    });

    expect(showToastMock).toHaveBeenCalledWith('장바구니에서 상품1 상품을 삭제할 수 없습니다.');
  });
});
