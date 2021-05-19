import React from "react";
import useOrderSelector from "../../hooks/useOrderSelector";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import OrdersListItem from "./OrdersListItem/OrdersListItem";
import * as S from "./OrdersList.styled";

const OrdersList = () => {
  const ordersList = useOrderSelector();

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
