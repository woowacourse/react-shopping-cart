import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

import { checkedItemsState } from './atoms';

import { TOTAL_PRICE_UNDER_100000_DATA } from '@/mocks/cartItems';
import { fetchCartItems } from '@apis/cartItem';
import Loading from '@components/common/Loading';

jest.mock('@apis/cartItem');

const mockFetchCartItems = fetchCartItems as jest.Mock;

describe('atoms', () => {
  describe('checkedItemState', () => {
    it('각 상품의 체크 상태는 "true"이다.', () => {
      mockFetchCartItems.mockReturnValueOnce(TOTAL_PRICE_UNDER_100000_DATA);
      const CART_ID = 134;

      const { result } = renderHook(
        () => {
          useSetRecoilState(checkedItemsState(CART_ID));

          const checkedItem = useRecoilValue(checkedItemsState(CART_ID));

          return { checkedItem };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </RecoilRoot>
          ),
        },
      );

      expect(result.current).toBeTruthy();
    });
  });
});
