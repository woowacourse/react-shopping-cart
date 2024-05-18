import * as S from "./CartEmpty.style";
import Caption from "../_common/Caption/Caption";
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton";
import TitleSet from "../_common/TitleSet/TitleSet";
import Button from "../_common/Button/Button";
import { CART_PAGE_TITLES } from "@/constants/cart";

const CartEmpty = () => {
  return (
    <>
      <TitleSet title={CART_PAGE_TITLES.cart} />
      <S.Wrapper>
        <Caption text="장바구니에 담은 상품이 없습니다."></Caption>
        <OrderConfirmButton disabled={true} />
      </S.Wrapper>
      <S.OrderConfirmButton>
        <Button width="full" size="xLarge" theme="dark" disabled={true}>
          <S.ButtonText>{CART_PAGE_TITLES.orderConfirm}</S.ButtonText>
        </Button>
      </S.OrderConfirmButton>
    </>
  );
};

export default CartEmpty;
