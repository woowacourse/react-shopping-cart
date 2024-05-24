import styled from "styled-components";
import { formatToKRW } from "../../utils/domain/formatToKRW";
import { useLocation } from "react-router-dom";

interface CheckoutPageState {
  boughtItemCount: number;
  uniqueBoughtItemCount: number;
  totalPayAmount: number;
}

export default function Checkout() {
  const location = useLocation() as { state: CheckoutPageState };

  const boughtItemCount = location.state?.boughtItemCount;
  const uniqueBoughtItemCount = location.state?.uniqueBoughtItemCount;
  const totalOrderAmount = location.state?.totalPayAmount;

  if (!boughtItemCount || !uniqueBoughtItemCount || !totalOrderAmount) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.CheckoutInfoWrapper>
        <S.CheckoutInfo>
          총 {uniqueBoughtItemCount}종류의 상품 {boughtItemCount}개를 주문했습니다.
        </S.CheckoutInfo>
        <S.CheckoutInfo>최종 결제 금액을 확인해 주세요.</S.CheckoutInfo>
      </S.CheckoutInfoWrapper>
      <S.ToTalOrderAmountWrapper>
        <S.ToTalOrderAmountText>총 결제 금액</S.ToTalOrderAmountText>
        <S.TotalOrderAmount>{formatToKRW(totalOrderAmount)}</S.TotalOrderAmount>
      </S.ToTalOrderAmountWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: center;
  `,
  Title: styled.h1`
    font-size: 24px;
    font-weight: bold;
  `,
  CheckoutInfoWrapper: styled.div``,
  CheckoutInfo: styled.p`
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
