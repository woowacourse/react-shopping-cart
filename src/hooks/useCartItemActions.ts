import { useCartItemsContext } from '../contexts/CartItemsContext';

const useCartItemActions = (id: number) => {
  const {
    cartItems,
    checkedCartIds,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    addCheckedCartItem,
    deleteCartItem,
    removeCheckedCartItem,
  } = useCartItemsContext();

  const isChecked = checkedCartIds.includes(id);

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeCheckedCartItem(id);
      return;
    }
    addCheckedCartItem(id);
  };

  const handleClickIncrease = (id: number) => increaseCartItemQuantity(id);

  const handleClickDelete = (id: number) => {
    deleteCartItem(id);
    removeCheckedCartItem(id);
  };

  const handleClickDecrease = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      handleClickDelete(id);
    } else {
      decreaseCartItemQuantity(id);
    }
  };

  return {
    isChecked,
    handleCheckBoxClick,
    handleClickIncrease,
    handleClickDelete,
    handleClickDecrease,
  };
};

export default useCartItemActions;
