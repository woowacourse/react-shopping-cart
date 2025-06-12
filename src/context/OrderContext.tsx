import { createContext, useContext, ReactNode } from 'react';
import { CartProduct } from '../types/cart';

interface OrderContextType {
  selectedCartItems: CartProduct[];
  price: number;
  shippingFee: number;
  totalPrice: number;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({
  children,
  selectedCartItems,
  price,
  shippingFee,
  totalPrice,
}: {
  children: ReactNode;
  selectedCartItems: CartProduct[];
  price: number;
  shippingFee: number;
  totalPrice: number;
}) {
  return (
    <OrderContext.Provider
      value={{
        selectedCartItems,
        price,
        shippingFee,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
