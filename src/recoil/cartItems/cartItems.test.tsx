import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Suspense, act } from 'react';
import { RecoilRoot } from 'recoil';

import { cartItemsState } from './atoms';

import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@/mocks/cartItems';
import CartProducts from '@components/Cart/CartProducts';
import Loading from '@components/common/Loading';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
  updateItemQuantity: jest.fn(),
  deleteItem: jest.fn(),
}));

describe('cartItems 동작 테스트', () => {
  it('cartItem 리스트는 "나이키", "아디다스"가 렌더링된다.', async () => {
    act(() => {
      render(
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_UNDER_100000_DATA)}
        >
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText('나이키')).toBeInTheDocument();
      expect(screen.getByText('아디다스')).toBeInTheDocument();
    });
  });

  it('"퓨마" 상품의 체크박스를 클릭했을 때, 체크가 해제된다.', async () => {
    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
        >
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      const checkbox = screen.getByLabelText(PUMA + '체크 박스', { selector: 'input' });

      fireEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  it('"퓨마" 상품의 +버튼을 클릭했을 때, 수량이 1개 늘어난다.', async () => {
    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
        >
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByAltText(PUMA + '수량 증가 버튼'));

      expect(screen.getByTestId(PUMA + 'quantity')).toHaveTextContent('11');
    });
  });

  it('"퓨마" 상품의 -버튼을 클릭했을 때, 수량이 1개 줄어든다.', async () => {
    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
        >
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByAltText(PUMA + '수량 감소 버튼'));

      expect(screen.getByTestId(PUMA + 'quantity')).toHaveTextContent('9');
    });
  });

  it('"퓨마" 상품의 delete버튼을 클릭했을 때, 상품이 삭제된다.', async () => {
    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot
          initializeState={({ set }) => set(cartItemsState, TOTAL_PRICE_OVER_100000_DATA)}
        >
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('삭제')[0]);

      expect(screen.queryByText(PUMA)).not.toBeInTheDocument();
    });
  });
});
