import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { mockCartItems, mockCoupons } from '../mocks';
import getOrderPrice from '../../src/utils/getOrderPrice';
import App from '../../src/App';
import { applyCouponsToItems, getAvailableCoupons, getMaxDiscountCoupons } from '../../src/utils';
import { Coupon } from '../../src/types';

describe('OrderConfirmPage 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('하단 버튼을 두 번 누르면 결제 확인 페이지로 이동된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });

    const orderButton = screen.getByText('결제하기');
    fireEvent.click(orderButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderConfirmPage')).toBeInTheDocument();
    });
  });

  it('결제 확인 페이지에선 주문한 상품의 종류와 개수가 표시된다.', async () => {
    const cartLength = mockCartItems.length;
    const quantity = mockCartItems.reduce((acc, item) => acc + item.quantity, 0);

    await waitFor(() => {
      expect(
        screen.getByText(`총 ${cartLength}종류의 상품 ${quantity}개를 주문했습니다.`)
      ).toBeInTheDocument();
    });
  });

  it('결제 확인 페이지에선 주문한 상품의 총 결제 금액이 표시된다.', async () => {
    const maxDiscountCoupons = getMaxDiscountCoupons(
      mockCartItems,
      getAvailableCoupons(mockCoupons as Coupon[], mockCartItems),
      0,
      2
    );
    const discountPrice = applyCouponsToItems(mockCartItems, 0, maxDiscountCoupons);

    const price = getOrderPrice(mockCartItems) - discountPrice;

    await waitFor(() => {
      expect(screen.getByText(price.toLocaleString() + '원')).toBeInTheDocument();
    });
  });

  it('결제 확인 페이지에선 장바구니로 돌아가기 버튼이 표시된다.', async () => {
    await waitFor(() => {
      expect(screen.getByText('장바구니로 돌아가기')).toBeInTheDocument();
    });
  });

  it('결제 확인 페이지에선 다시 장바구니 목록으로 돌아갈 수 있는 버튼이 표시된다.', async () => {
    const backButton = screen.getByText('장바구니로 돌아가기');

    await waitFor(() => {
      expect(backButton).toBeInTheDocument();
    });

    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });
});
