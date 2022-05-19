import * as S from "./index.styles";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { themeType } from "../../ThemeProvider";

interface ItemProps {
  imgUrl: string;
  title: string;
  price: number;
  onClick: () => void;
  onClickShoppingCart?: () => void;
  isInShoppingCart?: boolean;
}

const Item = ({
  imgUrl = "../../assets/image/no-image.png",
  title,
  price,
  onClick,
  onClickShoppingCart,
  isInShoppingCart,
}: ItemProps): JSX.Element => {
  const {
    color: { primary, black, darkWhite, gray },
  } = useTheme() as themeType;

  const shoppingCartColor = isInShoppingCart ? primary : black;

  return (
    <S.ItemContainer backgroundColorOnHover={darkWhite} textColorOnHover={gray}>
      <S.ItemImage
        onClick={onClick}
        src={imgUrl}
        alt={`${title} 썸네일 이미지`}
      />
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
