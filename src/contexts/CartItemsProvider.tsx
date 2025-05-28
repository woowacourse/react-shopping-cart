import { ReactNode, useEffect, useState } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';
import useCheckedCartItems from '../hooks/useCheckedCartItems';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  } = useCartItems();

  const { checkedCartIds, addCheckedCartItem, removeCheckedCartItem, init } =
    useCheckedCartItems();

  useEffect(() => {
    if (!isFirstLoading) return;

    if (cartItems.length !== 0) {
      setIsFirstLoading(false);
    }

    init(cartItems);
  }, [cartItems, init, isFirstLoading]);

  const isAllChecked =
    cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  const toggleAllChecked = () => {
    if (isAllChecked) init([]);
    else init(cartItems);
  };

  const handleClickDelete = (id: number) => {
    deleteCartItem(id);
    removeCheckedCartItem(id);
  };

  const handleClickDecrease = (id: number) => {
    decreaseCartItemQuantity(id);
    removeCheckedCartItem(id);
  };

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        increaseCartItemQuantity,
        handleClickDecrease,
        handleClickDelete,
        checkedCartIds,
        addCheckedCartItem,
        removeCheckedCartItem,
        isAllChecked,
        toggleAllChecked,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
