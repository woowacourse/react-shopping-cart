import { Button, Card, Checkbox, PlusMinusButton } from "@/components";
import { useCartItem, useCartItemQuery } from "@/hooks";
import { css } from "@emotion/react";
import * as S from "./CartItem.styles";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import { theme } from "@/styles";
import { memo } from "react";

interface CartItemProps {
  id: number;
}

export default memo(function CartItem({ id }: CartItemProps) {
  const { data: cartItems, status: cartItemsStatus } = useCartItemQuery();
  const { deleteCartItem, increaseCartItem, decreaseCartItem } = useCartItem();
  const { selectedItemIds, setSelectedItemIds } = useShoppingCartContext();

  const cartItem = cartItems.content.find((item) => item.id === id);
  if (!cartItem) return null;

  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const isSelected = selectedItemIds.includes(id);

  const handleDeleteClick = () => {
    setSelectedItemIds((prev) => prev.filter((itemId) => itemId !== cartItem.id));
    deleteCartItem(id);
  };

  const handleAddButtonClick = () => {
    increaseCartItem(cartItem.product.id);
  };

  const handleMinusButtonClick = () => {
    decreaseCartItem(cartItem.product.id);
  };

  const handleCheckboxClick = (itemId: number) => {
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  return (
    <S.ProductCardCartItemWrapper>
      <S.ButtonWrapper>
        <Checkbox checked={isSelected} onClick={() => handleCheckboxClick(id)} />

        <Button
          onClick={handleDeleteClick}
          css={css`
            background-color: ${theme.colors.white};
            width: fit-content;
            border: 1px solid ${theme.colors.gray};
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
});
