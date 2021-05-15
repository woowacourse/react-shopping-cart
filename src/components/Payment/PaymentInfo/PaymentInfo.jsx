import React from "react";
import PropTypes from "prop-types";
import CartItem from "../../Cart/CartInfo/CartItem/CartItem";
import PaymentItem from "./PaymentItem/PaymentItem";
import * as S from "./PaymentInfo.styled";

const PaymentInfo = ({ checkedItems }) => (
  <S.PaymentInfo>
    <S.Title>주문 상품({checkedItems.length}건)</S.Title>
    <div>
      {checkedItems.map((item) => (
        <PaymentItem key={item.cartId} item={item} />
      ))}
    </div>
  </S.PaymentInfo>
);

PaymentInfo.propTypes = {
  checkedItems: PropTypes.arrayOf(CartItem.propTypes.item).isRequired,
};

export default PaymentInfo;
