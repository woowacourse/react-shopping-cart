import { Suspense } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../constants/path";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    state: {
      selectedUniqueCartItemsCount,
      selectedCartItemsCount,
      totalOrderAmount,
    },
  } = useLocation();

  const handleGoBackToCartPageButtonClick = () => {
    navigate(PATH.cart);
  };

  return (
    <S.Container>
      <Header />
      <S.InnerWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <S.InnerContainer>
            <S.Title>결제 확인</S.Title>
            <S.OrderSummaryInfoWrapper>
              <S.OrderSummaryInfo>
                총 {selectedUniqueCartItemsCount}종류의 상품{" "}
                {selectedCartItemsCount}
                개를 주문했습니다.
              </S.OrderSummaryInfo>
              <S.OrderSummaryInfo>
                최종 결제 금액을 확인해 주세요.
              </S.OrderSummaryInfo>
            </S.OrderSummaryInfoWrapper>
            <S.ToTalOrderAmountWrapper>
              <S.ToTalOrderAmountText>총 결제 금액</S.ToTalOrderAmountText>
              <S.TotalOrderAmount>
                {totalOrderAmount.toLocaleString()}원
              </S.TotalOrderAmount>
            </S.ToTalOrderAmountWrapper>
          </S.InnerContainer>
        </Suspense>
      </S.InnerWrapper>
      <Button onClick={handleGoBackToCartPageButtonClick}>
        장바구니로 돌아가기
      </Button>
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
  InnerContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: center;
  `,
  Title: styled.h1`
    font-size: 24px;
    font-weight: bold;
  `,
  OrderSummaryInfoWrapper: styled.div``,
  OrderSummaryInfo: styled.p`
    font-size: 12px;
  `,
  ToTalOrderAmountWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  ToTalOrderAmountText: styled.p`
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
  `,
  TotalOrderAmount: styled.p`
    font-size: 24px;
    font-weight: bold;
    line-height: 26px;
  `,
};
