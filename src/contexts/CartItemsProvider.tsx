import { ReactNode, useEffect, useRef } from 'react';
import { CartItemsContext } from './CartItemsContext';
import useCartItems from '../hooks/useCartItems';
import useCheckedCartItems from '../hooks/useCheckedCartItems';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const isFirstLoading = useRef(true);

  const {
    cartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  } = useCartItems();

  const { checkedCartIds, addCheckedCartItem, removeCheckedCartItem, init } =
    useCheckedCartItems();

  useEffect(() => {
    if (!isFirstLoading.current) return;

    if (cartItems.length !== 0) {
      isFirstLoading.current = false;
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
    if (cartItems.find((item) => item.id === id)?.quantity === 1) {
      handleClickDelete(id);
      return;
    }

    decreaseCartItemQuantity(id);
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
