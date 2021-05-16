import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import CartInfo from "./CartInfo/CartInfo";
import * as S from "./Cart.styled";
import { ROUTE } from "../../constants/constants";

const Cart = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const handleButtonClick = () => {
    history.push({ pathname: ROUTE.PAYMENT, state: { isAllowed: true } });
  };

  const checkedItems = Object.values(cart).filter((item) => item.checked);
  const hasCheckedItems = checkedItems.length > 0;
  const totalPrice = checkedItems.reduce(
    (acc, { amount, price }) => acc + amount * price,
    0
  );
  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      <S.CartMain>
        <CartInfo cart={cart} />
        <ResultBox
          title="결제예상금액"
          text="결제예상금액"
          price={totalPrice}
          buttonContent={`주문하기${
            hasCheckedItems ? `(${checkedItems.length}개)` : ""
          }`}
          disabled={!hasCheckedItems}
          onButtonClick={handleButtonClick}
        />
      </S.CartMain>
    </S.Cart>
  );
};

export default Cart;
