import React from "react";
import { useHistory } from "react-router-dom";
import CartInfo from "./CartInfo/CartInfo";
import * as S from "./Cart.styled";

import ResultBox from "../@shared/ResultBox/ResultBox";

import { ROUTE } from "../../constants/constant";
import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const history = useHistory();
  const { items: cart, checkedItems, hasCheckedItems, totalPrice } = useCart();

  const handleButtonClick = () => {
    history.push({ pathname: ROUTE.PAYMENT, state: { isAllowed: true } });
  };

  return (
    <S.Cart>
      <S.PageTitle>장바구니</S.PageTitle>
      <S.CartMain>
        <CartInfo cart={cart} />
        <ResultBox
          title="결제예상금액"
          text="결제예상금액"
          price={totalPrice}
          buttonContent={
            hasCheckedItems
              ? `주문하기(${checkedItems.length}개)`
              : "장바구니에 상품이 없습니다"
          }
          disabled={!hasCheckedItems}
          onButtonClick={handleButtonClick}
        />
      </S.CartMain>
    </S.Cart>
  );
};

export default Cart;
