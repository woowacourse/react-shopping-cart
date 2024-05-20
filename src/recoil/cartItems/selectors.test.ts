import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { cartItemsState } from './atoms';
import { orderResultState, productTypesCountState } from './selectors';

import { CONFIG } from '@constants/config';
import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@mocks/mock';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

describe('selectors', () => {
  describe('deliveryPriceState', () => {
    it(`총 결제금액이 ${CONFIG.FREE_DELIVERY_CONDITION}원 미만일 때, 배송비가 ${CONFIG.DELIVERY_PRICE}원이다.`, async () => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(TOTAL_PRICE_UNDER_100000_DATA);

          const { deliveryPrice } = useRecoilValue(orderResultState);
          return { deliveryPrice };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current.deliveryPrice).toBe(3000);
    });

    it(`총 결제금액이 ${CONFIG.FREE_DELIVERY_CONDITION}원 이상일 때, 배송비가 0원이다.`, () => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(TOTAL_PRICE_OVER_100000_DATA);

          const { deliveryPrice } = useRecoilValue(orderResultState);
          return { deliveryPrice };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current.deliveryPrice).toBe(0);
    });
  });

  describe('orderTotalPriceState', () => {
    it.each([
      [TOTAL_PRICE_UNDER_100000_DATA, 21000],
      [TOTAL_PRICE_OVER_100000_DATA, 100000],
    ])('체크된 상품의 개수와 금액을 곱한 총 결제금액을 계산한다', (data, TOTAL_PRICE) => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(data);

          const { totalOrderPrice } = useRecoilValue(orderResultState);
          return { totalOrderPrice };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current.totalOrderPrice).toBe(TOTAL_PRICE);
    });
  });

  describe('totalQuantityState', () => {
    it.each`
      data                             | TOTAL_QUANTITY
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${3}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${10}
    `('체크된 상품의 총 개수($TOTAL_QUANTITY)를 계산한다.', ({ data, TOTAL_QUANTITY }) => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(data);

          const { totalQuantity } = useRecoilValue(orderResultState);
          return { totalQuantity };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current.totalQuantity).toBe(TOTAL_QUANTITY);
    });
  });

  describe('purchaseTotalPriceState', () => {
    it.each`
      data                             | TOTAL_PRICE
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${24000}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${100000}
    `('구매한 상품의 총 금액($TOTAL_PRICE)을 계산한다.', ({ data, TOTAL_PRICE }) => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(data);

          const { totalPurchasePrice } = useRecoilValue(orderResultState);
          return { totalPurchasePrice };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current.totalPurchasePrice).toBe(TOTAL_PRICE);
    });
  });

  describe('productTypesCountState', () => {
    it.each`
      data                             | TYPE_COUNT
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${2}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${1}
    `('구매한 상품 종류의 개수($TYPE_COUNT)를 계산한다.', ({ data, TYPE_COUNT }) => {
      const { result } = renderHook(
        () => {
          const setCartList = useSetRecoilState(cartItemsState);
          setCartList(data);

          const productTypesCount = useRecoilValue(productTypesCountState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { productTypesCount, setCartItems };
        },
        {
          wrapper: RecoilRoot,
        },
      );

      act(() => {
        result.current.setCartItems(data);
      });

      expect(result.current.productTypesCount).toBe(TYPE_COUNT);
    });
  });
});
