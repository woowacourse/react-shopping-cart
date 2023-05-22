import styled from "styled-components";
import { Layout } from "../layout";
import { CartCardList } from "../components/cart/CartCardList";
import { Suspense } from "react";

function CartPage() {
  return (
    <Layout>
      <Style.Container>
        <Style.Title>장바구니</Style.Title>
        <Suspense>
          <CartCardList />
        </Suspense>
      </Style.Container>
    </Layout>
  );
}

export default CartPage;

const Style = {
  Title: styled.div`
    text-align: center;
    line-height: 70px;

    width: 100%;
    border-bottom: 4px solid #333333;

    font-size: 32px;
    color: #333333;
  `,

  Container: styled.div`
    width: 1320px;
    margin: 0 auto;

    font-size: 24px;

    @media screen and (max-width: 1320px) {
      width: 100%;
    }
  `,
};
