import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addId, removeId } from "../../../../../../modules/checkedIds";
import {
  updateCartProductQuantity,
  removeCartProduct,
} from "../../../../../../modules/cartProducts";

const useShoppingCartProduct = (id, checked, price, quantity) => {
  const [isChecked, setChecked] = useState(true);
  const [productPrice, setProductPrice] = useState(0);
  const dispatch = useDispatch();

  const handleChecked = (id) => {
    if (isChecked) {
      dispatch(removeId(id));
      return;
    }
    dispatch(addId(id));
  };

  const handleIncrement = () => {
    dispatch(updateCartProductQuantity(id, "increment"));
  };

  const handleDecrement = () => {
    dispatch(updateCartProductQuantity(id, "decrement"));
  };

  const handleUpdateQuantityByUser = ({ target }) => {
    dispatch(updateCartProductQuantity(id, "ByUserInput", target.value));
  };

  const handleBackspaceByUser = (event) => {
    const { key, target } = event;

    if (key !== "Backspace") return;
    if (target.value.length !== 1) return;

    event.preventDefault();
    target.select();
  };

  const handleRemoveProduct = () => {
    dispatch(removeCartProduct(id));
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  useEffect(() => {
    setProductPrice(price * quantity);
  }, [price, quantity]);

  return {
    handleChecked,
    handleIncrement,
    handleDecrement,
    handleUpdateQuantityByUser,
    handleBackspaceByUser,
    handleRemoveProduct,
    isChecked,
    productPrice,
  };
};

export default useShoppingCartProduct;
