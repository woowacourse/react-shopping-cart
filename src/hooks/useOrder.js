import { useDispatch, useSelector } from "react-redux";
import {
  getOrders as _getOrders,
  addOrder as _addOrder,
} from "../store/modules/orderSlice";

// eslint-disable-next-line import/prefer-default-export
export const useOrder = () => {
  const dispatch = useDispatch();
  const { items: orders, loading } = useSelector((state) => state.order);

  // TODO : errorMessage 처리 (공통화)
  // TODO : async 메서드 메서드명 변경

  const getOrders = () => {
    dispatch(_getOrders());
  };

  const addOrder = (cart) => {
    dispatch(_addOrder(cart));
  };

  return { orders, loading, getOrders, addOrder };
};
