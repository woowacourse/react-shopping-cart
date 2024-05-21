import { renderHook, waitFor } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import { cartItemsState } from './atoms';
import { orderResultState, productTypesCountState } from './selectors';

import { PRICE } from '@constants/config';
import AsyncRecoilWrapper from '@mocks/AsyncRecoilWrapper';
import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@mocks/cart';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

describe('selectors', () => {
  describe('deliveryPriceState', () => {
    it.each`
      data                             | CONDITION | DELIVERY_PRICE
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${'미만'} | ${3000}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${'이상'} | ${0}
    `(
      `총 결제금액이 ${PRICE.FREE_DELIVERY_CONDITION}원 $CONDITION일 때, 배송비가 $DELIVERY_PRICE원이다.`,
      async ({ data, DELIVERY_PRICE }) => {
        const { result } = renderHook(
          () => {
            const { deliveryPrice } = useRecoilValue(orderResultState);
            return { deliveryPrice };
          },
          {
            wrapper: ({ children }) => (
              <AsyncRecoilWrapper atom={cartItemsState} INITIAL_DATA={data}>
                {children}
              </AsyncRecoilWrapper>
            ),
          },
        );

        await waitFor(() => {
          expect(result.current.deliveryPrice).toBe(DELIVERY_PRICE);
        });
      },
    );
  });

  describe('orderTotalPriceState', () => {
    it.each([
      [TOTAL_PRICE_UNDER_100000_DATA, 21000],
      [TOTAL_PRICE_OVER_100000_DATA, 100000],
    ])('체크된 상품의 개수와 금액을 곱한 총 결제금액을 계산한다', async (data, TOTAL_PRICE) => {
      const { result } = renderHook(
        () => {
          const { totalOrderPrice } = useRecoilValue(orderResultState);
          return { totalOrderPrice };
        },
        {
          wrapper: ({ children }) => (
            <AsyncRecoilWrapper atom={cartItemsState} INITIAL_DATA={data}>
              {children}
            </AsyncRecoilWrapper>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.totalOrderPrice).toBe(TOTAL_PRICE);
      });
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
          const { totalQuantity } = useRecoilValue(orderResultState);
          return { totalQuantity };
        },
        {
          wrapper: ({ children }) => (
            <AsyncRecoilWrapper atom={cartItemsState} INITIAL_DATA={data}>
              {children}
            </AsyncRecoilWrapper>
          ),
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
          const { totalPurchasePrice } = useRecoilValue(orderResultState);
          return { totalPurchasePrice };
        },
        {
          wrapper: ({ children }) => (
            <AsyncRecoilWrapper atom={cartItemsState} INITIAL_DATA={data}>
              {children}
            </AsyncRecoilWrapper>
          ),
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
          const productTypesCount = useRecoilValue(productTypesCountState);
          return { productTypesCount };
        },
        {
          wrapper: ({ children }) => (
            <AsyncRecoilWrapper atom={cartItemsState} INITIAL_DATA={data}>
              {children}
            </AsyncRecoilWrapper>
          ),
        },
      );

      expect(result.current.productTypesCount).toBe(TYPE_COUNT);
    });
  });
});
