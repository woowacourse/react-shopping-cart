import { PRICE } from '@constants/index';
import { orderCostsSelector } from '@recoil/shoppingCart';
import { waitFor } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import { INITIAL_ITEMS } from './constants/cartItems';
import { renderHookWithRecoilRoot } from './utils/recoilTestUtils';

const initialSelectedIds = INITIAL_ITEMS.map((item) => item.id);

const renderOrderCostsSelector = () =>
  renderHookWithRecoilRoot(
    () => {
      return useRecoilValue(orderCostsSelector);
    },
    undefined,
    initialSelectedIds,
  );

describe('주문 비용(주문 금액, 배송비, 총 결제 금액) 테스트', () => {
  it('총 결제 금액은 주문 금액 + 배송비의 합이다.', async () => {
    const { result } = renderOrderCostsSelector();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect(result.current.orderPrice + result.current.shippingPrice).toBe(result.current.totalPrice);
  });

  it('주문 금액이 100,000원이 넘지 않을 때 배송비가 3,000원을 포함한다.', async () => {
    const { result } = renderOrderCostsSelector();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect(result.current.orderPrice < 100000).toBeTruthy();
    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.basic);
  });

  it('주문 금액이 100,000원이 넘을 때 배송비를 포함하지 않는다.', async () => {
    const { result } = renderOrderCostsSelector();

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.free);
  });
});
