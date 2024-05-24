import { renderHook, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { cartItemsState } from './atoms';
import {
  shippingPriceState,
  orderResultState,
  productTypesCountState,
  totalPurchasePriceState,
} from './selectors';
import { couponSavedCheckListState } from '../coupons/atoms';

import { MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { PRICE } from '@constants/config';
import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@mocks/cart';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(),
}));

describe('selectors', () => {
  describe('shippingPriceState', () => {
    it(`총 결제금액이 ${PRICE.FREE_SHIPPING_CONDITION}원 이상일 때, 배송비가 ${PRICE.DELIVERY_PRICE}원이다.`, async () => {
      const { result } = renderHook(
        () => {
          const deliveryPrice = useRecoilValue(shippingPriceState);

          return { deliveryPrice };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, TOTAL_PRICE_UNDER_100000_DATA);
                set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
              }}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.deliveryPrice).toBe(PRICE.DELIVERY_PRICE);
      });
    });
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
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, data);
                set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
              }}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </RecoilRoot>
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
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, data);
                set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
              }}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </RecoilRoot>
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
    `('구매한 상품의 총 금액($TOTAL_PRICE)을 계산한다.', async ({ data, TOTAL_PRICE }) => {
      const { result } = renderHook(
        () => {
          const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);

          return { totalPurchasePrice };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, data);
                set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
              }}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => expect(result.current.totalPurchasePrice).toBe(TOTAL_PRICE));
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
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, data);
                set(couponSavedCheckListState, MOCK_COUPON_CHECK_LIST);
              }}
            >
              <Suspense fallback={null}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current.productTypesCount).toBe(TYPE_COUNT);
    });
  });
});
