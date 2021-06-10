import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../store/modules/order/orderSlice";
import {
  addOrderAsync,
  getOrdersAsync,
} from "../store/modules/order/orderThunk";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { items: orders, loading, errorMessage } = useSelector(
    (state) => state.order
  );

  const getOrders = () => {
    dispatch(getOrdersAsync());
  };

  const addOrder = (cart) => {
    dispatch(addOrderAsync(cart));
  };

  const resetOrderError = () => {
    dispatch(resetError());
  };

  return {
    orders,
    loading,
    errorMessage,
    getOrders,
    addOrder,
    resetOrderError,
  };
};
