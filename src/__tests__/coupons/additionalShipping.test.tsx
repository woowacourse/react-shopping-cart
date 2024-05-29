import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_OVER_50000_DATA } from '@/mocks/cart';
import { MOCK_COUPON_CHECK_LIST } from '@/mocks/coupon';
import { cartItemsState } from '@/recoil/cartItems/atoms';
import { totalPurchasePriceState } from '@/recoil/cartItems/selectors';
import { isAdditionalShippingState } from '@/recoil/coupons/atoms';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
}));

jest.mock('@apis/coupon', () => ({
  fetchCouponList: jest.fn(() => MOCK_COUPON_CHECK_LIST),
}));

describe('제주도 및 도서 산간 지역 배송비 테스트', () => {
  it.each`
    data                           | IS_ADDITIONAL | TOTAL_PURCHASE_PRICE
    ${TOTAL_PRICE_OVER_50000_DATA} | ${false}      | ${54000}
    ${TOTAL_PRICE_OVER_50000_DATA} | ${true}       | ${57000}
  `(
    '배송지가 제주도 및 도서 산간 지역일 경우, 배송비를 3000원 추가한다. ($IS_ADDITIONAL)',
    async ({ data, IS_ADDITIONAL, TOTAL_PURCHASE_PRICE }) => {
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
                set(isAdditionalShippingState, IS_ADDITIONAL);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.totalPurchasePrice).toBe(TOTAL_PURCHASE_PRICE);
      });
    },
  );

  it.each`
    data                            | IS_ADDITIONAL | TOTAL_PURCHASE_PRICE
    ${TOTAL_PRICE_OVER_100000_DATA} | ${false}      | ${100000}
    ${TOTAL_PRICE_OVER_100000_DATA} | ${true}       | ${100000}
  `(
    '배송지가 제주도 및 도서 산간 지역이여도 100000원 이상이면 무료 배송 혜택을 적용한다. ($IS_ADDITIONAL)',
    async ({ data, IS_ADDITIONAL, TOTAL_PURCHASE_PRICE }) => {
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
                set(isAdditionalShippingState, IS_ADDITIONAL);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.totalPurchasePrice).toBe(TOTAL_PURCHASE_PRICE);
      });
    },
  );
});
