import React from "react";
import PropTypes from "prop-types";
import * as S from "./PaymentItem.styled";

const PaymentItem = ({ item: { name, thumbnail, amount } }) => (
  <S.PaymentItem>
    <S.Img src={thumbnail} alt={name} />
    <S.Detail>
      <S.Name>{name}</S.Name>
      <S.Amount>수량: {amount}</S.Amount>
    </S.Detail>
  </S.PaymentItem>
);

PaymentItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentItem;
