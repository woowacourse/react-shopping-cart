import { useTheme } from "@emotion/react";
import * as S from "./index.styles";

const ItemDetails = ({ imgUrl, title, price }) => {
  const {
    color: {
      white,
      itemDetails: { shoppingCartButtonColor, priceColor },
    },
  } = useTheme();
  return (
    <S.ItemContainer>
      <S.ItemImage src={imgUrl} alt="상품상세이미지" />
      <S.ItemTitle>{title}</S.ItemTitle>
      <S.PriceContainer color={priceColor}>
        <p>금액</p>
        <p>{price?.toLocaleString("ko-KR")}원</p>
      </S.PriceContainer>
      <S.ShoppingCartButton
        type="button"
        color={white}
        backgroundColor={shoppingCartButtonColor}
      >
        장바구니
      </S.ShoppingCartButton>
    </S.ItemContainer>
  );
};

export default ItemDetails;
