import { Button, Checkbox, PlusMinusButton } from "@/components";
import { useCartItemQuery } from "@/hooks";
import { css } from "@emotion/react";
import Card from "../Card/Card";
import * as S from "./CartItem.styles";

interface CartItemProps {
  id: number;
  isSelected: boolean;
  onCheckboxClick: () => void;
  onDeleteClick: (id: number) => void;
  onAddButtonClick: () => void;
  onMinusButtonClick: () => void;
}

export default function CartItem({
  id,
  isSelected,
  onCheckboxClick,
  onDeleteClick,
  onAddButtonClick,
  onMinusButtonClick,
}: CartItemProps) {
  const { data: cartItems, status: cartItemsStatus } = useCartItemQuery();
  const cartItem = cartItems.content.find((item) => item.id === id);

  if (!cartItem) return null;

  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  return (
    <S.ProductCardCartItemWrapper>
      <S.ButtonWrapper>
        <Checkbox checked={isSelected} onClick={onCheckboxClick} />

        <Button
          onClick={() => onDeleteClick(cartItem.id)}
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
            onAddButtonClick={onAddButtonClick}
            onMinusButtonClick={onMinusButtonClick}
          />
        </Card.Info>
      </Card>
    </S.ProductCardCartItemWrapper>
  );
}

// function CartItem() {}
