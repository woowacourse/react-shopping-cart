import React from "react";
import PropTypes from "prop-types";
import CartItem from "../../components/Cart/CartInfo/CartItem/CartItem";
import * as S from "./PaymentInfo.styled";
import PaymentItem from "./PaymentItem/PaymentItem";

const PaymentInfo = ({ checkedItems }) => (
  <S.PaymentInfo>
    <S.Title>주문 상품({checkedItems.length}건)</S.Title>
    <div>
      {checkedItems.map((item) => (
        <PaymentItem key={item.id} item={item} />
      ))}
    </div>
  </S.PaymentInfo>
);

PaymentInfo.propTypes = {
  checkedItems: PropTypes.arrayOf(CartItem.propTypes.item).isRequired,
};

export default PaymentInfo;
