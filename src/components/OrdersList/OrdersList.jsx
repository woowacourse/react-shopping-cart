import React from "react";
import { useSelector } from "react-redux";
import * as S from "./OrdersList.styled";

import OrdersListItem from "./OrdersListItem/OrdersListItem";
import PageTitle from "../@mixins/PageTitle/PageTitle";

const OrdersList = () => {
  const ordersList = useSelector((state) => state.order);

  return (
    <S.OrdersList>
      <PageTitle>주문목록</PageTitle>
      <S.List aria-label="orders-list">
        {Object.entries(ordersList).map(([id, value]) => (
          <OrdersListItem key={id} id={id} items={value.items} />
        ))}
      </S.List>
    </S.OrdersList>
  );
};

export default OrdersList;
