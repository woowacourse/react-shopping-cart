import * as S from "./index.styles";
import { ReactComponent as ShoppingCart } from "../../assets/image/cart.svg";

const Item = ({ imgUrl, title, price, onClick, go }) => {
  return (
    <S.ItemContainer>
      <S.ItemImage onClick={onClick} src={imgUrl} alt="상품이미지" />
      <S.ItemInfoWrapper>
        <div onClick={onClick}>
          <S.ItemInfo>{title}</S.ItemInfo>
          <S.ItemInfo>{price}원</S.ItemInfo>
        </div>
        <S.ShoppingCartButton onClick={go}>
          <ShoppingCart width="30px" height="30px" fill="black" />
        </S.ShoppingCartButton>
      </S.ItemInfoWrapper>
    </S.ItemContainer>
  );
};

export default Item;
