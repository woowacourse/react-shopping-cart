import React from "react";
import { useRecoilValue } from "recoil";
import { cartItems } from "../../recoil/selectors/selectors";
import { CartItemType } from "../../types";
import CartItem from "../CartItem";
import { Wrapper, Footer } from "./style";
import infoOutline from "../../assets/images/infoOutline.png";

const CartItemList = () => {
  const cartItemList = useRecoilValue(cartItems);

  return (
    <Wrapper>
      {cartItemList.map((cartItem: CartItemType) => (
        <CartItem cartItem={cartItem} />
      ))}
      <Footer>
        <img src={infoOutline} />
        <div>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</div>
      </Footer>
    </Wrapper>
  );
};

export default CartItemList;
