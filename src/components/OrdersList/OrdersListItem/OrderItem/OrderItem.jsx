import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/modules/cartSlice";
import { formatPrice } from "../../../../utils/utils";
import Button from "../../../@shared/Button/Button";
import * as S from "./OrderItem.styled";

const OrderItem = ({ item }) => {
  const { imageURL, name, price, quantity } = item;

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(addToCart(item));
  };

  return (
    <S.OrderItem>
      <S.Info>
        <S.Img src={imageURL} alt={name} />
        <S.Detail>
          <S.Name>{name}</S.Name>
          <S.PriceAmount>
            {formatPrice(price)}원 / 수량: {quantity}개
          </S.PriceAmount>
        </S.Detail>
      </S.Info>
      <S.Button>
        <Button onClick={handleButtonClick}>장바구니</Button>
      </S.Button>
    </S.OrderItem>
  );
};

OrderItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderItem;
