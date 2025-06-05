import { createContext, useContext, useState } from 'react';
import { CartItemProps } from '../types/cartItem';

type CartListContextType = {
  cartList: CartItemProps[];
  setCartList: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartListContext = createContext<CartListContextType | null>(null);

export const CartListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <CartListContext.Provider
      value={{
        cartList,
        setCartList,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CartListContext.Provider>
  );
};

export const useCartListContext = () => {
  const context = useContext(CartListContext);
  if (!context) {
    throw new Error(
      'useCartListContext must be used within a CartListProvider'
    );
  }
  return context;
};

export default CartListContext;
