import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/modules/cartSlice";
import Button from "../../../@shared/Button/Button";
import CartItem from "../../../Cart/CartInfo/CartItem/CartItem";
import * as S from "./OrderItem.styled";
import { formatPrice } from "../../../../utils/utils";

const OrderItem = ({ item }) => {
  const { image_url: thumbnail, name, price, quantity } = item;

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(addToCart(item));
  };

  return (
    <S.OrderItem>
      <S.Info>
        <S.Img src={thumbnail} alt={name} />
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
  ...CartItem.propTypes,
};

export default OrderItem;
