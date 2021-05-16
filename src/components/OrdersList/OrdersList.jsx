import React from "react";
import { useSelector } from "react-redux";
import * as S from "./OrdersList.styled";

import OrdersListItem from "./OrdersListItem/OrdersListItem";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import Empty from "../@mixins/Empty/Empty";

const OrdersList = () => {
  const ordersList = useSelector((state) => state.order);

  return (
    <S.OrdersList>
      <PageTitle>주문목록</PageTitle>
      {Object.keys(ordersList).length === 0 ? (
        <Empty>주문목록이 텅 비었어요</Empty>
      ) : (
        <S.List aria-label="orders-list">
          {Object.entries(ordersList).map(([id, value]) => (
            <OrdersListItem key={id} id={id} items={value.items} />
          ))}
        </S.List>
      )}
    </S.OrdersList>
  );
};

export default OrdersList;
