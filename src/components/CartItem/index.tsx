import Checkbox from "../Checkbox";
import NumberInputButton from "../NumberInputButton";
import * as S from "./index.styles";
import imgSrc from "../../assets/image/no-image.png";

const CartItem = () => {
  return (
    <S.CartItemContainer>
      <S.ItemContainer>
        <Checkbox id={1} />
        <S.ItemImage src={imgSrc} alt={"안녕"} />
        <span>[든든] 야채 바삭 김말이</span>
      </S.ItemContainer>
      <S.ItemRightContainer>
        <S.CartButton>🗑</S.CartButton>
        <NumberInputButton />
        <p>5000원</p>
      </S.ItemRightContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
