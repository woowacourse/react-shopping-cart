import { ReactNode, useEffect, useState } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';
import useCheckedCartIds from '../hooks/useCheckedCartIds';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const cartItemsState = useCartItems();
  const checkedCartItemsState = useCheckedCartIds();

  const { cartItems } = cartItemsState;
  const { init } = checkedCartItemsState;

  useEffect(() => {
    if (!isFirstLoading) return;
    if (cartItems.length !== 0) {
      setIsFirstLoading(false);
      init(cartItems);
    }
  }, [cartItems, init, isFirstLoading]);

  return (
    <CartItemsContext.Provider
      value={{
        ...cartItemsState,
        ...checkedCartItemsState,
      }}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
