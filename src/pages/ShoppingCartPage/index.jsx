import React from "react";
import PaymentAmount from "../../components/PaymentAmount";
import ShoppingCartProducts from "../../components/ShoppingCartProducts";
import * as S from "./index.styles";

const mockProducts = [
  {
    id: 1,
    productQuantity: 1,
    imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
    title: "망고",
    price: 4000,
    handleIncrement: () => {},
    handleDecrement: () => {},
  },
  {
    id: 2,
    productQuantity: 1,
    imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
    title: "수박",
    price: 40000,
    handleIncrement: () => {},
    handleDecrement: () => {},
  },
  {
    id: 3,
    productQuantity: 7,
    imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
    title: "딸기",
    price: 700,
    handleIncrement: () => {},
    handleDecrement: () => {},
  },
];

const ShoppingCartPage = () => {
  return (
    <section>
      <S.ShoppingCartTitle>장바구니</S.ShoppingCartTitle>
      <S.ShoppingCartPaymentContainer>
        <ShoppingCartProducts products={mockProducts} />
        <PaymentAmount />
      </S.ShoppingCartPaymentContainer>
    </section>
  );
};

export default ShoppingCartPage;
