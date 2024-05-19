import { PRICE } from '@constants/index';
import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from '@recoil/shoppingCart';
import { act } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import { INITIAL_ITEMS, SHIPPING_FREE_ITEMS } from './constants/cartItems';
import { renderHookWithRecoilRoot } from './utils/recoilTestUtils';

const initialSelectedIds = INITIAL_ITEMS.map((item) => item.id);

const renderTotalSelector = (isShippingFree: boolean) =>
  renderHookWithRecoilRoot(
    () => {
      return useRecoilValue(totalPriceSelector);
    },
    isShippingFree ? SHIPPING_FREE_ITEMS : undefined,
    initialSelectedIds,
  );
const renderOrderPriceSelector = (isShippingFree: boolean) =>
  renderHookWithRecoilRoot(
    () => {
      return useRecoilValue(orderPriceSelector);
    },
    isShippingFree ? SHIPPING_FREE_ITEMS : undefined,
    initialSelectedIds,
  );
const renderShippingFeeSelector = (isShippingFree: boolean) =>
  renderHookWithRecoilRoot(
    () => {
      return useRecoilValue(shippingFeeSelector);
    },
    isShippingFree ? SHIPPING_FREE_ITEMS : undefined,
    initialSelectedIds,
  );

describe('주문 비용(주문 금액, 배송비, 총 결제 금액) 테스트', () => {
  it('총 결제 금액은 주문 금액 + 배송비의 합이다.', () => {
    const totalPriceRender = renderTotalSelector(false);
    const shippingFeeRender = renderShippingFeeSelector(false);
    const orderPriceRender = renderOrderPriceSelector(false);

    act(() => {
      expect(totalPriceRender.result.current).toBeDefined();
      expect(shippingFeeRender.result.current).toBeDefined();
      expect(orderPriceRender.result.current).toBeDefined();
    });

    expect(orderPriceRender.result.current + shippingFeeRender.result.current).toBe(totalPriceRender.result.current);
  });

  it('주문 금액이 100,000원이 넘지 않을 때 배송비가 3,000원을 포함한다.', () => {
    const orderPriceRender = renderOrderPriceSelector(false);
    const shippingFeeRender = renderShippingFeeSelector(false);

    act(() => {
      expect(orderPriceRender.result.current).toBeDefined();
      expect(shippingFeeRender.result.current).toBeDefined();
    });

    expect(orderPriceRender.result.current < 100000).toBeTruthy();
    expect(shippingFeeRender.result.current).toBe(PRICE.shippingFee.basic);
  });

  it('주문 금액이 100,000원이 넘을 때 배송비를 포함하지 않는다.', () => {
    const orderPriceRender = renderOrderPriceSelector(true);
    const shippingFeeRender = renderShippingFeeSelector(true);

    act(() => {
      expect(orderPriceRender.result.current).toBeDefined();
      expect(shippingFeeRender.result.current).toBeDefined();
    });

    expect(orderPriceRender.result.current >= 100000).toBeTruthy();
    expect(shippingFeeRender.result.current).toBe(PRICE.shippingFee.free);
  });
});
