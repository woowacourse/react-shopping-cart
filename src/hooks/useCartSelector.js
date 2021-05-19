import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  selectAllCartItems,
  selectCartStatus,
} from "../store/modules/cartSlice";
import STATUS from "../constants/status";

const useCartSelector = (selector = selectAllCartItems) => {
  const dispatch = useDispatch();
  const cartStatus = useSelector(selectCartStatus);

  useEffect(() => {
    if (cartStatus === STATUS.IDLE) {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  return useSelector(selector);
};

export default useCartSelector;
