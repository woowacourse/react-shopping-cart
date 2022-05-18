import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItemList } from "../store/actions";

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

  return {
    cartItemList,
    isLoading,
    errorMessage,
  };
};
