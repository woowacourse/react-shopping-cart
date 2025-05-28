import { ReactNode, useEffect } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';
import useCheckedCartItems from '../hooks/useCheckedCartItems';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  } = useCartItems();

  const { checkedCartIds, addCheckedCartItem, removeCheckedCartItem, init } =
    useCheckedCartItems();

  useEffect(() => {
    init(cartItems);
  }, [cartItems, init]);

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        deleteCartItem,
        checkedCartIds,
        addCheckedCartItem,
        removeCheckedCartItem,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
