import { Button, Checkbox, PlusMinusButton } from "@/components";
import { useCartItem } from "@/hooks";
import { GetCartItemsResponse } from "@/types";
import { css } from "@emotion/react";
import * as S from "./CartItem.styles";
import Card from "../Card/Card";

interface CartItemProps {
  cartItem: GetCartItemsResponse["content"][number];
  isSelected: boolean;
  handleCheckboxClick: () => void;
}

export default function CartItem({ cartItem, isSelected, handleCheckboxClick }: CartItemProps) {
  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const { increaseCartItem, decreaseCartItem, deleteCartItem, cartItemsStatus } = useCartItem();

  const handleAddButtonClick = () => {
    increaseCartItem(cartItem.product.id);
  };

  const handleMinusButtonClick = () => {
    decreaseCartItem(cartItem.product.id);
  };

  const handleDeleteClick = (id: number) => {
    deleteCartItem(id);
  };

  return (
    <S.ProductCardCartItemWrapper>
      <S.ButtonWrapper>
        <Checkbox checked={isSelected} onClick={handleCheckboxClick} />

        <Button
          onClick={() => handleDeleteClick(cartItem.id)}
          css={css`
            background-color: #fff;
            width: fit-content;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            padding: 4px 8px;
            color: black;
          `}
        >
          삭제
        </Button>
      </S.ButtonWrapper>

      <Card>
        <Card.Image src={imageUrl} alt={name} />
        <Card.Info>
          <Card.Name>{name}</Card.Name>
          <Card.Description>{price.toLocaleString()}원</Card.Description>
          <PlusMinusButton
            isLoading={cartItemsStatus === "loading"}
            quantity={quantity}
            onAddButtonClick={handleAddButtonClick}
            onMinusButtonClick={handleMinusButtonClick}
          />
        </Card.Info>
      </Card>
    </S.ProductCardCartItemWrapper>
  );
}
