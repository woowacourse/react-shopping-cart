import { act, renderHook, waitFor } from '@testing-library/react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import {
  cartData,
  cartItemCheckState,
  cartItemQuantityState,
  cartQuantity,
} from '../recoil/atoms';
import { MOCK_CART_ITEM } from '../constants/mock';

const mockCartQuantity = MOCK_CART_ITEM.reduce(
  (acc, cur) => acc + cur.quantity,
  0,
);

describe('cartData', () => {
  it('fetchCartItem API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러온다.', () => {
    const { result } = renderHook(() => useRecoilValue(cartData), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartData, MOCK_CART_ITEM)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.length).toBe(2);
  });
});

describe('cartQuantity', () => {
  it('장바구니에 담긴 상품의 총 주문 수량을 정상적으로 불러온다.', () => {
    const { result } = renderHook(() => useRecoilValue(cartQuantity), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartQuantity, mockCartQuantity)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current).toBe(3);
  });
});

describe('cartItemQuantityState', () => {
  it('개별 cartItem의 수량을 변경하면, 정상적으로 값이 업데이트 된다.', () => {
    const { result } = renderHook(() => useRecoilState(cartItemQuantityState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartData, MOCK_CART_ITEM)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const [quantity, setQuantity] = result.current;
    const cartId = 111;

    act(() => {
      const newQuantity = quantity[cartId] + 1;
      setQuantity((prev) => ({ ...prev, [cartId]: newQuantity }));
    });

    waitFor(() => {
      expect(result.current[0]).toBe(quantity[cartId] - 1);
    });
  });
});

describe('cartItemCheckState', () => {
  it('초기값이 false인지 확인한다.', () => {
    const { result } = renderHook(
      () => useRecoilState(cartItemCheckState(111)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(cartItemCheckState(111), false)}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current[0]).toBe(false);
  });
});
