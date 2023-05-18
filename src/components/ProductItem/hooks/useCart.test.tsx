import { act, renderHook } from '@testing-library/react';
import useCart from './useCart';
import { RecoilRoot } from 'recoil';
import { cartState } from '../../../atoms/cart';

describe('useCart 훅의 테스트입니다.', () => {
  const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;
  const product = { id: 1, name: '', price: 40000, imageUrl: 'https://www.example.com' };

  test('addCart는 장바구니에 상품을 1개 추가한다.', () => {
    const { result } = renderHook(() => useCart(cartState, product), { wrapper });

    expect(result.current.cart.length).toBe(0);

    act(() => {
      result.current.addCart();
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].product.id).toBe(product.id);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  test('updateCart는 장바구니 내 상품의 양을 수정한다.', () => {
    const { result } = renderHook(() => useCart(cartState, product), { wrapper });

    expect(result.current.cart.length).toBe(0);

    act(() => {
      result.current.addCart();
    });

    expect(result.current.cart.length).toBe(1);

    act(() => {
      result.current.updateCart(5);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].product.id).toBe(product.id);
    expect(result.current.cart[0].quantity).toBe(5);
  });

  test('deleteCart는 장바구니 내 상품을 제거한다.', () => {
    const { result } = renderHook(() => useCart(cartState, product), { wrapper });

    expect(result.current.cart.length).toBe(0);

    act(() => {
      result.current.addCart();
    });

    expect(result.current.cart.length).toBe(1);

    act(() => {
      result.current.deleteCart();
    });

    expect(result.current.cart).toEqual([]);
  });
});
