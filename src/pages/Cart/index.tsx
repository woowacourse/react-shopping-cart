import Button from "../../components/@shared/Button/styles";
import PageTitle from "../../components/PageTitle/styles";
import CheckBox from "../../components/@shared/CheckBox/styles";
import CartProduct from "../../components/CartProduct";
import { CartItem } from "../../redux/modules/cart";
import { useCartListSelector } from "../../hooks/useCartSelector";
import {
  CartListTitle,
  GridContainer,
  PaymentContainer,
  PaymentResultContainer,
  PaymentTitleWrapper,
  SelectAllContainer,
  CartPageContainer,
} from "./styles";

function Cart() {
  const cartItemList = useCartListSelector();

  return (
    <CartPageContainer>
      <PageTitle>장바구니</PageTitle>
      <GridContainer>
        <div>
          <SelectAllContainer>
            <div>
              <CheckBox />
              <span>선택해제</span>
            </div>
            <Button>상품삭제</Button>
          </SelectAllContainer>
          <CartListTitle>든든배송 상품</CartListTitle>
          {cartItemList.map((item: CartItem) => (
            <CartProduct key={item.id} {...{ item }} />
          ))}
        </div>
        <PaymentContainer>
          <PaymentTitleWrapper>결제 예상 금액</PaymentTitleWrapper>
          <PaymentResultContainer>
            <div>
              <span>결제 예상 금액</span>
              <span>00000원</span>
            </div>
            <Button>주문하기</Button>
          </PaymentResultContainer>
        </PaymentContainer>
      </GridContainer>
    </CartPageContainer>
  );
}

export default Cart;
