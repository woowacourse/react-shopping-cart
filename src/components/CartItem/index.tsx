import React from "react";
import { CartItemType } from "../../types";
import Button from "../common/Button";
import {
  Wrapper,
  ItemImg,
  Header,
  Body,
  ItemName,
  ItemPrice,
  ItemInfo,
  ItemInfoWrapper,
  ItemQuantity,
  QuantityText,
} from "./style";
import FilledCheck from "../../assets/icon/FilledCheck";

interface CardItemProps {
  cartItem: CartItemType;
}

const CardItem = ({ cartItem }: CardItemProps) => {
  // 선택 boolean, 상품 name, price, quantity, 삭제 버튼
  const { id, product, quantity } = cartItem;

  return (
    <Wrapper>
      <Header>
        <Button>
          <FilledCheck color="white" />
        </Button>
        <Button>삭제</Button>
      </Header>
      <Body>
        <ItemImg src={product.imageUrl} />
        <ItemInfoWrapper>
          <ItemInfo>
            <ItemName>{product.name}</ItemName>
            <ItemPrice>{product.price.toLocaleString("ko-KR")}</ItemPrice>
          </ItemInfo>
          <ItemQuantity>
            <Button>+</Button>
            <QuantityText>{quantity}</QuantityText>
            <Button>-</Button>
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CardItem;
