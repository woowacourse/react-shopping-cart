import { useCartItemsContext } from '../contexts/CartItemsContext';

const useCheckedCartItemActions = () => {
  const { cartItems, checkedCartIds, addCheckedCartItem, removeCheckedCartItem, init } =
    useCartItemsContext();

  const isAllChecked = cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  const toggleAllChecked = () => {
    if (isAllChecked) {
      init([]); // 전체 해제
    } else {
      init(cartItems); // 전체 선택
    }
  };

  const toggleSingleChecked = (id: number) => {
    if (checkedCartIds.includes(id)) {
      removeCheckedCartItem(id);
    } else {
      addCheckedCartItem(id);
    }
  };

  return {
    isAllChecked,
    toggleAllChecked,
    toggleSingleChecked,
  };
};

export default useCheckedCartItemActions;
