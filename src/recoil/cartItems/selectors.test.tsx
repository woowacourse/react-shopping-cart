import { renderHook, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchCartItems } from '@/apis/cartItem';
import Loading from '@/components/common/Loading';
import {
  DELIVERY_CHARGE,
  DELIVERY_CHARGE_FREE,
  MINIMUM_FREE_SHIPPING_AMOUNT,
} from '@/constants/cart';
import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@/constants/mock';
import { cartItemsState } from '@recoil/cartItems/atoms';
import {
  deliveryPriceState,
  orderTotalPriceState,
  productTypesCountState,
  purchaseTotalPriceState,
  totalQuantityState,
} from '@recoil/cartItems/selectors';

jest.mock('@apis/cartItem');

const mockFetchCartItems = fetchCartItems as jest.Mock;

describe('selectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deliveryPriceState', () => {
    it(`총 결제금액이 ${MINIMUM_FREE_SHIPPING_AMOUNT.toLocaleString('ko-KR')}원 미만일 때, 배송비가 ${DELIVERY_CHARGE.toLocaleString('ko-KR')}원이다.`, async () => {
      mockFetchCartItems.mockReturnValueOnce(TOTAL_PRICE_UNDER_100000_DATA);

      const { result } = renderHook(
        () => {
          const deliveryPrice = useRecoilValue(deliveryPriceState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { deliveryPrice, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        expect(result.current.deliveryPrice).toBe(3000);
      });
    });

    it(`총 결제금액이 ${MINIMUM_FREE_SHIPPING_AMOUNT.toLocaleString('ko-KR')}원 이상일 때, 배송비가 ${DELIVERY_CHARGE_FREE}원이다.`, () => {
      const { result } = renderHook(
        () => {
          const deliveryPrice = useRecoilValue(deliveryPriceState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { deliveryPrice, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      waitFor(() => {
        expect(result.current.deliveryPrice).toBe(0);
      });
    });
  });

  describe('orderTotalPriceState', () => {
    it.each([
      [TOTAL_PRICE_UNDER_100000_DATA, 21000],
      [TOTAL_PRICE_OVER_100000_DATA, 100000],
    ])('체크된 상품의 개수와 금액을 곱한 총 결제금액을 계산한다.', (data, TOTAL_PRICE) => {
      mockFetchCartItems.mockResolvedValueOnce(data);

      const { result } = renderHook(
        () => {
          const orderTotalPrice = useRecoilValue(orderTotalPriceState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { orderTotalPrice, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      waitFor(() => {
        expect(result.current.orderTotalPrice).toBe(TOTAL_PRICE);
      });
    });
  });

  describe('totalQuantityState', () => {
    it.each`
      data                             | TOTAL_QUANTITY
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${3}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${10}
    `('체크된 상품의 총 개수($TOTAL_QUANTITY)를 계산한다.', ({ data, TOTAL_QUANTITY }) => {
      mockFetchCartItems.mockResolvedValueOnce(data);

      const { result } = renderHook(
        () => {
          const totalQuantity = useRecoilValue(totalQuantityState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { totalQuantity, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      waitFor(() => {
        expect(result.current.totalQuantity).toBe(TOTAL_QUANTITY);
      });
    });
  });

  describe('purchaseTotalPriceState', () => {
    it.each`
      data                             | TOTAL_PRICE
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${24000}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${100000}
    `('구매한 상품의 총 금액($TOTAL_PRICE)을 계산한다.', ({ data, TOTAL_PRICE }) => {
      mockFetchCartItems.mockReturnValueOnce(data);

      const { result } = renderHook(
        () => {
          const purchaseTotalPrice = useRecoilValue(purchaseTotalPriceState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { purchaseTotalPrice, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      waitFor(() => {
        expect(result.current.purchaseTotalPrice).toBe(TOTAL_PRICE);
      });
    });
  });

  describe('productTypesCountState', () => {
    it.each`
      data                             | TYPE_COUNT
      ${TOTAL_PRICE_UNDER_100000_DATA} | ${2}
      ${TOTAL_PRICE_OVER_100000_DATA}  | ${1}
    `('구매한 상품 종류의 개수($TYPE_COUNT)를 계산한다.', ({ data, TYPE_COUNT }) => {
      mockFetchCartItems.mockReturnValueOnce(data);

      const { result } = renderHook(
        () => {
          const productTypesCount = useRecoilValue(productTypesCountState);
          const setCartItems = useSetRecoilState(cartItemsState);
          return { productTypesCount, setCartItems };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      waitFor(() => {
        expect(result.current.productTypesCount).toBe(TYPE_COUNT);
      });
    });
  });
});
