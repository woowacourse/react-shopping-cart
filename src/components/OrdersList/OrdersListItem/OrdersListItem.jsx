import React from "react";
import PropTypes from "prop-types";
import OrderItem from "./OrderItem/OrderItem";
import * as S from "./OrderListItem.styled";

const OrdersListItem = ({ id, items }) => (
  <S.OrdersListItem>
    <S.Title>
      <span>주문번호: {id}</span>
      <span>상세보기 {">"}</span>
    </S.Title>
    {items.map((item) => (
      <OrderItem key={item.productId} item={item} />
    ))}
  </S.OrdersListItem>
);

OrdersListItem.propTypes = {
  id: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(OrderItem.propTypes.item).isRequired,
};

export default OrdersListItem;
