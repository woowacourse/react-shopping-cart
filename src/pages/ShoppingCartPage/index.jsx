import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentAmount from "../../components/PaymentAmount";
import ShoppingCartProducts from "../../components/ShoppingCartProducts";
import { getShoppingCartProducts } from "../../modules/products";
import * as S from "./index.styles";

const ShoppingCartPage = () => {
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCartProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingCartProducts());
  }, [dispatch]);

  return (
    <section>
      <S.ShoppingCartTitle>장바구니</S.ShoppingCartTitle>
      <S.ShoppingCartPaymentContainer>
        <ShoppingCartProducts products={shoppingCartProducts.data} />
        <PaymentAmount />
      </S.ShoppingCartPaymentContainer>
    </section>
  );
};

export default ShoppingCartPage;
