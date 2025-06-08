import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import * as couponApi from '@/api/order';
import { CartItem } from '@/features/Cart/types/Cart.types';
import { OrderCheckoutPage } from '@/pages/OrderCheckoutPage';

import { createTestCartItems } from './Cart.test';

const renderOrderCheckoutPage = (customCartItems?: CartItem[]) => {
  const cartItems = customCartItems || createTestCartItems();

  return render(
    <MemoryRouter initialEntries={[{ pathname: '/order-checkout', state: cartItems }]}>
      <OrderCheckoutPage />
    </MemoryRouter>
  );
};

vi.mock('@/api/order');
const mockCouponApi = vi.mocked(couponApi);
