import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCarts as _getCarts,
  removeChecked,
  removeFromCart,
  toggleChecked,
} from "../store/modules/cartSlice";

// eslint-disable-next-line import/prefer-default-export
export const useCart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const carts = Object.values(items);

  const getCarts = () => {
    dispatch(_getCarts());
  };

  const addCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const removeCheckedCart = (cart) => {
    dispatch(removeChecked(cart));
  };

  const toggleCartChecked = (id) => {
    dispatch(toggleChecked(id));
  };

  const getCartAmount = (id) => items[id]?.amount ?? 0;

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

  return {
    items,
    loading,
    getCarts,
    addCart,
    removeCart,
    removeCheckedCart,
    toggleCartChecked,
    getCartAmount,
    cartAmount,
    checkedItems,
    hasCheckedItems,
    isCheckAll,
    totalPrice,
  };
};
