import { render, screen } from '@testing-library/react';
import CartOrder from 'components/CartOrder';
import React from 'react';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('1 컴포넌트 렌더 테스트', () => {
  test('장바구니의 주문 컴포넌트는 결제 예상 금액과 결제 상품 개수가 있는 주문 버튼을 렌더해야 한다.', () => {
    const totalPrice = 15000;
    const totalCount = 3;
    const expectedButtonText = `주문하기(${totalCount}개)`;
    const expectedTotalPrice = '15,000원';

    render(<CartOrder totalPrice={totalPrice} totalCount={totalCount} />);

    expect(screen.getByText(expectedTotalPrice)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(expectedButtonText);
  });
});
