import { Suspense } from "react";
import OrderSummary from "../components/OrderSummary";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

export default function OrderSummaryPage() {
  return (
    <S.Container>
      <Header hasBackButton={true} />
      <S.InnerWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderSummary />
        </Suspense>
      </S.InnerWrapper>
      <Button disabled>결제하기</Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 429px;
    border: 1px solid #808080;
    height: 100vh;
  `,

  InnerWrapper: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
