import React from "react";
import PropTypes from "prop-types";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import OrderListItem from "../OrderListItem/OrderListItem";
import * as S from "./OrderList.styled";

const OrderList = ({ orderList }) => (
  <S.OrderList>
    <PageTitle>주문목록</PageTitle>
    <S.List aria-label="orders-list">
      {[...orderList].reverse().map(({ orderId, orderDetails }) => (
        <OrderListItem key={orderId} id={orderId} items={orderDetails} />
      ))}
    </S.List>
  </S.OrderList>
);

OrderList.propTypes = {
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number,
      orderDetails: PropTypes.arrayOf(
        PropTypes.shape(OrderListItem.propTypes.items)
      ),
    })
  ).isRequired,
};

export default OrderList;
