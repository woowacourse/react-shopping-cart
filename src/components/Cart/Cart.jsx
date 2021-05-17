import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import CartInfo from "./CartInfo/CartInfo";
import * as S from "./Cart.styled";
import { ROUTE } from "../../constants/constant";
import { useCart } from "../../utils/useCart";
import { getCarts } from "../../store/modules/cartSlice";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const { checkedItems, hasCheckedItems, totalPrice } = useCart(cart);

  const handleButtonClick = () => {
    history.push({ pathname: ROUTE.PAYMENT, state: { isAllowed: true } });
  };

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      <S.CartMain>
        <CartInfo cart={cart} />
        <ResultBox
          title="결제예상금액"
          text="결제예상금액"
          price={totalPrice}
          buttonContent={
            hasCheckedItems
              ? `주문하기${checkedItems.length}개)`
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
