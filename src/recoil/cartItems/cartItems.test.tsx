import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent, cleanup } from '@testing-library/react';
import { Suspense, act } from 'react';
import { RecoilRoot } from 'recoil';

import { TOTAL_PRICE_OVER_100000_DATA, TOTAL_PRICE_UNDER_100000_DATA } from '@/constants/mock';
import { fetchCartItems } from '@apis/cartItem';
import CartProducts from '@components/Cart/CartProducts';
import Loading from '@components/common/Loading';

jest.mock('@apis/cartItem');

const mockFetchCartItems = fetchCartItems as jest.Mock;

describe('cartItems 동작 테스트', () => {
  beforeEach(() => {
    mockFetchCartItems.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('cartItem 리스트는 "나이키", "아디다스"가 렌더링된다.', async () => {
    mockFetchCartItems.mockResolvedValueOnce(TOTAL_PRICE_UNDER_100000_DATA);

    act(() => {
      render(
        <RecoilRoot>
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
      mockFetchCartItems.mockResolvedValueOnce(TOTAL_PRICE_OVER_100000_DATA);

      render(
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      const checkbox = screen.getByLabelText(PUMA + 'checkbox', { selector: 'input' });

      fireEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  it('"퓨마" 상품의 +버튼을 클릭했을 때, 수량이 1개 늘어난다.', async () => {
    mockFetchCartItems.mockResolvedValueOnce(TOTAL_PRICE_OVER_100000_DATA);

    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText(PUMA + 'plus-button', { selector: 'button' }));

      expect(screen.getByTestId(PUMA + 'quantity')).toHaveTextContent('11');
    });
  });

  it('"퓨마" 상품의 -버튼을 클릭했을 때, 수량이 1개 줄어든다.', async () => {
    mockFetchCartItems.mockResolvedValueOnce(TOTAL_PRICE_OVER_100000_DATA);

    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText(PUMA + 'minus-button', { selector: 'button' }));

      expect(screen.getByTestId(PUMA + 'quantity')).toHaveTextContent('8');
    });
  });

  it('"퓨마" 상품의 delete버튼을 클릭했을 때, 상품이 삭제된다.', async () => {
    mockFetchCartItems.mockResolvedValueOnce(TOTAL_PRICE_OVER_100000_DATA);

    const PUMA = '퓨마';

    act(() => {
      render(
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <CartProducts />
          </Suspense>
        </RecoilRoot>,
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText(PUMA + 'delete-button', { selector: 'button' }));

      expect(screen.queryByText(PUMA)).not.toBeInTheDocument();
    });
  });
});
