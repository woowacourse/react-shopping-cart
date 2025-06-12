import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';
import { mockCoupons } from '../mocks';

describe('CouponCard 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('쿠폰 모달에서 쿠폰 정보 카드가 표시된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });

    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('coupon-card')).toHaveLength(mockCoupons.length);
  });

  it('쿠폰 정보 카드에는 쿠폰의 정보가 표시된다.', async () => {
    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    const firstCouponCard = screen.getAllByTestId('coupon-card')[0];

    const [year, month, day] = mockCoupons[0].expirationDate.split('-').map(Number);

    expect(
      within(firstCouponCard).getByText(`만료일: ${year}년 ${month}월 ${day}일`)
    ).toBeInTheDocument();
    if (mockCoupons[0].minimumAmount) {
      const price = mockCoupons[0].minimumAmount.toLocaleString();
      expect(
        within(firstCouponCard).getByText('최소 주문 금액: ' + price + '원')
      ).toBeInTheDocument();
    }
    if (mockCoupons[0].availableTime) {
      const start = mockCoupons[0].availableTime.start;
      const end = mockCoupons[0].availableTime.end;

      expect(
        within(firstCouponCard).getByText(`사용 가능 시간: ${start}부터 ${end}까지`)
      ).toBeInTheDocument();
    }

    expect(screen.getAllByTestId('coupon-card')).toHaveLength(mockCoupons.length);
  });
});
