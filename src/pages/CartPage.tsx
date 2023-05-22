import React from "react";
import styled from "styled-components";
import { CartSection } from "../components/CartPage/CartSection";
import OrderSection from "../components/CartPage/OrderSeciton";
import CartQuantity from "../components/CartQuantity";
import ErrorBoundary from "../components/common/ErrorBoundary";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";

export default function CartPage() {
  return (
    <>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <Header>
            <CartQuantity />
          </Header>
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <Container>
            <Title>장바구니</Title>
            <Main>
              <CartSection />
              <OrderSection />
            </Main>
          </Container>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 7rem;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 5.8rem;

  ${({ theme }) => theme.fonts.title}
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.primary};
`;

const Main = styled.section`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media (max-width: 1260px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
