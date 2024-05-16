import Header from "../components/Header";
import styled from "styled-components";
import CartContent from "../components/CartContent";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <S.Container>
      <Header hasBackButton={false} title="SHOP" />
      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
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
