import styled from "styled-components";
import { formatToKRW } from "../../../utils/formatToKRW";
import { CartItem } from "../../../types/cartItems";

export interface ReadOnlyCartItemViewProps {
  cartItem: CartItem;
}
export default function ReadOnlyCartItemView({
  cartItem: { quantity, product },
}: ReadOnlyCartItemViewProps) {
  return (
    <S.CartItemContainer>
      <S.ProductOuterWrapper>
        <S.ProductImage src={product.imageUrl} alt="Product Image" />
        <S.ProductInnerWrapper>
          <S.ProductInfo>
            <S.ProductName>{product.name}</S.ProductName>
            <S.ProductPrice>{formatToKRW(product.price)}</S.ProductPrice>
          </S.ProductInfo>
          <S.ProductCount>{quantity}개</S.ProductCount>
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
    padding: 12px 0;
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

  ProductCount: styled.div`
    font-size: 12px;
  `,
};
