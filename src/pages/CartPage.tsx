import Header from "../components/common/Header";
import styled from "styled-components";
import CartContent from "../components/CartPage/CartContent";
import { Suspense } from "react";
import CartButton from "../components/CartPage/CartButton";

export default function CartPage() {
  return (
    <S.Container>
      <Header hasBackButton={false} title="SHOP" />
      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
        <S.CartButton />
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

  CartButton: styled(CartButton)`
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
