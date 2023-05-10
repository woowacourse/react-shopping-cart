import React from "react";
import { CartIcon } from "../assets";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { itemQuantitySelector } from "../recoil/selector";

const Header = () => {
  const cartItems = useRecoilValue(itemQuantitySelector);

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <img src={CartIcon} alt={"카트"} />
        <p>SHOP</p>
      </TitleWrapper>
      <CartWrapper>
        장바구니
        <ItemQuantityWrapper>{cartItems.length}</ItemQuantityWrapper>
      </CartWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;

  padding: 0 10%;
  width: 100%;
  height: 70px;
  background: #333333;
`;

const TitleWrapper = styled.section`
  display: flex;
  align-items: end;
  gap: 20px;

  & > p {
    color: white;
    font-weight: 900;
    font-size: 38px;
  }

  & > img {
    width: 46px;
    height: 46px;
  }
`;

const CartWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 24px;
  font-weight: 500;
  color: white;
`;

const ItemQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;

  background: #04c09e;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

export default Header;
