// CartItemsProvider.tsx
import { ReactNode } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const { cartItems, refetch } = useCartItems();

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        refetch,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
