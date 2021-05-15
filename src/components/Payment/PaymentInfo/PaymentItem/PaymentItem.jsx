import React from "react";
import PropTypes from "prop-types";
import * as S from "./PaymentItem.styled";

const PaymentItem = ({ item }) => {
  const { name, imageURL, quantity } = item;
  return (
    <S.PaymentItem>
      <S.Img src={imageURL} alt={name} />
      <S.Detail>
        <S.Name>{name}</S.Name>
        <S.Amount>수량: {quantity}</S.Amount>
      </S.Detail>
    </S.PaymentItem>
  );
};

PaymentItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentItem;
