import * as S from "./CartItem.styled";

import { CartDataType } from "../../types/cartDataType";
import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";

function CartItem({ cart }: { cart: CartDataType }) {
  const { price, name, imageUrl } = cart.product;

  return (
    <>
      <S.Line />
      <S.ItemContainer>
        <S.CartItemHeader>
          <CheckBox />
          <S.DeleteButton>삭제</S.DeleteButton>
        </S.CartItemHeader>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl}></S.ProductImage>
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
            <QuantityButton
              quantity={cart.quantity}
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
          </S.ItemContent>
        </S.ItemInfo>
      </S.ItemContainer>
    </>
  );
}
export default CartItem;
