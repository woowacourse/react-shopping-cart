import { Suspense } from "react";
import CheckoutContent from "../components/CheckoutPage/CheckoutContent";
import styled from "styled-components";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../constants/routePath";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const onReturnToCartButtonClick = () => navigate(ROUTE_PATH.cart);

  return (
    <S.Container>
      <Header hasBackButton={true} />
      <S.InnerWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutContent />
        </Suspense>
      </S.InnerWrapper>
      <S.PayButton onClick={onReturnToCartButtonClick}>장바구니로 돌아가기</S.PayButton>
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

  PayButton: styled(Button)`
    position: fixed;
    bottom: 0;
  `,
};
