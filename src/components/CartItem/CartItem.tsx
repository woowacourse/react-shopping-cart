import * as S from "./CartItem.styled";

import { CartDataType } from "../../types/cartDataType";
import QuantityButton from "../QuantityButton/QuantityButton";

function CartItem({ cart }: { cart: CartDataType }) {
  const { price, name, imageUrl, quantity } = cart.product;

  return (
    <>
      <S.ItemContainer>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl}></S.ProductImage>
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
            <QuantityButton
              quantity={quantity}
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
          </S.ItemContent>
        </S.ItemInfo>
        <S.DeleteButton>삭제</S.DeleteButton>
      </S.ItemContainer>
      <hr />
    </>
  );
}
export default CartItem;
