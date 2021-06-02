import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./OrdersList.styled";

import OrdersListItem from "./OrdersListItem/OrdersListItem";

import Empty from "../@mixins/Empty/Empty";
import { getOrders } from "../../store/modules/orderSlice";

const OrdersList = () => {
  const ordersListItems = useSelector((state) => state.order.items);
  const ordersList = Object.values(ordersListItems).sort(
    (a, b) => b.order_id - a.order_id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <S.OrdersList>
      <S.PageTitle>주문목록</S.PageTitle>
      {Object.keys(ordersList).length === 0 ? (
        <Empty>주문목록이 텅 비었어요</Empty>
      ) : (
        <S.List aria-label="orders-list">
          {ordersList.map((order) => (
            <OrdersListItem
              key={order.order_id}
              id={order.order_id}
              items={order.order_details}
            />
          ))}
        </S.List>
      )}
    </S.OrdersList>
  );
};

export default OrdersList;
