import React from 'react';
import { styled } from 'styled-components';
import CartList from '@components/CartPage/CartList';
import EstimatedPayment from '@components/CartPage/EstimatedPayment';
import { theme } from '@styles/theme';

const CartPage = () => {
  return (
    <Wrapper>
      <Title>장바구니</Title>
      <SubTitle>든든배송 상품 (3개)</SubTitle>
      <Main>
        <CartList />
        <EstimatedPayment />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px 0;
  border-bottom: 4px solid ${theme.colors.primaryBlack};
`;

const Title = styled.h3`
  padding: 60px 0 30px 0;
  border-bottom: 4px solid ${theme.colors.whiteGray3};

  font-weight: 700;
  font-size: 32px;

  text-align: center;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const SubTitle = styled.h5`
  padding: 34px 0 16px 0;
  font-weight: 400;
  font-size: 20px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 5fr 2fr;

  gap: 100px;
`;

export default CartPage;
