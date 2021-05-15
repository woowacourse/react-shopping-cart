import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  selectOrdersList,
  selectOrderStatus,
} from "../../store/modules/orderSlice";
import STATUS from "../../constants/status";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import OrdersListItem from "./OrdersListItem/OrdersListItem";
import * as S from "./OrdersList.styled";

const OrdersList = () => {
  const dispatch = useDispatch();
  const ordersList = useSelector(selectOrdersList);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  return (
    <S.OrdersList>
      <PageTitle>주문목록</PageTitle>
      <S.List aria-label="orders-list">
        {[...ordersList].reverse().map(({ orderId, orderDetails }) => (
          <OrdersListItem key={orderId} id={orderId} items={orderDetails} />
        ))}
      </S.List>
    </S.OrdersList>
  );
};

export default OrdersList;
