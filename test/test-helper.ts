import { screen, within } from '@testing-library/react';
import { vi } from 'vitest';

import { CartItem } from '@/features/Cart/types/Cart.types';

export const createCartItem = (
  id: number,
  name: string,
  price: number,
  quantity: number = 1,
  isChecked: boolean = true
): CartItem => ({
  id,
  quantity,
  isChecked,
  product: {
    id,
    name,
    price,
    category: '가전',
    quantity: 2,
    imageUrl: `https://example.com/product${id}.jpg`,
  },
});

export const expectCouponState = (
  couponText: string,
  options: {
    isEnabled?: boolean;
    hasBlackColor?: boolean;
  } = {}
) => {
  const { isEnabled = true, hasBlackColor = true } = options;

  const coupon = screen.getByText(couponText);
  const container = coupon.closest('div');
  const checkbox = container && within(container).getByRole('checkbox');

  expect(checkbox).toHaveAttribute('aria-disabled', isEnabled ? 'false' : 'true');

  if (hasBlackColor) {
    expect(coupon).toHaveStyle('color: black');
  }

  return { coupon, container, checkbox };
};

export const expectCouponUsageMessage = (discountAmount: string) => {
  expect(screen.getByText(`총 ${discountAmount} 할인 쿠폰 사용하기`)).toBeInTheDocument();
};

export const mockTime = (timeString: string) => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date(timeString));
};

export const mockExpiredCouponsScenario = () => {
  const mockDate = new Date('2025-12-31');
  vi.spyOn(Date, 'now').mockReturnValue(mockDate.getTime());
  vi.spyOn(global, 'Date').mockImplementation(() => mockDate);
  vi.setSystemTime(new Date('2025-12-31'));
};

export const expectAllCheckboxesDisabled = () => {
  const checkboxes = screen.getAllByRole('checkbox');
  checkboxes.forEach((checkbox) => {
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
  });
};
