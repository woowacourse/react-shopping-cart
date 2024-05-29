import { Suspense } from "react";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import styled from "styled-components";
import Header from "../components/Header";

export default function OrderSummaryPage() {
  return (
    <S.Container>
      <Header hasBackButton={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <OrderSummary />
      </Suspense>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 429px;
    border: 1px solid #808080;
  `,
};
