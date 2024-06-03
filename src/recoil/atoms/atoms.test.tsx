import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { RecoilRoot, atom, atomFamily, useRecoilState, useRecoilValue } from 'recoil';

import { CONVERSE, NIKE } from '../../mocks/cartItems';
import { Cart } from '../../types/cart';
import { COUPONS } from '../../mocks/coupons';
import { Coupon } from '../../types/coupon';

const fetchCartItem = jest.fn(() => [CONVERSE, NIKE]);

const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

const removeCartItem = (cartItemId: number, cartData: Cart[]) => {
  const removeFilterCartData = cartData.filter((item) => {
    return item.id !== cartItemId;
  });
  return removeFilterCartData;
};

describe('cartData', () => {
  it('fetchCartItem API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러온다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartData), {
      wrapper: RecoilRoot,
    });

    expect(result.current.length).toBe(2);
  });

  it('장바구니에서 특정 cartItem을 제거하면 값이 정상적으로 업데이트 된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartData), {
      wrapper: RecoilRoot,
    });

    act(() => {
      const updatedCartData = removeCartItem(1, result.current);
      result.current = updatedCartData;
    });

    expect(result.current.length).toBe(1);
  });
});

const getCartCounts = jest.fn(() => 3);

const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

describe('cartQuantity', () => {
  it('장바구니에 담긴 상품의 총 주문 수량을 정상적으로 불러온다.', () => {
    const { result } = renderHook(() => useRecoilValue(cartQuantity), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(3);
  });
});

const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: (itemId: number) => {
    const cartData = [CONVERSE, NIKE];
    const cartItem = cartData.find((item: Cart) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  },
});

describe('cartItemQuantityState', () => {
  it('개별 cartItem의 수량을 변경하면, 정상적으로 값이 업데이트 된다.', () => {
    const { result } = renderHook(() => useRecoilState(cartItemQuantityState(2)), {
      wrapper: RecoilRoot,
    });

    const [quantity] = result.current;

    expect(quantity).toBe(3);
  });
});

const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});

describe('cartItemCheckState', () => {
  it('초기값이 false인지 확인한다.', () => {
    const { result } = renderHook(() => useRecoilState(cartItemCheckState(1)), {
      wrapper: RecoilRoot,
    });
    expect(result.current[0]).toBe(false);
  });
});

const fetchCouponList = jest.fn(() => COUPONS);

const couponList = atom<Coupon[]>({
  key: 'couponList',
  default: fetchCouponList(),
});

describe('couponList', () => {
  it('fetchCouponList API 호출을 통해 쿠폰 목록을 불러온다.', () => {
    const { result } = renderHook(() => useRecoilValue(couponList), {
      wrapper: RecoilRoot,
    });
    expect(result.current.length).toBe(4);
  });
});

const specialZoneCheckState = atom<boolean>({
  key: 'specialZoneCheckState',
  default: false,
});

describe('specialZoneCheckState', () => {
  it('초기값은 false', () => {
    const { result } = renderHook(() => useRecoilState(specialZoneCheckState), {
      wrapper: RecoilRoot,
    });
    expect(result.current[0]).toBe(false);
  });
});
