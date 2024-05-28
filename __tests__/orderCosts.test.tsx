import { PRICE } from '@constants/index';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';

import { INITIAL_ITEMS, SHIPPING_FREE_ITEMS } from './constants/cartItems';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('주문 비용(주문 금액, 배송비, 총 결제 금액) 테스트', () => {
  it('총 결제 금액은 주문 금액 + 배송비의 합이다.', () => {
    // when
    const { result } = executeCartItemRenderHook(
      () => useOrderCosts(),
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    // then
    expect(result.current.orderPrice + result.current.shippingPrice).toBe(result.current.totalPrice);
  });

  it('주문 금액이 100,000원이 넘지 않을 때 배송비가 3,000원을 포함한다.', () => {
    // when
    const { result } = executeCartItemRenderHook(
      () => useOrderCosts(),
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    // then
    expect(result.current.orderPrice < 100000).toBeTruthy();
    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.basic);
  });

  it('주문 금액이 100,000원이 넘을 때 배송비를 포함하지 않는다.', () => {
    // when
    const { result } = executeCartItemRenderHook(
      () => useOrderCosts(),
      SHIPPING_FREE_ITEMS,
      new Set(SHIPPING_FREE_ITEMS.map((item) => item.id)),
    );

    // then
    expect(result.current.shippingPrice).toBe(PRICE.shippingFee.free);
  });
});
