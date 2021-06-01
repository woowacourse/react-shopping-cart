import React from "react";
import PropTypes from "prop-types";
import OrderListItemDetail from "../OrderListItemDetail/OrderListItemDetail";
import * as S from "./OrderListItem.styled";

const OrderListItem = ({ id, items }) => (
  <S.OrdersListItem>
    <S.Title>
      <span>주문번호: {id}</span>
      <span>상세보기 {">"}</span>
    </S.Title>
    {items.map((item) => (
      <OrderListItemDetail key={item.productId} item={item} />
    ))}
  </S.OrdersListItem>
);

OrderListItem.propTypes = {
  id: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(OrderListItemDetail.propTypes.item).isRequired,
};

export default OrderListItem;
