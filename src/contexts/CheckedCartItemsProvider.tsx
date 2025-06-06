// CheckedCartItemsProvider.tsx
import { ReactNode, useEffect, useRef } from 'react';
import { useCartItemsContext } from './CartItemsContext';
import useCheckedCartItems from '../hooks/useCheckedCartItems';
import { CheckedCartItemsContext } from './CheckedCartItemContext';

const CheckedCartItemsProvider = ({ children }: { children: ReactNode }) => {
  const isFirstLoading = useRef(true);
  const { cartItems } = useCartItemsContext();

  const { checkedCartIds, addCheckedCartItem, removeCheckedCartItem, init } =
    useCheckedCartItems();

  useEffect(() => {
    if (!isFirstLoading.current) return;
    if (cartItems.length > 0) {
      isFirstLoading.current = false;
      init(cartItems);
    }
  }, [cartItems, init]);
  console.log(cartItems, checkedCartIds);

  return (
    <CheckedCartItemsContext.Provider
      value={{
        checkedCartIds,
        init,
        addCheckedCartItem,
        removeCheckedCartItem,
      }}
    >
      {children}
    </CheckedCartItemsContext.Provider>
  );
};

export default CheckedCartItemsProvider;
