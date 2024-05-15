import React from 'react';
import TotalAmount from '../components/TotalAmount';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import styled from 'styled-components';
import Title from '../components/Title';
import Footer from '../components/Footer';
import { useRecoilValue } from 'recoil';
import { totalCartItemCountSelector } from '../recoil/selectors';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.6rem 2.4rem 4rem 2.4rem;
  box-sizing: border-box;
`;

function Cart() {
  const totalCartItemCount = useRecoilValue(totalCartItemCountSelector);

  return (
    <CartContainer>
      <Header />

      <ContentWrapper>
        <Title
          title="장바구니"
          subTitle={`현재 ${totalCartItemCount}종류의 상품이 담겨있습니다.`}
        />
        <ProductList />
        <TotalAmount />
      </ContentWrapper>

      <Footer />
    </CartContainer>
  );
}

export default Cart;
