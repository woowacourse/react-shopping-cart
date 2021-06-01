import React from "react";
import { useSelector } from "react-redux";
import { selectOrdersList } from "../../store/modules/orderSlice";
import OrderEmptyList from "../../components/OrderEmptyList/OrderEmptyList";
import OrderList from "../../components/OrderList/OrderList";

const Order = () => {
  const orderList = useSelector(selectOrdersList);

  return orderList.length === 0 ? (
    <OrderEmptyList />
  ) : (
    <OrderList orderList={orderList} />
  );
};

export default Order;
