import { useTheme } from "@emotion/react";
import * as S from "./index.styles";

const ItemDetails = ({
  imgUrl = "../../assets/image/no-image.png",
  title,
  price,
}) => {
  const {
    color: { white, brown, darkGray },
  } = useTheme();
  return (
    <S.ItemContainer>
      <S.ItemImage src={imgUrl} alt={`${title}상세이미지`} />
      <S.ItemTitle>{title}</S.ItemTitle>
      <S.PriceContainer color={darkGray}>
        <p>금액</p>
        <p>{price?.toLocaleString("ko-KR")}원</p>
      </S.PriceContainer>
      <S.ShoppingCartButton type="button" color={white} backgroundColor={brown}>
        장바구니
      </S.ShoppingCartButton>
    </S.ItemContainer>
  );
};

export default ItemDetails;
