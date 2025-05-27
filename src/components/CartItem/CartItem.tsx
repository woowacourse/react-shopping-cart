import * as S from "./CartItem.styled";

import { CartDataType } from "../../types/cartDataType";

function CartItem({ cart }: { cart: CartDataType }) {
  const { price, name, imageUrl } = cart.product;

  return (
    <>
      <S.ItemContainer>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl}></S.ProductImage>
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
          </S.ItemContent>
        </S.ItemInfo>
        <S.DeleteButton>삭제</S.DeleteButton>
      </S.ItemContainer>
      <hr />
    </>
  );
}
export default CartItem;
