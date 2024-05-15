import { CartItem } from "../types/cartItems";
import styled from "styled-components";
import { useCartItemControl } from "../hooks/useCartItemControl";

export interface CartItemViewProps {
  cartItem: CartItem;
}

export default function CartItemView({ cartItem }: CartItemViewProps) {
  const { remove, updateQuantity, toggleSelection } = useCartItemControl();

  const handleCheckboxChange = () => {
    toggleSelection(cartItem.id);
  };

  const handleRemoveButtonClick = () => {
    remove(cartItem.id);
  };

  const handleIncreaseButtonClick = () => {
    updateQuantity(cartItem.id, cartItem.quantity + 1);
  };

  const handleDecreaseButtonClick = () => {
    updateQuantity(cartItem.id, cartItem.quantity - 1);
  };

  return (
    <S.CartItemContainer>
      <S.TopWrapper>
        <S.Checkbox type="checkbox" checked={cartItem.isSelected} onChange={handleCheckboxChange} />
        <S.RemoveButton onClick={handleRemoveButtonClick}>삭제</S.RemoveButton>
      </S.TopWrapper>

      <S.ProductOuterWrapper>
        <S.ProductImage src={cartItem.product.imageUrl} alt="Product Image" />
        <S.ProductInnerWrapper>
          <S.ProductInfo>
            <S.ProductName>{cartItem.product.name}</S.ProductName>
            <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          </S.ProductInfo>
          <S.CartItemCountControl>
            <S.CountButton onClick={handleDecreaseButtonClick}>-</S.CountButton>
            <S.Count>{cartItem.quantity}</S.Count>
            <S.CountButton onClick={handleIncreaseButtonClick}>+</S.CountButton>
          </S.CartItemCountControl>
        </S.ProductInnerWrapper>
      </S.ProductOuterWrapper>
    </S.CartItemContainer>
  );
}

const S = {
  CartItemContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    border-top: 1px solid #d9d9d9;
  `,
  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Checkbox: styled.input``,
  RemoveButton: styled.button``,

  ProductOuterWrapper: styled.div`
    display: flex;
    gap: 24px;
  `,
  ProductImage: styled.img`
    width: 112px;
    height: 112px;
    border-radius: 10px;
  `,
  ProductInnerWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  CartItemCountControl: styled.div`
    display: flex;
    gap: 4px;
  `,

  ProductInfo: styled.div``,
  ProductName: styled.div``,
  ProductPrice: styled.div``,
  CountButton: styled.button``,
  Count: styled.div``,
};
