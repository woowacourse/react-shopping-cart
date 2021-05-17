import React from "react";
import PropTypes from "prop-types";
import * as S from "./PaymentItem.styled";

const PaymentItem = ({ item: { name, thumbnail, order_id: orderId } }) => (
  <S.PaymentItem>
    <S.Img src={thumbnail} alt={name} />
    <S.Detail>
      <S.Name>{name}</S.Name>
      <S.Amount>수량: {orderId.length}</S.Amount>
    </S.Detail>
  </S.PaymentItem>
);

PaymentItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    order_id: PropTypes.arrayOf(PropTypes.number).isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentItem;
