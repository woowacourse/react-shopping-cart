import React from "react";
import { useSelector } from "react-redux";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import OrdersListItem from "./OrdersListItem/OrdersListItem";
import * as S from "./OrdersList.styled";

const OrdersList = () => {
  const ordersList = useSelector((state) => state.order);

  return (
    <S.OrdersList>
      <PageTitle>주문목록</PageTitle>
      <S.List aria-label="orders-list">
        {Object.entries(ordersList).map(([id, items]) => (
          <OrdersListItem key={id} id={id} items={items} />
        ))}
      </S.List>
    </S.OrdersList>
  );
};

export default OrdersList;
