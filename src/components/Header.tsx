import React from "react";
import styled from "styled-components";

interface HeaderProps {
  cartCount: number;
}
export default function Header({ cartCount }: HeaderProps) {
  return (
    <$Wrapper>
      <$ContentBox>
        <$LogoBox>
          <img src="./assets/logo.svg" />
          <$LogoTitle>SHOP</$LogoTitle>
        </$LogoBox>
        <$CartBox>
          장바구니
          <$CartCount>{cartCount}</$CartCount>
        </$CartBox>
      </$ContentBox>
    </$Wrapper>
  );
}

const $Wrapper = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 80px;

  background: #333333;

  color: white;
`;

const $ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 1200px;
  height: 100%;
`;

const $LogoBox = styled.div`
  display: flex;
  align-items: center;

  font-size: 40px;
  font-weight: 900;
`;

const $LogoTitle = styled.h1`
  margin-top: 6px;
  margin-left: 24px;

  vertical-align: center;
`;

const $CartBox = styled.div`
  display: flex;

  font-size: 24px;
  font-weight: 500;
`;

const $CartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;
  margin-left: 8px;
  border-radius: 50%;

  background: #04c09e;

  font-size: 16px;
  font-weight: 500;
`;
