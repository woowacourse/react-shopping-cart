import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/modules/cartSlice";
import { formatPrice } from "../../../../utils/utils";
import Button from "../../../@shared/Button/Button";
import Image from "../../../@shared/Image/Image";
import * as S from "./OrderItem.styled";

const OrderItem = ({ item }) => {
  const { imageURL, name, price, quantity } = item;

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(addToCart(item));
  };

  return (
    <S.OrderItem>
      <S.ImageWrapper>
        <Image src={imageURL} alt={name} />
      </S.ImageWrapper>
      <S.Info>
        <S.Detail>
          <S.Name>{name}</S.Name>
          <S.PriceAmount>
            <S.Price>수량: {quantity}개</S.Price>
            <S.Amount>{formatPrice(price)}원</S.Amount>
          </S.PriceAmount>
        </S.Detail>
        <S.Button>
          <Button onClick={handleButtonClick}>장바구니</Button>
        </S.Button>
      </S.Info>
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
