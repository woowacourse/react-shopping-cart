import OrderCheckPage from '@/pages/orderCheck/OrderCheckPage';
import { ROUTE } from '@/shared';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import mockCartItems from '../src/mocks/data/mock-cart-items.json';

describe('OrderCheckPage 쿠폰 적용 테스트', () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: ROUTE.orderCheck,
            state: { orderProducts: mockCartItems },
          },
        ]}
      >
        <Routes>
          <Route path={ROUTE.orderCheck} element={<OrderCheckPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('페이지를 로드했을 때 최대 할인 금액으로 쿠폰이 자동 선택된다.', async () => {
    // 쿠폰 모달 열기
    const couponButton = await screen.findByRole('button', {
      name: /쿠폰 적용/i,
    });
    fireEvent.click(couponButton);

    // 체크된 쿠폰이 정확히 2개인지 확인
    const modalButtons = await screen.findAllByRole('button');
    const selectedCoupons = modalButtons.filter(
      (c) => c.getAttribute('aria-checked') === 'true'
    );

    expect(selectedCoupons.length).toBe(2);
  });

  it('disable 상태의 쿠폰은 선택되지 않는다.', async () => {
    const couponButton = await screen.findByRole('button', {
      name: /쿠폰 적용/i,
    });
    fireEvent.click(couponButton);

    const couponModal = await screen.findByTestId('coupon-modal');
    const couponCheckboxes = within(couponModal).getAllByRole('button');
    // 미라클 모닝 쿠폰
    const forthCheckbox = couponCheckboxes[3];

    expect(forthCheckbox).toBeDisabled();
  });

  it('선택된 쿠폰에 따라 할인 금액이 정확히 표시된다.', async () => {
    const couponButton = await screen.findByRole('button', {
      name: /쿠폰 적용/i,
    });
    fireEvent.click(couponButton);

    const couponModal = await screen.findByTestId('coupon-modal');
    const couponCheckboxes = within(couponModal).getAllByRole('button');
    // 선택된 모든 쿠폰 해제
    fireEvent.click(couponCheckboxes[0]);
    fireEvent.click(couponCheckboxes[1]);

    const applyButton = screen.getByRole('button', {
      name: /할인 쿠폰 사용하기/,
    });
    expect(applyButton).toHaveTextContent('총 0원 할인 쿠폰 사용하기');
  });

  it('모달에서 쿠폰 선택 변경 후, 사용하기 버튼을 누르면 할인 금액이 갱신된다.', async () => {
    const shippingToggle = await screen.findByLabelText(
      /제주도 및 도서 산간 지역/i
    );
    fireEvent.click(shippingToggle); // 도서산간 on
    const couponButton = await screen.findByRole('button', {
      name: /쿠폰 적용/i,
    });
    fireEvent.click(couponButton);

    const couponModal = await screen.findByTestId('coupon-modal');
    const couponCheckboxes = within(couponModal).getAllByRole('button');
    // 2개 구매 시 1개 무료 쿠폰 선택 해제 후, 무료 배송 쿠폰 선택
    fireEvent.click(couponCheckboxes[1]);
    fireEvent.click(couponCheckboxes[2]);
    const applyButton = screen.getByRole('button', {
      name: /할인 쿠폰 사용하기/,
    });
    expect(applyButton).toHaveTextContent('총 8,000원 할인 쿠폰 사용하기');
    fireEvent.click(applyButton);

    const priceRow = await screen.findAllByTestId('price-row');
    const discountRow = priceRow[1];
    expect(discountRow).toHaveTextContent('-8,000원');
  });
});
