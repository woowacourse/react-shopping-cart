import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { TOTAL_PRICE_UNDER_100000_DATA } from '@/constants/mock';
import { fetchCartItems } from '@apis/cartItem';
import CartProducts from '@components/Cart/CartProducts';
import Loading from '@components/common/Loading';

jest.mock('@apis/cartItem');

const mockFetchCartItems = fetchCartItems as jest.Mock;

describe('atoms', () => {
  describe('cartItemState', () => {
    it('cartItem 리스트는 "나이키", "퓨마"가 렌더링된다.', async () => {
      mockFetchCartItems.mockReturnValueOnce(TOTAL_PRICE_UNDER_100000_DATA);

      render(
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );

      await waitFor(() => {
        expect(screen.getByText('나이키')).toBeInTheDocument();
        expect(screen.getByText('퓨마')).toBeInTheDocument();
      });
    });
  });

  // it('"퓨마" 상품의 체크박스를 클릭했을 때, 체크가 해제된다.', async () => {
  //   mockFetchCartItems.mockReturnValueOnce(TOTAL_PRICE_UNDER_100000_DATA);

  //   render(
  //     <RecoilRoot>
  //       <Suspense fallback={<Loading />}>
  //         <CartProducts />
  //       </Suspense>
  //     </RecoilRoot>,
  //   );

  //   await waitFor(() => {
  //     fireEvent.click(screen.getByRole('input', { name: '퓨마' }));

  //     expect(useRecoilValue(checkedItemsState(532))).toBeTruthy();
  //   });
  // });
});
