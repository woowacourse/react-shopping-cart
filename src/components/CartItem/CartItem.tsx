import { css } from "@emotion/react";
import * as S from "./CartItem.styles";
import { Button, Checkbox, PlusMinusButton } from "@/components";
import { CartItemApi } from "@/apis";
import { GetCartItemsResponse } from "@/types";
import { useCartItem } from "@/hooks";

interface CartItemProps {
  cartItem: GetCartItemsResponse["content"][number];
  isSelected: boolean;
  handleCheckboxClick: () => void;
  refetch: () => void;
}

export default function CartItem({ cartItem, isSelected, handleCheckboxClick, refetch }: CartItemProps) {
  const {
    product: { imageUrl, price, name },
    quantity,
  } = cartItem;

  const { increaseCartItem, decreaseCartItem } = useCartItem();

  const handleAddButtonClick = async () => {
    await increaseCartItem(cartItem.product.id);
    refetch();
  };

  const handleMinusButtonClick = async () => {
    await decreaseCartItem(cartItem.product.id);
    refetch();
  };

  const handleDeleteClick = async (id: number) => {
    await CartItemApi.deleteCartItems({ cartItemId: id });
    refetch();
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
            border-radius: 8px;
            padding: 4px 8px;
            color: #000000;
          `}
        >
          삭제
        </Button>
      </S.ButtonWrapper>
      <S.CartItemWrapper>
        <S.CartItemImageWrapper>
          <S.CartItemImage
            src={imageUrl}
            alt={name}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = "images/default-img.png";
            }}
          />
        </S.CartItemImageWrapper>
        <S.CartItemInfoWrapper>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <PlusMinusButton
            quantity={quantity}
            onAddButtonClick={handleAddButtonClick}
            onMinusButtonClick={handleMinusButtonClick}
          />
        </S.CartItemInfoWrapper>
      </S.CartItemWrapper>
    </S.ProductCardCartItemWrapper>
  );
}
