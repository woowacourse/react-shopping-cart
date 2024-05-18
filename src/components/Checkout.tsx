import { selectedUniqueCartItemsCountState } from "../recoil/selectedUniqueCartItemsCount";
import { selectedCartItemsCountState } from "../recoil/selectedCartItemsCount";
import { useRecoilValue } from "recoil";
import { cartAmountState } from "../recoil/cartAmount";
import styled from "styled-components";

export default function Checkout() {
  const selectedUniqueCartItemsCount = useRecoilValue(selectedUniqueCartItemsCountState);
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountState);
  const { totalOrderAmount } = useRecoilValue(cartAmountState);

  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.CheckoutInfoWrapper>
        <S.CheckoutInfo>
          총 {selectedUniqueCartItemsCount}종류의 상품 {selectedCartItemsCount}개를 주문합니다.
        </S.CheckoutInfo>
        <S.CheckoutInfo>최종 결제 금액을 확인해 주세요.</S.CheckoutInfo>
      </S.CheckoutInfoWrapper>
      <S.ToTalOrderAmountWrapper>
        <S.ToTalOrderAmountText>총 결제 금액</S.ToTalOrderAmountText>
        <S.TotalOrderAmount>{totalOrderAmount.toLocaleString()}원</S.TotalOrderAmount>
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
