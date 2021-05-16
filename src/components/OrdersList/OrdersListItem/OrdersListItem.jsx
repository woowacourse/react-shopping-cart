import React from "react";
import PropTypes from "prop-types";
import * as S from "./OrderListItem.styled";

import OrderItem from "./OrderItem/OrderItem";
import CartItem from "../../Cart/CartInfo/CartItem/CartItem";

const OrdersListItem = ({ id, items }) => (
  <S.OrdersListItem>
    <S.Title>
      <span>주문번호: {id}</span>
      <span>상세보기 {">"}</span>
    </S.Title>
    {items.map((item) => (
      <OrderItem key={item.id} item={item} />
    ))}
  </S.OrdersListItem>
);

OrdersListItem.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(CartItem.propTypes.item).isRequired,
};

export default OrdersListItem;
