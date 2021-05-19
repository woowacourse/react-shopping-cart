import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  selectOrdersList,
  selectOrderStatus,
} from "../store/modules/orderSlice";
import STATUS from "../constants/status";

const useOrderSelector = (selector = selectOrdersList) => {
  const dispatch = useDispatch();
  const orderStatus = useSelector(selectOrderStatus);

  useEffect(() => {
    if (orderStatus === STATUS.IDLE) {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  return useSelector(selector);
};

export default useOrderSelector;
