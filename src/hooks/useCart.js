import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCarts,
  removeChecked,
  removeFromCart,
  toggleChecked,
} from "../store/modules/cartSlice";

// eslint-disable-next-line import/prefer-default-export
export const useCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const carts = Object.values(items);

  useEffect(() => {
    if (carts.length !== 0) return;
    dispatch(getCarts());
  }, [dispatch, carts.length]);

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
    addCart,
    removeCart,
    removeCheckedCart,
    toggleCartChecked,
    checkedItems,
    hasCheckedItems,
    isCheckAll,
    totalPrice,
  };
};
