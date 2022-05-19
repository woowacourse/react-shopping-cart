import { useState } from "react";
import { useDispatch } from "react-redux";
import { CartItem, selectAllItems, deleteBySelectedItems } from "../../redux/modules/cart";
import { useCartListSelector } from "../../hooks/useCartSelector";

import Button from "../../components/@shared/Button/styles";
import PageTitle from "../../components/PageTitle/styles";
import CheckBox from "../../components/@shared/CheckBox/styles";
import CartProduct from "../../components/CartProduct";
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
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const [allSelect, setAllSelect] = useState(false);

  const onToggleAllSelect = () => {
    setAllSelect((prev) => !prev);
    dispatch(selectAllItems(allSelect));
  };

  const onClickDeleteItems = () => {
    dispatch(deleteBySelectedItems());
  };

  return (
    <CartPageContainer>
      <PageTitle>장바구니</PageTitle>
      <GridContainer>
        <div>
          <SelectAllContainer>
            <div>
              <CheckBox checked={allSelect} onChange={onToggleAllSelect} />
              <span>{allSelect ? "선택해제" : "전제선택"}</span>
            </div>
            <Button onClick={onClickDeleteItems}>상품삭제</Button>
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
