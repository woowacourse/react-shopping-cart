import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cartItemsState } from "../../recoil/cart/cartItems";

export default function OrderItemList() {
  const orderItemList = useRecoilValue(cartItemsState).filter(
    ({ isSelected }) => isSelected
  );

  return (
    <S.Container>
      {orderItemList.map((orderItem) => (
        <S.ProductOuterWrapper key={orderItem.id}>
          <S.ProductImage
            src={orderItem.product.imageUrl}
            alt="Product Image"
          />
          <S.ProductInnerWrapper>
            <S.ProductInfo>
              <S.ProductName>{orderItem.product.name}</S.ProductName>
              <S.ProductPrice>
                {orderItem.product.price.toLocaleString()}원
              </S.ProductPrice>
            </S.ProductInfo>
            <S.Count>{orderItem.quantity}개</S.Count>
          </S.ProductInnerWrapper>
        </S.ProductOuterWrapper>
      ))}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  ProductOuterWrapper: styled.div`
    border-top: 1px solid #d9d9d9;
    padding-top: 12px;
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
    align-items: start;
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

  Count: styled.div`
    font-size: 12px;
    text-align: center;
  `,
};
