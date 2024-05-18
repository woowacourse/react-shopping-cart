import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import '@testing-library/jest-dom';

import { fetchCartItems, updateItemQuantity } from '@apis/cartItem';
import CartMainSection from '@components/Cart/CartMainSection';
import LoadingComponent from '@components/common/LoadingComponent';
import { TOTAL_PRICE_UNDER_100000_DATA } from '@mocks/mock';

const NIKE = '나이키';
const PUMA = '퓨마';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
  updateItemQuantity: jest.fn(),
  deleteItem: jest.fn(),
}));

describe('cartItem', () => {
  beforeEach(() => {
    // 모킹된 데이터 반환값 설정
    (fetchCartItems as jest.Mock).mockResolvedValue(TOTAL_PRICE_UNDER_100000_DATA);
    (updateItemQuantity as jest.Mock).mockResolvedValue(3);
  });

  it('API 호출을 통해 장바구니 데이터를 불러와 화면에 보여준다.', async () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<LoadingComponent />}>
          <CartMainSection />
        </Suspense>
      </RecoilRoot>,
    );

    // 로딩 화면 확인
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // API 호출 후 데이터가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText(NIKE)).toBeInTheDocument();
      expect(screen.getByText(PUMA)).toBeInTheDocument();
    });
  });

  it('+ 버튼을 클릭하면 해당 아이템의 수량이 1 증가한다.', async () => {
    const PLUS_BUTTON_ALT = `${PUMA}-plus`;
    const PLUS_COUNT_RESULT = 4;

    render(
      <RecoilRoot>
        <Suspense fallback={<LoadingComponent />}>
          <CartMainSection />
        </Suspense>
      </RecoilRoot>,
    );

    const plusButton = screen.getByAltText(PLUS_BUTTON_ALT);
    fireEvent.click(plusButton);
    await waitFor(() => screen.getByText(PLUS_COUNT_RESULT));
  });

  it('- 버튼을 클릭하면 해당 아이템의 수량이 1 감소한다.', async () => {
    const MINUS_BUTTON_ALT = `${PUMA}-minus`;
    const MINUS_COUNT_RESULT = 1;

    render(
      <RecoilRoot>
        <Suspense fallback={<LoadingComponent />}>
          <CartMainSection />
        </Suspense>
      </RecoilRoot>,
    );

    const minusButton = screen.getByAltText(MINUS_BUTTON_ALT);
    fireEvent.click(minusButton);
    await waitFor(() => screen.getByText(MINUS_COUNT_RESULT));
  });

  it('삭제 버튼을 클릭하면 해당 아이템이 장바구니에서 제거된다.', async () => {
    render(
      <RecoilRoot>
        <Suspense fallback={<LoadingComponent />}>
          <CartMainSection />
        </Suspense>
      </RecoilRoot>,
    );

    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i });
    expect(deleteButtons.length).toBe(2);

    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(screen.getAllByRole('button', { name: /삭제/i }).length).toBe(1));
  });
});
