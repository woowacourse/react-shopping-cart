import styled from "styled-components";
import FullWidthTitle from "../components/common/FullWidthTitle/FullWidthTitle";
import CartProductList from "../components/CartProductList/CartProductList";
import { Suspense } from "react";
import Loading from "../components/common/Loading/Loading";
import OrderSummary from "../components/OrderSummary/OrderSummary";

const CartView = () => {
  return (
    <Container>
      <FullWidthTitle>장바구니</FullWidthTitle>
      <Suspense fallback={<Loading />}>
        <MenuContainer>
          <CartProductList />
          <OrderSummaryContainer>
            <OrderSummary />
          </OrderSummaryContainer>
        </MenuContainer>
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 15px 0 15px;
  max-width: 1320px;
  height: 600px;
  background-color: #00002210;
  margin: auto;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 75px;
  max-width: 1320px;
  height: auto;

  @media (max-width: 1320px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const OrderSummaryContainer = styled.div`
  margin-top: 70px;

  @media (max-width: 1320px) {
    margin-top: 25px;
  }
`;

export default CartView;
