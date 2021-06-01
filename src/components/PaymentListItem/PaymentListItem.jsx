import React from "react";
import PropTypes from "prop-types";
import Image from "../@shared/Image/Image";
import * as S from "./PaymentListItem.styled";

const PaymentListItem = ({ item }) => {
  const { name, imageURL, quantity } = item;
  return (
    <S.PaymentListItem>
      <S.ImageWrapper>
        <Image src={imageURL} alt={name} />
      </S.ImageWrapper>

      <S.Detail>
        <S.Name>{name}</S.Name>
        <S.Amount>수량: {quantity}</S.Amount>
      </S.Detail>
    </S.PaymentListItem>
  );
};

PaymentListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentListItem;
