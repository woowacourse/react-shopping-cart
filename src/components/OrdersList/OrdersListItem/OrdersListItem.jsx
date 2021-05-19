import React from "react";
import PropTypes from "prop-types";
import * as S from "./OrderListItem.styled";

import OrderItem from "./OrderItem/OrderItem";

const OrdersListItem = ({ id, items }) => (
  <S.OrdersListItem>
    <S.Title>
      <span>주문번호: {id}</span>
      <span>상세보기 {">"}</span>
    </S.Title>
    {Object.entries(items).map(([key, item]) => (
      <OrderItem key={key} item={item} />
    ))}
  </S.OrdersListItem>
);

OrdersListItem.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrdersListItem;
