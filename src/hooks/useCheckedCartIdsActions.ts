import { useCartItemsContext } from '../contexts/CartItemsContext';

const useCheckedCartIdsActions = () => {
  const {
    cartItems,
    checkedCartIds,
    addCheckedCartItem,
    removeCheckedCartItem,
    initCheckedCartIds,
  } = useCartItemsContext();

  const isAllChecked = cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  const toggleAllChecked = () => {
    if (isAllChecked) {
      initCheckedCartIds([]); // 전체 해제
    } else {
      initCheckedCartIds(cartItems); // 전체 선택
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

export default useCheckedCartIdsActions;
