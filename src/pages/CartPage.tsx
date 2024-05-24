import CartContent from "../components/CartContent";
import Header from "../components/Header";
import { Suspense } from "react";
import styled from "styled-components";

export default function CartPage() {
  return (
    <S.Container>
      <Header title="SHOP" />
      <Suspense fallback={<CartContent.Skeleton />}>
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
