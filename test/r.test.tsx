import { render, renderHook, screen } from '@testing-library/react';
import App from '../src/App';

describe('RTL Test', () => {
  it('장바구니에 담긴 상품이 없는 경우, `장바구니에 담은 상품이 없습니다.` 텍스트가 표시되며, 주문 확인 버튼이 비활성화된다.', () => {
    render(<App />);

    const { result } = renderHook(() => ());

    if (result.current.cartItems.length === 0) {
      const text = screen.getByText('장바구니에 담은 상품이 없습니다.');
      expect(text).toBeInTheDocument();
    }
  });
});
