import { createContext, useContext, useState, ReactNode } from 'react';
import { CartProduct } from '../types/cart';

interface OrderContextType {
  isOpenModal: boolean;
  selectedCartItems: CartProduct[];
  price: number;
  shippingFee: number;
  totalPrice: number;
  toggleModal: () => void;
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);

  return (
    <OrderContext.Provider
      value={{
        isOpenModal,
        selectedCartItems,
        price,
        shippingFee,
        totalPrice,
        toggleModal,
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
