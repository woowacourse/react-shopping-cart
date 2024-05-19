import { Suspense } from "react";
import Checkout from "../components/CheckoutPage/Checkout";
import styled from "styled-components";
import Header from "../components/common/Header";
import Button from "../components/common/Button";

export default function CheckoutPage() {
  return (
    <S.Container>
      <Header hasBackButton={true} />
      <S.InnerWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Checkout />
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
