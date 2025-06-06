// CheckedCartItemsProvider.tsx
import { ReactNode, useEffect, useRef } from 'react';
import { useCartItemsContext } from './CartItemsContext';
import useCheckedCartItems from '../hooks/useCheckedCartItems';
import { CheckedCartItemsContext } from './CheckedCartItemContext';
import useToggleAllChecked from '../hooks/useToggleAllChecked';
import useDeleteCheckedCartItem from '../hooks/useDeleteCheckedCartItem';

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

  const { isAllChecked, toggleAllChecked } = useToggleAllChecked();
  const { handleClickDelete } = useDeleteCheckedCartItem();

  return (
    <CheckedCartItemsContext.Provider
      value={{
        checkedCartIds,
        isAllChecked,
        init,
        addCheckedCartItem,
        removeCheckedCartItem,
        toggleAllChecked,
        handleClickDelete,
      }}
    >
      {children}
    </CheckedCartItemsContext.Provider>
  );
};

export default CheckedCartItemsProvider;
