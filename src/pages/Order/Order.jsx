import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OrderEmptyList } from "../../components/OrderEmptyList/OrderEmptyList.styled";
import OrderList from "../../components/OrderList/OrderList";
import STATUS from "../../constants/status";
import {
  fetchOrders,
  resetStatus,
  selectOrdersList,
  selectOrderStatus,
} from "../../store/modules/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderStatus = useSelector(selectOrderStatus);
  const orderList = useSelector(selectOrdersList);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (orderStatus === STATUS.IDLE) {
      dispatch(fetchOrders());

      return () => dispatch(resetStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return orderList.length === 0 ? (
    <OrderEmptyList />
  ) : (
    <OrderList orderList={orderList} />
  );
};

export default Order;
