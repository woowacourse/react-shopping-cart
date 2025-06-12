import React from 'react';
import { SelectedCartItemsProvider } from '../../features/cart/context/SelectedCartItemsProvider';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import { OrderProvider } from '../../features/order/context/OrderProvider';
import { useCouponsContext } from '../../features/coupon/context/useCouponsContext';

const OrderProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { selectedCoupons } = useCouponsContext();
  const { selectedCartItems } = useSelectedCartItemsContext();

  return (
    <OrderProvider selectedCartItems={selectedCartItems} selectedCoupons={selectedCoupons}>
      {children}
    </OrderProvider>
  );
};

export const SelectedCartWithOrderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectedCartItemsProvider>
      <OrderProviderWrapper>{children}</OrderProviderWrapper>
    </SelectedCartItemsProvider>
  );
};
