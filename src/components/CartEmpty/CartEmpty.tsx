import * as S from "./CartEmpty.style";
import Caption from "../_common/Caption/Caption";
import TitleSet from "../_common/TitleSet/TitleSet";
import { CART_PAGE_TITLES } from "@/constants/cart";

const CartEmpty = () => {
  return (
    <>
      <TitleSet title={CART_PAGE_TITLES.cart} />
      <S.Wrapper>
        <Caption text="장바구니에 담은 상품이 없습니다."></Caption>
      </S.Wrapper>
    </>
  );
};

export default CartEmpty;
