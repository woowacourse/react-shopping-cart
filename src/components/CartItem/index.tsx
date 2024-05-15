import React from "react";
import { CartItemType } from "../../types";
import Button from "../common/Button";
import {
  Wrapper,
  ItemImg,
  Header,
  Body,
  ItemPrice,
  ItemInfo,
  ItemInfoWrapper,
  ItemQuantity,
} from "./style";
import FilledCheck from "../../assets/icon/FilledCheck";

interface CardItemProps {
  cartItem: CartItemType;
}

const CardItem = ({ cartItem }: CardItemProps) => {
  // 선택 boolean, 상품 name, price, quantity, 삭제 버튼
  const { product, quantity } = cartItem;

  return (
    <Wrapper>
      <Header>
        <Button $borderRadius="8px">
          <FilledCheck color="white" />
        </Button>
        <Button $theme="white" $size="s">
          삭제
        </Button>
      </Header>
      <Body>
        <ItemImg src={product.imageUrl} />
        <ItemInfoWrapper>
          <ItemInfo>
            <span>{product.name}</span>
            <ItemPrice>{product.price.toLocaleString("ko-KR")}</ItemPrice>
          </ItemInfo>
          <ItemQuantity>
            <Button $theme="white" $size="xs">
              +
            </Button>
            <span>{quantity}</span>
            <Button $theme="white" $size="xs">
              -
            </Button>
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CardItem;
