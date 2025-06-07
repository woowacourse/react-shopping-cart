import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { mockCartItems } from '../mocks';
import App from '../../src/App';

describe('OrderPage 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('하단 버튼을 한 번 누르면 주문 확인 페이지로 이동된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 주문한 상품의 종류와 개수가 표시된다.', async () => {
    const cartLength = mockCartItems.length;
    const quantity = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);

    await waitFor(() => {
      expect(
        screen.getByText(`총 ${cartLength}종류의 상품 ${quantity}개를 주문합니다.`)
      ).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 결제하기 버튼이 표시된다.', async () => {
    await waitFor(() => {
      expect(screen.getByText('결제하기')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 다시 장바구니 목록으로 돌아갈 수 있는 버튼이 표시된다.', async () => {
    const backButton = screen.getByAltText('goBack');

    await waitFor(() => {
      expect(backButton).toBeInTheDocument();
    });

    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });
});
