import { createContext, useState } from 'react';
import { CartItem } from '../../cart/types/cart';
import { Coupon } from '../../coupon/types/coupon';
import { calculateOrderTotal } from '../utils/orderCalculations';
import { OrderCalculation, OrderOptions } from '../types/order';

interface OrderContextType extends OrderCalculation, OrderOptions {
  updateRemoteArea: (isRemote: boolean) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: React.ReactNode;
  selectedCartItems: CartItem[];
  selectedCoupons: Coupon[];
}

export const OrderProvider = ({ children, selectedCartItems, selectedCoupons }: OrderProviderProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const orderCalculation = calculateOrderTotal({
    selectedCartItems,
    selectedCoupons,
    isRemoteArea,
  });

  const updateRemoteArea = (isRemote: boolean) => {
    setIsRemoteArea(isRemote);
  };

  return (
    <OrderContext.Provider
      value={{
        ...orderCalculation,
        isRemoteArea,
        updateRemoteArea,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
