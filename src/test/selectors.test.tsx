import { renderHook } from '@testing-library/react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

import mockCartItems from '../mocks/cartItems';
import { cartItemsState, isCartItemSelectedState } from '../recoil/atoms';
import {
  cartItemIdsSelector,
  cartItemsCountSelector,
  isAllCartItemSelectedSelectorFamily,
  isSomeCartItemSelectedSelector,
  selectedCartItemsCountSelector,
  selectedCartItemsSelector,
  shippingFeeSelector,
  totalCartItemQuantitySelector,
  totalOrderAmountSelector,
  totalPaymentAmountSelector,
} from '../recoil/selectors';
import mockIsCartItemsSelected from '../mocks/isCartItemsSelected';
import { act } from 'react';

describe('cartItemsCountSelector의', () => {
  it('장바구니에 담긴 cartItem의 갯수를 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(cartItemsCountSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(cartItemsState, mockCartItems)}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(5);
  });
});

describe('cartItemIdsSelector', () => {
  it('cartItem의 id들을 반환한다.', () => {
    const { result } = renderHook(() => useRecoilValue(cartItemIdsSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, mockCartItems)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('selectedCartItemsSelector', () => {
  it('선택된 cartItem들을 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(selectedCartItemsSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(mockIsCartItemsSelected.id),
                  mockIsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toEqual(mockCartItems.slice(0, 3));
  });

  it('선택된 cartItem들의 갯수를 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(selectedCartItemsCountSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(mockIsCartItemsSelected.id),
                  mockIsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(3);
  });
});

describe('isSomeCartItemSelectedSelector', () => {
  it('cartItem들이 1개라도 선택된 경우 true를 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(isSomeCartItemSelectedSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(mockIsCartItemsSelected.id),
                  mockIsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBeTruthy();
  });

  it('cartItem들이 1개도 선택되지 않은 경우 false를 반환한다.', () => {
    const NONE_SELECTED_TEST_CASE = [
      { id: 1, boolean: false },
      { id: 2, boolean: false },
      { id: 3, boolean: false },
      { id: 4, boolean: false },
      { id: 5, boolean: false },
    ];

    const { result } = renderHook(
      () => useRecoilValue(isSomeCartItemSelectedSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              NONE_SELECTED_TEST_CASE.forEach((IsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(IsCartItemsSelected.id),
                  IsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBeFalsy();
  });
});

describe('totalOrderAmountSelector', () => {
  it('선택된 cartItem들의 총 주문금액을 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(totalOrderAmountSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(mockIsCartItemsSelected.id),
                  mockIsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(140000);
  });
});

describe('totalCartItemQuantitySelector', () => {
  it('선택된 cartItem들의 총 수량을 반환한다.', () => {
    const { result } = renderHook(
      () => useRecoilValue(totalCartItemQuantitySelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
                set(
                  isCartItemSelectedState(mockIsCartItemsSelected.id),
                  mockIsCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(6);
  });
});

describe('shippingFeeSelector', () => {
  it('총 주문 금액이 100000이 넘으면 0을 반환한다.', () => {
    const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItems);
            mockIsCartItemsSelected.forEach((mockIsCartItemsSelected) =>
              set(
                isCartItemSelectedState(mockIsCartItemsSelected.id),
                mockIsCartItemsSelected.boolean,
              ),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(0);
  });

  it('총 주문 금액이 100000이 넘지 않으면 3000을 반환한다.', () => {
    const SHIPPING_FEE_EXIST_TEST_CASE = [
      { id: 1, boolean: true },
      { id: 2, boolean: false },
      { id: 3, boolean: false },
      { id: 4, boolean: false },
      { id: 5, boolean: false },
    ];

    const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItems);
            SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemsSelected) =>
              set(
                isCartItemSelectedState(isCartItemsSelected.id),
                isCartItemsSelected.boolean,
              ),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(3000);
  });

  it('선택한 제품이 없어 총 주문 금액이 0인 경우 0을 반환한다.', () => {
    const NONE_SELECTED_TEST_CASE = [
      { id: 1, boolean: false },
      { id: 2, boolean: false },
      { id: 3, boolean: false },
      { id: 4, boolean: false },
      { id: 5, boolean: false },
    ];

    const { result } = renderHook(() => useRecoilValue(shippingFeeSelector), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItems);
            NONE_SELECTED_TEST_CASE.forEach((isCartItemsSelected) =>
              set(
                isCartItemSelectedState(isCartItemsSelected.id),
                isCartItemsSelected.boolean,
              ),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(0);
  });
});

describe('totalPaymentAmountSelector', () => {
  it('totalPaymentAmountSelector 경우, 총 주문 금액과 운송비를 합한 금액을 반환한다.', () => {
    const SHIPPING_FEE_EXIST_TEST_CASE = [
      { id: 1, boolean: true },
      { id: 2, boolean: false },
      { id: 3, boolean: false },
      { id: 4, boolean: false },
      { id: 5, boolean: false },
    ];

    const { result } = renderHook(
      () => useRecoilValue(totalPaymentAmountSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              SHIPPING_FEE_EXIST_TEST_CASE.forEach((isCartItemsSelected) =>
                set(
                  isCartItemSelectedState(isCartItemsSelected.id),
                  isCartItemsSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(13000);
  });
});

describe('isAllCartItemSelectedSelectorFamily', () => {
  it('cartItem들이 모두 선택된 경우 true를 반환한다.', () => {
    const ALL_SELECTED_TEST_CASE = [
      { id: 1, boolean: true },
      { id: 2, boolean: true },
      { id: 3, boolean: true },
      { id: 4, boolean: true },
      { id: 5, boolean: true },
    ];
    const CART_ITEM_IDS = ALL_SELECTED_TEST_CASE.map((cartItem) => cartItem.id);

    const { result } = renderHook(
      () => useRecoilValue(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current).toBeTruthy();
  });

  it('cartItem들 중 하나라도 선택되지 않은 경우 false를 반환한다.', () => {
    const NOT_ALL_SELECTED_TEST_CASE = [
      { id: 1, boolean: false },
      { id: 2, boolean: true },
      { id: 3, boolean: true },
      { id: 4, boolean: true },
      { id: 5, boolean: true },
    ];
    const CART_ITEM_IDS = NOT_ALL_SELECTED_TEST_CASE.map(
      (cartItem) => cartItem.id,
    );

    const { result } = renderHook(
      () => useRecoilValue(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              NOT_ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current).toBeFalsy();
  });

  it('전체 선택 할 수 있다.', () => {
    const NOT_ALL_SELECTED_TEST_CASE = [
      { id: 1, boolean: false },
      { id: 2, boolean: true },
      { id: 3, boolean: true },
      { id: 4, boolean: true },
      { id: 5, boolean: true },
    ];
    const CART_ITEM_IDS = NOT_ALL_SELECTED_TEST_CASE.map(
      (cartItem) => cartItem.id,
    );

    const { result } = renderHook(
      () => useRecoilState(isAllCartItemSelectedSelectorFamily(CART_ITEM_IDS)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, mockCartItems);
              NOT_ALL_SELECTED_TEST_CASE.forEach((isCartItemSelected) =>
                set(
                  isCartItemSelectedState(isCartItemSelected.id),
                  isCartItemSelected.boolean,
                ),
              );
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();
  });
});
