import styled from "styled-components";
import Header from "../components/common/Header";
import { Suspense } from "react";
import PaymentContent from "../components/PaymentPage/PaymentContent";

export default function PaymentPage() {
  return (
    <S.Container>
      <Header hasBackButton />
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 429px;
    height: 100vh;
    overflow: scroll;
    scrollbar-width: none;
    border: 1px solid #808080;
  `,
};
