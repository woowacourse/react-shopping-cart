import React from "react";
import PropTypes from "prop-types";
import PaymentListItem from "../PaymentListItem/PaymentListItem";
import * as S from "./PaymentList.styled";

const PaymentList = ({ checkedItems }) => (
  <S.PaymentList>
    <S.Title>주문 상품({checkedItems.length}건)</S.Title>
    <div>
      {checkedItems.map((item) => (
        <PaymentListItem key={item.cartId} item={item} />
      ))}
    </div>
  </S.PaymentList>
);

PaymentList.propTypes = {
  checkedItems: PropTypes.arrayOf(PaymentListItem.propTypes.item).isRequired,
};

export default PaymentList;
