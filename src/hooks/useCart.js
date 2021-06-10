import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  getCartsAsync,
  removeCheckedAsync,
  removeFromCartAsync,
} from "../store/modules/cart/cartThunk";
import {
  toggleChecked,
  toggleAllChecked as _toggleAllChecked,
  resetError,
} from "../store/modules/cart/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, loading, errorMessage } = useSelector((state) => state.cart);
  const carts = Object.values(items);
  const cartAmount = carts.reduce((acc, cur) => acc + cur.amount, 0);
  const checkedItems = carts.filter((item) => item.checked);
  const hasCheckedItems = checkedItems.length > 0;
  const totalPrice = checkedItems.reduce(
    (acc, { amount, price }) => acc + amount * price,
    0
  );
  const checkedSet = new Set(carts.map(({ checked }) => checked));
  let isCheckAll = null;
  switch (checkedSet.size) {
    case 0:
      isCheckAll = false;
      break;
    case 1:
      isCheckAll = [...checkedSet].pop();
      break;
    default:
  }

  const getCartAmount = (id) => items[id]?.amount ?? 0;

  const getCarts = () => {
    dispatch(getCartsAsync());
  };

  const addCart = (item) => {
    dispatch(addToCartAsync(item));
  };

  const removeCart = (item) => {
    dispatch(removeFromCartAsync(item));
  };
  const removeCheckedCart = (cart) => {
    dispatch(removeCheckedAsync(cart));
  };

  const toggleCartChecked = (id) => {
    dispatch(toggleChecked(id));
  };

  const toggleAllChecked = () => {
    dispatch(_toggleAllChecked());
  };

  const resetCartError = () => {
    dispatch(resetError());
  };

  return {
    items,
    loading,
    errorMessage,
    cartAmount,
    checkedItems,
    hasCheckedItems,
    isCheckAll,
    totalPrice,
    getCartAmount,
    getCarts,
    addCart,
    removeCart,
    removeCheckedCart,
    toggleCartChecked,
    toggleAllChecked,
    resetCartError,
  };
};
