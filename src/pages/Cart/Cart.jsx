import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useCartSelector from "../../hooks/useCartSelector";
import { usePayment } from "../../components/ProvidePayment/ProvidePayment";
import {
  selectCartStatus,
  selectCheckedCartItems,
} from "../../store/modules/cartSlice";
import STATUS from "../../constants/status";
import PageTitle from "../../components/@mixins/PageTitle/PageTitle";
import ResultBox from "../../components/@mixins/ResultBox/ResultBox";
import CartList from "../../components/CartList/CartList";
import CartEmptyList from "../../components/CartEmptyList/CartEmptyList";
import * as S from "./Cart.styled";
import PATH from "../../constants/path";

const Cart = () => {
  const history = useHistory();
  const payment = usePayment();
  const cart = useCartSelector();
  const checkCartItems = useSelector(selectCheckedCartItems);
  const status = useSelector(selectCartStatus);

  const hasCheckedItems = checkCartItems.length > 0;
  const totalPrice = checkCartItems.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  const handleButtonClick = () => {
    payment.getReady();
    history.push(PATH.PAYMENT);
  };

  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      {status === STATUS.SUCCEEDED && cart.length === 0 ? (
        <CartEmptyList />
      ) : (
        <S.CartMain>
          <CartList />
          <ResultBox
            title="결제예상금액"
            text="결제예상금액"
            price={totalPrice}
            buttonContent={`주문하기${
              hasCheckedItems ? `(${checkCartItems.length}개)` : ""
            }`}
            disabled={!hasCheckedItems}
            onButtonClick={handleButtonClick}
          />
        </S.CartMain>
      )}
    </S.Cart>
  );
};

export default Cart;
