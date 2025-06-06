// CartItemsProvider.tsx
import { ReactNode } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  } = useCartItems();

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        deleteCartItem,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
