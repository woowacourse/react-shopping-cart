import { PRICE } from '@constants/index';
import { cartItemsSelector, orderCostsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { INITIAL_ITEMS, SHIPPING_FREE_ITEMS } from './constants/cartItems';

describe('주문 비용(주문 금액, 배송비, 총 결제 금액) 테스트', () => {
  it('총 결제 금액은 주문 금액 + 배송비의 합이다.', async () => {
    const { result } = renderHook(
      () => {
        return useRecoilValue(orderCostsSelector);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    expect(result.current.orderPrice + result.current.shippingPrice).toBe(result.current.totalPrice);
  });

  it('주문 금액이 100,000원이 넘지 않을 때 배송비가 3,000원을 포함한다.', async () => {
    const { result } = renderHook(
      () => {
        return useRecoilValue(orderCostsSelector);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    expect(result.current.orderPrice < 100000).toBeTruthy();
    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.basic);
  });

  it('주문 금액이 100,000원이 넘을 때 배송비를 포함하지 않는다.', async () => {
    const { result } = renderHook(
      () => {
        return useRecoilValue(orderCostsSelector);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, SHIPPING_FREE_ITEMS);
              set(selectedIdsAtom, new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)));
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.free);
  });
});
