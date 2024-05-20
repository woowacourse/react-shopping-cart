import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import AsyncRecoilWrapper from '@/mocks/AsyncRecoilWrapper';
import { fetchCartItems } from '@apis/cartItem';
import CartMainSection from '@components/Cart/CartMainSection';
import { TOTAL_PRICE_UNDER_100000_DATA } from '@mocks/mock';

const NIKE = '나이키';
const PUMA = '퓨마';

jest.mock('@apis/cartItem', () => ({
  fetchCartItems: jest.fn(),
  updateItemQuantity: jest.fn(() => ({ type: 'UPDATE', status: 204 })),
  deleteItem: jest.fn(() => ({ type: 'DELETE', status: 204 })),
}));

describe('cartItem', () => {
  beforeEach(() => {
    // 모킹된 데이터 반환값 설정
    (fetchCartItems as jest.Mock).mockResolvedValue(TOTAL_PRICE_UNDER_100000_DATA);
  });

  it('API 호출을 통해 장바구니 데이터를 불러와 화면에 보여준다.', async () => {
    render(
      <AsyncRecoilWrapper>
        <CartMainSection />
      </AsyncRecoilWrapper>,
    );

    // 로딩 화면 확인
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // API 호출 후 데이터가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText(NIKE)).toBeInTheDocument();
      expect(screen.getByText(PUMA)).toBeInTheDocument();
    });
  });

  it('삭제 버튼을 클릭하면 해당 아이템이 장바구니에서 제거된다.', async () => {
    render(
      <AsyncRecoilWrapper>
        <CartMainSection />
      </AsyncRecoilWrapper>,
    );

    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i });
    expect(deleteButtons.length).toBe(2);

    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(screen.getAllByRole('button', { name: /삭제/i }).length).toBe(1));
  });
});
