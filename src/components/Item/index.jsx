import * as S from "./index.styles";
import { ReactComponent as ShoppingCart } from "../../assets/image/cart.svg";
import { useTheme } from "@emotion/react";

const Item = ({ imgUrl, title, price, onClick, go, isInShoppingCart }) => {
  const {
    color: { primary },
  } = useTheme();
  const shoppingCartColor = isInShoppingCart ? primary : "black";

  return (
    <S.ItemContainer>
      <S.ItemImage onClick={onClick} src={imgUrl} alt="상품이미지" />
      <S.ItemInfoWrapper>
        <div onClick={onClick}>
          <S.ItemInfo>{title}</S.ItemInfo>
          <S.ItemInfo>{price}원</S.ItemInfo>
        </div>
        <S.ShoppingCartButton onClick={go}>
          <ShoppingCart width="30px" height="30px" fill={shoppingCartColor} />
        </S.ShoppingCartButton>
      </S.ItemInfoWrapper>
    </S.ItemContainer>
  );
};

export default Item;
