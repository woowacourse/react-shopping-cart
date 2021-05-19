import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useCartSelector from "../../hooks/useCartSelector";
import { usePayment } from "../ProvidePayment/ProvidePayment";
import {
  selectCartStatus,
  selectCheckedCartItems,
} from "../../store/modules/cartSlice";
import STATUS from "../../constants/status";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import CartInfo from "./CartInfo/CartInfo";
import NoCartItem from "./NoCartItem/NoCartItem";
import * as S from "./Cart.styled";

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
    history.push("/payment");
  };

  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      {status === STATUS.SUCCEEDED && cart.length === 0 ? (
        <NoCartItem />
      ) : (
        <S.CartMain>
          <CartInfo />
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
