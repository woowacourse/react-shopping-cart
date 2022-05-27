import { fireEvent, render, screen } from '@testing-library/react';
import CartOrder from 'components/CartOrder';
import '@testing-library/jest-dom';
import { PATH } from 'constants/path';

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

describe('2 이벤트에 따라 의도한 호출이 일어나는지', () => {
  const totalPrice = 15000;
  const totalCount = 3;

  test('주문하기 버튼을 클릭하면 주문목록 페이지로 이동해야 한다.', () => {
    render(
      <CartOrder
        totalPrice={totalPrice}
        totalCount={totalCount}
        handleClickOrder={() => null}
      />,
    );

    const orderButton = screen.getByRole('button');
    fireEvent.click(orderButton);

    expect(mockNavigate).toBeCalledWith(PATH.ORDER);
  });
});
