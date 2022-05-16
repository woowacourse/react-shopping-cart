import * as S from "./index.styles";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Item = ({
  imgUrl = "../../assets/image/no-image.png",
  title,
  price,
  onClick,
  onClickShoppingCart,
  isInShoppingCart,
}) => {
  const {
    color: {
      primary,
      black,
      item: {
        hover: { backgroundColor, textColor },
      },
    },
  } = useTheme();

  const shoppingCartColor = isInShoppingCart ? primary : black;

  return (
    <S.ItemContainer
      backgroundColorOnHover={backgroundColor}
      textColorOnHover={textColor}
    >
      <S.ItemImage onClick={onClick} src={imgUrl} alt="상품 썸네일 이미지" />
      <S.ItemInfoWrapper>
        <div onClick={onClick}>
          <S.ItemInfo>{title}</S.ItemInfo>
          <S.ItemInfo>{price.toLocaleString("ko-KR")}원</S.ItemInfo>
        </div>
        <S.ShoppingCartButton onClick={onClickShoppingCart}>
          <ShoppingCartIcon
            width="30px"
            height="30px"
            fill={shoppingCartColor}
          />
        </S.ShoppingCartButton>
      </S.ItemInfoWrapper>
    </S.ItemContainer>
  );
};

export default Item;
