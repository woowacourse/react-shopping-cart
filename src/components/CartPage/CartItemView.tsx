import { CartItem } from "../../types/cartItems";
import styled from "styled-components";
import { UseCartItemsReturn } from "../../hooks/useCartItemControl";
import Counter from "../common/Counter";
import { formatToKRW } from "../../utils/formatToKRW";

export interface CartItemViewProps {
  cartItem: CartItem;
  cartItemControl: UseCartItemsReturn;
}

export default function CartItemView({ cartItem, cartItemControl }: CartItemViewProps) {
  const { remove, updateQuantity, toggleSelection } = cartItemControl;
  const cartItemId = cartItem.id;

  const handleCheckboxChange = () => toggleSelection(cartItemId);
  const handleRemoveButtonClick = () => remove(cartItemId);

  const increaseQuantity = () => updateQuantity(cartItemId, cartItem.quantity + 1);
  const decreaseQuantity = () => updateQuantity(cartItemId, cartItem.quantity - 1);

  const MIN_QUANTITY = 1;

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
            <S.ProductPrice>{formatToKRW(cartItem.product.price)}</S.ProductPrice>
          </S.ProductInfo>
          <Counter
            count={cartItem.quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            minCount={MIN_QUANTITY}
          />
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
    padding-top: 12px;
  `,

  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 24px;
    height: 24px;
  `,

  RemoveButton: styled.button`
    width: 40px;
    height: 24px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    color: rgba(10, 13, 19, 1);
  `,

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
    margin: 9.5px 0;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  ProductName: styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  `,

  ProductPrice: styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 34.75px;
  `,
};
