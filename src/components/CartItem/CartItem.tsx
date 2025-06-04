import { Button, Checkbox, PlusMinusButton } from "@/components";
import { useCartItem } from "@/hooks";
import { css } from "@emotion/react";
import Card from "../Card/Card";
import * as S from "./CartItem.styles";

interface CartItemProps {
  id: number;
  isSelected: boolean;
  handleCheckboxClick: () => void;
}

export default function CartItem({ id, isSelected, handleCheckboxClick }: CartItemProps) {
  const { cartItems, increaseCartItem, decreaseCartItem, deleteCartItem, cartItemsStatus } = useCartItem();
  const cartItem = cartItems.content.find((item) => item.id === id);

  if (!cartItem) return null;

  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

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

// function CartItem() {}
