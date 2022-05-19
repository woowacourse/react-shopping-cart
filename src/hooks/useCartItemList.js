import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItemList, postCartItem } from "../store/actions";

export const useCartItemList = () => {
  const dispatch = useDispatch();

  const {
    data: cartItemList,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(getCartItemList());
  }, []);

  const updateCartItemQuantity = (id, newQuantity) => () => {
    if (newQuantity > 20) {
      alert("20개 넘게 못 사~~~");
      return;
    }
    dispatch(postCartItem([{ id, quantity: newQuantity }]));
    alert(`${newQuantity}개 장바구니에 담김!`);
  };

  return {
    cartItemList,
    isLoading,
    errorMessage,
    updateCartItemQuantity,
  };
};
