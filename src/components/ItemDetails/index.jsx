import * as S from "./index.styles";

const ItemDetails = ({ imgUrl, title, price }) => {
  return (
    <S.ItemContainer>
      <S.ItemImage src={imgUrl} alt="상품상세이미지" />
      <S.ItemTitle>{title}</S.ItemTitle>
      <S.PriceContainer>
        <p>금액</p>
        <p>{price}원</p>
      </S.PriceContainer>
      <S.ShoppingCartButton type="button">장바구니</S.ShoppingCartButton>
    </S.ItemContainer>
  );
};

export default ItemDetails;
