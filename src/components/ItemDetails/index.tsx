import { useTheme } from "@emotion/react";
import { themeType } from "../../ThemeProvider";
import * as S from "./index.styles";

interface ItemDetailsProps {
  imgUrl?: string;
  title?: string;
  price?: number;
  onClickShoppingCartButton?: () => void;
}

const ItemDetails = ({
  imgUrl = "../../assets/image/no-image.png",
  title = "NO_TITLE",
  price = 200000,
  onClickShoppingCartButton,
}: ItemDetailsProps) => {
  const {
    color: { white, brown, darkGray },
  } = useTheme() as themeType;
  return (
    <S.ItemContainer>
      <S.ItemImage src={imgUrl} alt={`${title}상세이미지`} />
      <S.ItemTitle>{title}</S.ItemTitle>
      <S.PriceContainer color={darkGray}>
        <p>금액</p>
        <p>{price?.toLocaleString("ko-KR")}원</p>
      </S.PriceContainer>
      <S.ShoppingCartButton
        type="button"
        color={white}
        backgroundColor={brown}
        onClick={onClickShoppingCartButton}
      >
        장바구니
      </S.ShoppingCartButton>
    </S.ItemContainer>
  );
};

export default ItemDetails;
