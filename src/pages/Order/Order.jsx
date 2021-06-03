import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrdersList,
  selectOrderStatus,
  fetchOrders,
} from "../../store/modules/orderSlice";
import STATUS from "../../constants/status";
import OrderEmptyList from "../../components/OrderEmptyList/OrderEmptyList";
import OrderList from "../../components/OrderList/OrderList";

const Order = () => {
  const dispatch = useDispatch();
  const orderList = useSelector(selectOrdersList);
  const orderStatus = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return orderStatus === STATUS.SUCCEEDED && orderList.length === 0 ? (
    <OrderEmptyList />
  ) : (
    <OrderList orderList={orderList} />
  );
};

export default Order;
