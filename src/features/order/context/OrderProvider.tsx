import { createContext, useState } from 'react';
import { calculateOrderTotal } from '../utils/orderCalculations';
import { OrderCalculation, OrderOptions } from '../types/order';
import { useCouponsContext } from '../../coupon/context/useCouponsContext';
import { useSelectedCartItemsContext } from '../../cart/context/useSelectedCartItemsContext';

interface OrderContextType extends OrderCalculation, OrderOptions {
  updateRemoteArea: (isRemote: boolean) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const { selectedCoupons } = useCouponsContext();
  const { selectedCartItems } = useSelectedCartItemsContext();
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
